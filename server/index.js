// API for the "Free Insurance Plan" lead form + admin access to saved leads.
// Leads go to MongoDB; PAN/Aadhaar/bank details and the generated PDF are AES-256-GCM encrypted at rest.
import express from 'express';
import crypto from 'crypto';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { MongoClient, ObjectId } from 'mongodb';
import { renderLeadPdf, FAMILY_ROWS, FAMILY_COLS } from './pdf.js';

const {
  MONGODB_URI,
  MONGODB_DB = 'lifeguard',
  ADMIN_PASSWORD,
  ENCRYPTION_KEY,
  AGENT_NAME = 'Love Maggo',
  AGENT_CODE = '3594',
  PORT = 5000,
} = process.env;

for (const [k, v] of Object.entries({ MONGODB_URI, ADMIN_PASSWORD, ENCRYPTION_KEY })) {
  if (!v) {
    console.error(`Missing ${k}. Copy .env.example to .env and fill it in.`);
    process.exit(1);
  }
}
const KEY = Buffer.from(ENCRYPTION_KEY, 'hex');
if (KEY.length !== 32) {
  console.error('ENCRYPTION_KEY must be 64 hex characters (32 bytes).');
  process.exit(1);
}

function encrypt(buf) {
  const iv = crypto.randomBytes(12);
  const cipher = crypto.createCipheriv('aes-256-gcm', KEY, iv);
  const data = Buffer.concat([cipher.update(buf), cipher.final()]);
  return Buffer.concat([iv, cipher.getAuthTag(), data]);
}

function decrypt(buf) {
  buf = Buffer.from(buf.buffer ?? buf);
  const decipher = crypto.createDecipheriv('aes-256-gcm', KEY, buf.subarray(0, 12));
  decipher.setAuthTag(buf.subarray(12, 28));
  return Buffer.concat([decipher.update(buf.subarray(28)), decipher.final()]);
}

// ---- validation -------------------------------------------------------------

const TEXT_FIELDS = {
  name: 80, fatherName: 80, motherName: 80, spouseName: 80, placeOfBirth: 80,
  address: 300, education: 80, occupation: 80, natureOfDuties: 120, lengthOfService: 40,
  annualIncome: 30, incomePeriod: 10, nomineeName: 80, nomineeAge: 3, nomineeRelation: 40,
  height: 20, weight: 20, mobile: 10, email: 120, bankNameBranch: 150,
  pan: 10, aadhaar: 12, accountNo: 18, ifsc: 11, healthProblem: 400, interestedIn: 60,
};

const RULES = {
  pan: [/^[A-Z]{5}[0-9]{4}[A-Z]$/, 'PAN must look like ABCDE1234F'],
  aadhaar: [/^[0-9]{12}$/, 'Aadhaar must be 12 digits'],
  accountNo: [/^[0-9]{9,18}$/, 'Account number must be 9–18 digits'],
  ifsc: [/^[A-Z]{4}0[A-Z0-9]{6}$/, 'IFSC must look like SBIN0001234'],
  mobile: [/^[6-9][0-9]{9}$/, 'Enter a valid 10-digit mobile number'],
  email: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Enter a valid email'],
  nomineeAge: [/^[0-9]{1,3}$/, 'Nominee age must be a number'],
};

const REQUIRED = ['name', 'mobile', 'address'];

function clean(body) {
  const lead = {};
  const errors = {};
  for (const [k, max] of Object.entries(TEXT_FIELDS)) {
    let v = typeof body[k] === 'string' ? body[k].trim() : '';
    if (['pan', 'ifsc'].includes(k)) v = v.toUpperCase().replace(/\s/g, '');
    if (['aadhaar', 'accountNo', 'mobile'].includes(k)) v = v.replace(/[\s-]/g, '');
    if (k === 'mobile') v = v.replace(/^(\+91|91|0)(?=\d{10}$)/, '');
    v = v.slice(0, max);
    lead[k] = v;
    if (v && RULES[k] && !RULES[k][0].test(v)) errors[k] = RULES[k][1];
  }
  for (const k of REQUIRED) if (!lead[k]) errors[k] = 'Required';
  if (body.consent !== true) errors.consent = 'Please accept to continue';

  lead.family = {};
  for (const row of FAMILY_ROWS) {
    const src = body.family?.[row.key] || {};
    lead.family[row.key] = Object.fromEntries(
      FAMILY_COLS.map((c) => [c, typeof src[c] === 'string' ? src[c].trim().slice(0, 40) : '']),
    );
  }
  return { lead, errors };
}

// ---- app --------------------------------------------------------------------

const client = new MongoClient(MONGODB_URI);
await client.connect();
const leads = client.db(MONGODB_DB).collection('leads');
await leads.createIndex({ createdAt: -1 });
await leads.createIndex({ mobile: 1 });

const app = express();
app.set('trust proxy', 1);
app.use(express.json({ limit: '50kb' }));

// Tiny per-IP rate limit so the public form can't be flooded.
const hits = new Map();
function rateLimit(req, res, next) {
  const now = Date.now();
  const list = (hits.get(req.ip) || []).filter((t) => now - t < 60 * 60 * 1000);
  if (list.length >= 10) return res.status(429).json({ error: 'Too many submissions. Please try again later.' });
  list.push(now);
  hits.set(req.ip, list);
  next();
}

app.post('/api/leads', rateLimit, async (req, res) => {
  const { lead, errors } = clean(req.body || {});
  if (Object.keys(errors).length) return res.status(400).json({ error: 'Please fix the highlighted fields.', fields: errors });

  try {
    const createdAt = new Date();
    const pdf = await renderLeadPdf({ ...lead, createdAt }, { agentName: AGENT_NAME, agentCode: AGENT_CODE });
    const { insertedId } = await leads.insertOne({
      // Plain fields: enough to list, search and call back.
      name: lead.name,
      mobile: lead.mobile,
      email: lead.email,
      city: lead.address.split(',').slice(-2).join(',').trim(),
      occupation: lead.occupation,
      interestedIn: lead.interestedIn,
      status: 'new',
      source: 'free-insurance-cta',
      createdAt,
      // Everything else, including the filled PDF form, encrypted.
      details: encrypt(Buffer.from(JSON.stringify(lead))),
      pdf: encrypt(pdf),
    });
    res.status(201).json({ ok: true, id: insertedId });
  } catch (err) {
    console.error('Failed to save lead', err);
    res.status(500).json({ error: 'Could not save your details. Please try again.' });
  }
});

function requireAdmin(req, res, next) {
  const token = (req.headers.authorization || '').replace(/^Bearer /, '');
  const a = crypto.createHash('sha256').update(token).digest();
  const b = crypto.createHash('sha256').update(ADMIN_PASSWORD).digest();
  if (!crypto.timingSafeEqual(a, b)) return res.status(401).json({ error: 'Unauthorized' });
  next();
}

function toId(id) {
  return ObjectId.isValid(id) ? new ObjectId(id) : null;
}

app.get('/api/admin/leads', requireAdmin, async (req, res) => {
  const list = await leads
    .find({}, { projection: { details: 0, pdf: 0 } })
    .sort({ createdAt: -1 })
    .limit(1000)
    .toArray();
  res.json(list);
});

app.get('/api/admin/leads/:id', requireAdmin, async (req, res) => {
  const doc = await leads.findOne({ _id: toId(req.params.id) }, { projection: { pdf: 0 } });
  if (!doc) return res.status(404).json({ error: 'Not found' });
  res.json({ ...doc, details: JSON.parse(decrypt(doc.details).toString()) });
});

app.get('/api/admin/leads/:id/pdf', requireAdmin, async (req, res) => {
  const doc = await leads.findOne({ _id: toId(req.params.id) }, { projection: { pdf: 1, name: 1 } });
  if (!doc) return res.status(404).json({ error: 'Not found' });
  const file = `${doc.name.replace(/[^\w]+/g, '_')}_client_details.pdf`;
  res.set({ 'Content-Type': 'application/pdf', 'Content-Disposition': `inline; filename="${file}"` });
  res.send(decrypt(doc.pdf));
});

app.patch('/api/admin/leads/:id', requireAdmin, async (req, res) => {
  const status = ['new', 'contacted', 'converted', 'not-interested'].includes(req.body?.status) ? req.body.status : null;
  if (!status) return res.status(400).json({ error: 'Invalid status' });
  await leads.updateOne({ _id: toId(req.params.id) }, { $set: { status } });
  res.json({ ok: true });
});

// In production the same server also serves the built site.
const dist = path.join(path.dirname(fileURLToPath(import.meta.url)), '..', 'dist');
if (fs.existsSync(dist)) {
  app.use(express.static(dist));
  app.get(/^(?!\/api).*/, (req, res) => res.sendFile(path.join(dist, 'index.html')));
}

app.listen(PORT, () => console.log(`LifeGuard server on http://localhost:${PORT}`));
