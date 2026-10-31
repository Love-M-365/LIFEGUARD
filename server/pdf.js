// Renders a lead into the "Fresh / New Policy Client Details" form layout.
import PDFDocument from 'pdfkit';
import path from 'path';
import { fileURLToPath } from 'url';

const here = path.dirname(fileURLToPath(import.meta.url));
const LOGO = path.join(here, '..', 'assets', 'logo.png');
const HINDI = path.join(here, 'fonts', 'noto-sans-devanagari-devanagari-400-normal.woff');
const HINDI_BOLD = path.join(here, 'fonts', 'noto-sans-devanagari-devanagari-700-normal.woff');

const BLUE = '#1F4E9C';
const BAND_FILL = '#E4EBF6';
const BAND_STROKE = '#C3D1EA';
const GRID = '#9AA3AE';

const M = 34; // page side margin
const W = 595.28 - M * 2;
const LABEL_W = 191;

export const FAMILY_ROWS = [
  { key: 'father', label: 'Father / ', hindi: 'पिता' },
  { key: 'mother', label: 'Mother / ', hindi: 'माता' },
  { key: 'brothersLiving', label: 'Brothers (Living)' },
  { key: 'brothersDead', label: 'Brothers (Dead)' },
  { key: 'sistersLiving', label: 'Sisters (Living)' },
  { key: 'sistersDead', label: 'Sisters (Dead)' },
  { key: 'spouse', label: 'Spouse / ', hindi: 'पति-पत्नी' },
  { key: 'childrenLiving', label: 'Children (Living)' },
  { key: 'childrenDead', label: 'Children (Dead)' },
];

export const FAMILY_COLS = ['livingAge', 'livingHealth', 'deadAge', 'deadCause'];

// Writes text inside a box, shrinking the font (and finally truncating) so it never spills.
function fitText(doc, text, x, y, w, h, { size = 8.5, min = 5.5, font = 'Helvetica', lines = 1 } = {}) {
  text = String(text ?? '').replace(/\s+/g, ' ').trim();
  if (!text) return;
  doc.font(font);
  let s = size;
  const fits = () => (lines === 1
    ? doc.fontSize(s).widthOfString(text) <= w
    : doc.fontSize(s).heightOfString(text, { width: w }) <= doc.currentLineHeight(true) * lines && doc.currentLineHeight(true) * lines <= h);
  while (s > min && !fits()) s -= 0.25;
  doc.fontSize(s);
  const lineH = doc.currentLineHeight(true);
  const blockH = Math.min(doc.heightOfString(text, { width: w }), lineH * lines) - (lineH - doc.currentLineHeight());
  doc.fillColor('#111').text(text, x, y + (h - blockH) / 2, { width: w, height: lineH * lines, ellipsis: true, lineBreak: lines > 1 });
}

// The Devanagari font has no ASCII glyphs, so hyphens are drawn in Helvetica.
function hindiText(doc, text, x, y, size, bold) {
  text.split('-').forEach((part, i) => {
    if (i > 0) {
      doc.font('Helvetica').fontSize(size).text('-', x, y, { lineBreak: false });
      x += doc.widthOfString('-');
    }
    doc.font(bold ? 'HindiBold' : 'Hindi').fontSize(size).text(part, x, y - 1.5, { lineBreak: false });
    x += doc.widthOfString(part);
  });
}

function band(doc, y, title, hindi) {
  doc.save().rect(M, y, W, 18).fillAndStroke(BAND_FILL, BAND_STROKE).restore();
  doc.font('Helvetica-BoldOblique').fontSize(9).fillColor(BLUE).text(title, M + 7, y + 5, { lineBreak: false });
  if (hindi) hindiText(doc, hindi, M + 7 + doc.widthOfString(title), y + 5, 8.5, true);
}

function label(doc, y, text) {
  doc.font('Helvetica-Bold').fontSize(7.5).fillColor('#111').text(text, M, y, { lineBreak: false });
}

function charBoxes(doc, y, count, value) {
  const chars = String(value ?? '').toUpperCase().replace(/\s/g, '').split('');
  const n = Math.max(count, chars.length);
  const size = n > 16 ? Math.min(16, W / n) : 16;
  doc.lineWidth(0.8).strokeColor('#111');
  for (let i = 0; i < n; i++) {
    const x = M + i * size;
    doc.rect(x, y, size, 16).stroke();
    if (chars[i]) {
      doc.font('Helvetica-Bold').fontSize(9).fillColor('#111')
        .text(chars[i], x, y + 4.5, { width: size, align: 'center', lineBreak: false });
    }
  }
}

export function renderLeadPdf(lead, { agentName, agentCode }) {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument({
      size: 'A4',
      margin: 0,
      info: { Title: `Client Details - ${lead.name}`, Author: agentName, Subject: 'Fresh / New Policy Client Details' },
    });
    doc.registerFont('Hindi', HINDI);
    doc.registerFont('HindiBold', HINDI_BOLD);
    const chunks = [];
    doc.on('data', (c) => chunks.push(c));
    doc.on('end', () => resolve(Buffer.concat(chunks)));
    doc.on('error', reject);

    // Header
    doc.image(LOGO, M, 20, { width: 90 });
    doc.font('Helvetica-Bold').fontSize(13).fillColor(BLUE).text(agentName, M, 30, { width: W, align: 'right' });
    doc.fontSize(10).fillColor('#111').text(`LIC CODE : ${agentCode}`, M, 47, { width: W, align: 'right' });
    doc.moveTo(M, 79).lineTo(M + W, 79).lineWidth(2).strokeColor(BLUE).stroke();
    doc.font('Helvetica').fontSize(11).fillColor(BLUE).text('FRESH / NEW POLICY CLIENT DETAILS', M, 86, { width: W, align: 'center' });

    // Identity
    label(doc, 103, 'PAN CARD NO. (10)');
    charBoxes(doc, 113, 10, lead.pan);
    label(doc, 135, 'AADHAAR CARD NO. (12)');
    charBoxes(doc, 145, 12, lead.aadhaar);

    // Bank
    band(doc, 170, 'BANK ACCOUNT DETAILS');
    label(doc, 195, 'Bank Name & Branch');
    doc.lineWidth(0.8).strokeColor('#111').rect(M, 205, W, 16).stroke();
    fitText(doc, lead.bankNameBranch, M + 5, 205, W - 10, 16);
    label(doc, 227, 'Account No.');
    charBoxes(doc, 237, 16, lead.accountNo);
    label(doc, 259, 'IFSC Code (11)');
    charBoxes(doc, 269, 11, lead.ifsc);

    // Personal details table
    band(doc, 292, 'Personal Details');
    const income = lead.annualIncome ? `${lead.annualIncome}${lead.incomePeriod ? ` (${lead.incomePeriod})` : ''}` : '';
    const nominee = [lead.nomineeName, lead.nomineeAge && `Age ${lead.nomineeAge}`, lead.nomineeRelation].filter(Boolean).join(', ');
    const hw = [lead.height && `Ht= ${lead.height}`, lead.weight && `Wt= ${lead.weight}`].filter(Boolean).join('     ');
    const rows = [
      ["NAME", lead.name],
      ["FATHER'S NAME", lead.fatherName],
      ["MOTHER'S NAME", lead.motherName],
      ["SPOUSE'S NAME", lead.spouseName],
      ['PLACE OF BIRTH', lead.placeOfBirth],
      ['CORRESPONDENCE ADDRESS', lead.address, 2],
      ['EDUCATION', lead.education],
      ['OCCUPATION', lead.occupation],
      ['NATURE OF DUTIES', lead.natureOfDuties],
      ['LENGTH OF SERVICE', lead.lengthOfService],
      ['ANNUAL INCOME (Monthly / Yearly)', income],
      ["NOMINEE'S NAME, AGE, RELATION", nominee],
      ['Height Ht=   Weight Wt=', hw],
      ['Mobile No.', lead.mobile],
      ['E-mail ID', lead.email],
    ];
    let y = 313;
    const rowH = 16.4;
    doc.lineWidth(1).strokeColor('#111');
    for (const [lbl, val, lines] of rows) {
      doc.rect(M, y, LABEL_W, rowH).stroke();
      doc.rect(M + LABEL_W, y, W - LABEL_W, rowH).stroke();
      doc.font('Helvetica-Bold').fontSize(7.5).fillColor('#111').text(lbl, M + 7, y + 5, { lineBreak: false });
      fitText(doc, val, M + LABEL_W + 6, y, W - LABEL_W - 12, rowH, { lines: lines || 1, size: 8.5, min: 5 });
      y += rowH;
    }

    // Family history
    y += 7;
    band(doc, y, '2. Family History / ', 'पारिवारिक इतिहास');
    y += 20;
    const colW = [128, 100.5, 100.5, 100.5, W - 128 - 301.5];
    const heads = ['Relation', 'Living-Age', 'Living-Health', 'Dead-Age', 'Dead-Year/Cause'];
    doc.save().rect(M, y, W, 15).fill(BLUE).restore();
    let x = M;
    heads.forEach((h, i) => {
      doc.font('Helvetica-Bold').fontSize(7.5).fillColor('#fff').text(h, x + 6, y + 4.5, { lineBreak: false });
      x += colW[i];
    });
    y += 15;
    const famH = 14.8;
    doc.lineWidth(0.6).strokeColor(GRID);
    for (const row of FAMILY_ROWS) {
      x = M;
      const data = lead.family?.[row.key] || {};
      colW.forEach((cw, i) => {
        doc.rect(x, y, cw, famH).stroke();
        if (i === 0) {
          doc.font('Helvetica').fontSize(7.5).fillColor('#111').text(row.label, x + 6, y + 4, { lineBreak: false });
          if (row.hindi) hindiText(doc, row.hindi, x + 6 + doc.widthOfString(row.label), y + 4, 7.5);
        } else {
          fitText(doc, data[FAMILY_COLS[i - 1]], x + 5, y, cw - 10, famH, { size: 7.5, min: 5 });
        }
        x += cw;
      });
      y += famH;
    }

    // Health
    y += 8;
    band(doc, y, 'Health');
    y += 21;
    doc.lineWidth(1).strokeColor('#111');
    doc.rect(M, y, LABEL_W, 26).stroke();
    doc.rect(M + LABEL_W, y, W - LABEL_W, 26).stroke();
    doc.font('Helvetica-Bold').fontSize(7.5).fillColor('#111').text('ANY HEALTH PROBLEM', M + 7, y + 10, { lineBreak: false });
    fitText(doc, lead.healthProblem || 'None declared', M + LABEL_W + 6, y, W - LABEL_W - 12, 26, { lines: 2, min: 5 });

    // Signatures
    y += 44;
    const date = new Date(lead.createdAt || Date.now()).toLocaleDateString('en-IN', { timeZone: 'Asia/Kolkata' });
    doc.font('Helvetica').fontSize(8).fillColor('#111');
    doc.text('Client Signature: ______________________', M, y, { lineBreak: false });
    doc.text(`Date: ${date}`, M + 220, y, { lineBreak: false });
    doc.text('Agent Signature: ______________________', M, y, { width: W, align: 'right', lineBreak: false });

    doc.end();
  });
}
