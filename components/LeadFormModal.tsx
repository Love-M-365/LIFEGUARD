import React, { useMemo, useState } from 'react';

interface LeadFormModalProps {
  onClose: () => void;
}

type Family = Record<string, { livingAge: string; livingHealth: string; deadAge: string; deadCause: string }>;

const FAMILY_ROWS: [string, string][] = [
  ['father', 'Father / पिता'],
  ['mother', 'Mother / माता'],
  ['brothersLiving', 'Brothers (Living)'],
  ['brothersDead', 'Brothers (Dead)'],
  ['sistersLiving', 'Sisters (Living)'],
  ['sistersDead', 'Sisters (Dead)'],
  ['spouse', 'Spouse / पति-पत्नी'],
  ['childrenLiving', 'Children (Living)'],
  ['childrenDead', 'Children (Dead)'],
];

const FAMILY_COLS = [
  ['livingAge', 'Living Age'],
  ['livingHealth', 'Living Health'],
  ['deadAge', 'Dead Age'],
  ['deadCause', 'Dead Year / Cause'],
] as const;

const EMPTY = {
  name: '', mobile: '', email: '', fatherName: '', motherName: '', spouseName: '', placeOfBirth: '',
  address: '', education: '', occupation: '', natureOfDuties: '', lengthOfService: '',
  annualIncome: '', incomePeriod: 'Yearly', nomineeName: '', nomineeAge: '', nomineeRelation: '',
  height: '', weight: '', pan: '', aadhaar: '', bankNameBranch: '', accountNo: '', ifsc: '',
  healthProblem: '', interestedIn: '',
};
type Fields = typeof EMPTY;

// Mirrors the server-side checks in server/index.js.
const RULES: Partial<Record<keyof Fields, [RegExp, string]>> = {
  mobile: [/^[6-9][0-9]{9}$/, 'Enter a valid 10-digit mobile number'],
  email: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Enter a valid email'],
  pan: [/^[A-Z]{5}[0-9]{4}[A-Z]$/, 'PAN looks like ABCDE1234F'],
  aadhaar: [/^[0-9]{12}$/, 'Aadhaar must be 12 digits'],
  accountNo: [/^[0-9]{9,18}$/, 'Account number must be 9–18 digits'],
  ifsc: [/^[A-Z]{4}0[A-Z0-9]{6}$/, 'IFSC looks like SBIN0001234'],
  nomineeAge: [/^[0-9]{1,3}$/, 'Enter age in years'],
};
const REQUIRED: (keyof Fields)[] = ['name', 'mobile', 'address'];

function normalise(key: keyof Fields, value: string) {
  let v = value.trim();
  if (key === 'pan' || key === 'ifsc') v = v.toUpperCase().replace(/\s/g, '');
  if (key === 'aadhaar' || key === 'accountNo' || key === 'mobile') v = v.replace(/[\s-]/g, '');
  if (key === 'mobile') v = v.replace(/^(\+91|91|0)(?=\d{10}$)/, '');
  return v;
}

const STEPS = [
  { title: 'About You', icon: 'fa-user', fields: ['name', 'mobile', 'email', 'fatherName', 'motherName', 'spouseName', 'placeOfBirth', 'address', 'education'] },
  { title: 'Work & Nominee', icon: 'fa-briefcase', fields: ['occupation', 'natureOfDuties', 'lengthOfService', 'annualIncome', 'nomineeName', 'nomineeAge', 'nomineeRelation', 'height', 'weight', 'interestedIn'] },
  { title: 'KYC & Bank', icon: 'fa-building-columns', fields: ['pan', 'aadhaar', 'bankNameBranch', 'accountNo', 'ifsc'] },
  { title: 'Family & Health', icon: 'fa-heart-pulse', fields: ['healthProblem', 'consent'] },
];

const PLANS = ['Not sure, suggest me', 'Term / Pure Protection', 'Savings & Endowment', "Child's Education / Marriage", 'Pension / Retirement', 'Money Back', 'Tax Saving'];

const inputCls = (err?: string) =>
  `w-full px-4 py-3 bg-gray-50 border rounded-2xl outline-none transition-all text-sm focus:bg-white focus:ring-2 focus:ring-[#D4AF37] ${err ? 'border-red-400 bg-red-50/50' : 'border-gray-200'}`;

const LeadFormModal: React.FC<LeadFormModalProps> = ({ onClose }) => {
  const [f, setF] = useState<Fields>(EMPTY);
  const [family, setFamily] = useState<Family>(() =>
    Object.fromEntries(FAMILY_ROWS.map(([k]) => [k, { livingAge: '', livingHealth: '', deadAge: '', deadCause: '' }]))
  );
  const [consent, setConsent] = useState(false);
  const [step, setStep] = useState(0);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState('');
  const [done, setDone] = useState(false);

  const set = (k: keyof Fields, upper = false) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const v = upper ? e.target.value.toUpperCase() : e.target.value;
    setF((p) => ({ ...p, [k]: v }));
    if (errors[k]) setErrors((p) => ({ ...p, [k]: '' }));
  };

  const validate = (keys: string[]) => {
    const errs: Record<string, string> = {};
    for (const k of keys) {
      if (k === 'consent') {
        if (!consent) errs.consent = 'Please accept to continue';
        continue;
      }
      const key = k as keyof Fields;
      const v = normalise(key, f[key]);
      if (REQUIRED.includes(key) && !v) errs[k] = 'Required';
      else if (v && RULES[key] && !RULES[key]![0].test(v)) errs[k] = RULES[key]![1];
    }
    setErrors((p) => ({ ...p, ...errs }));
    return errs;
  };

  const next = () => {
    if (Object.keys(validate(STEPS[step].fields)).length === 0) setStep((s) => s + 1);
  };

  const submit = async () => {
    const errs = validate(STEPS.flatMap((s) => s.fields));
    if (Object.keys(errs).length) {
      setStep(STEPS.findIndex((s) => s.fields.some((k) => errs[k])));
      return;
    }
    setSubmitting(true);
    setServerError('');
    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...f, family, consent }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setServerError(data.error || 'Something went wrong. Please try again.');
        if (data.fields) {
          setErrors(data.fields);
          const bad = STEPS.findIndex((s) => s.fields.some((k) => data.fields[k]));
          if (bad >= 0) setStep(bad);
        }
        return;
      }
      setDone(true);
    } catch {
      setServerError('Network error. Please check your connection and try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const confetti = useMemo(
    () => Array.from({ length: 40 }, (_, i) => ({
      left: `${(i * 23) % 100}%`,
      color: ['#D4AF37', '#FFD56B', '#e8590c', '#002147', '#22c55e'][i % 5],
      delay: `${(i % 10) * 0.15}s`,
      dur: `${2.5 + (i % 5) * 0.4}s`,
    })),
    []
  );

  const Field = (k: keyof Fields, label: string, opts: { placeholder?: string; type?: string; upper?: boolean; maxLength?: number; inputMode?: 'numeric' | 'email' | 'tel'; span?: boolean } = {}) => (
    <div className={`space-y-1.5 ${opts.span ? 'sm:col-span-2' : ''}`}>
      <label htmlFor={`lf-${k}`} className="text-[11px] font-bold text-gray-500 uppercase tracking-widest">
        {label} {REQUIRED.includes(k) && <span className="text-red-500">*</span>}
      </label>
      <input
        id={`lf-${k}`}
        type={opts.type || 'text'}
        inputMode={opts.inputMode}
        maxLength={opts.maxLength}
        placeholder={opts.placeholder}
        value={f[k]}
        onChange={set(k, opts.upper)}
        className={inputCls(errors[k]) + (opts.upper ? ' uppercase tracking-[0.2em] font-semibold' : '')}
      />
      {errors[k] && <p className="text-xs text-red-500">{errors[k]}</p>}
    </div>
  );

  if (done) {
    return (
      <div className="fixed inset-0 z-[130] flex items-center justify-center p-4 bg-[#002147]/95 backdrop-blur-xl animate-fade-in overflow-hidden">
        {confetti.map((c, i) => (
          <span key={i} className="absolute top-0 w-2.5 h-4 rounded-sm" style={{ left: c.left, background: c.color, animation: `confetti-fall ${c.dur} linear ${c.delay} infinite` }} />
        ))}
        <div className="relative bg-white rounded-[36px] p-10 text-center max-w-md shadow-2xl animate-pop-in">
          <div className="w-24 h-24 bg-gradient-to-br from-[#FFD56B] to-[#D4AF37] rounded-full flex items-center justify-center text-[#2a1200] text-5xl mx-auto mb-6 animate-bounce-slow">
            <i className="fa-solid fa-gift" />
          </div>
          <h2 className="text-3xl font-display font-bold text-[#002147] mb-3">Thank you, {f.name.split(' ')[0]}!</h2>
          <p className="text-gray-600 mb-2 leading-relaxed">
            Your details are saved securely. Our advisor will call you on <strong>{f.mobile}</strong> with your free personalised plan.
          </p>
          <p className="text-sm text-[#c2410c] font-semibold mb-8">🪔 You're eligible for our Diwali gift worth up to ₹5,000 on your new policy.</p>
          <button onClick={onClose} className="bg-[#002147] text-white px-8 py-3.5 rounded-full font-bold hover:bg-[#D4AF37] hover:text-[#002147] transition-colors">
            Back to site
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-[130] flex items-end sm:items-center justify-center sm:p-4 bg-black/75 backdrop-blur-sm animate-fade-in" onClick={onClose}>
      <div
        className="bg-white w-full sm:max-w-3xl rounded-t-[32px] sm:rounded-[36px] shadow-2xl relative overflow-hidden flex flex-col max-h-[94vh] animate-sheet"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-label="Free insurance plan form"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-[#002147] via-[#0b2f63] to-[#3b0a45] p-6 sm:p-8 text-white relative shrink-0">
          <button onClick={onClose} className="absolute top-5 right-5 w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-all" aria-label="Close">
            <i className="fa-solid fa-xmark" />
          </button>
          <span className="text-[#FFD56B] font-bold text-[11px] uppercase tracking-[0.3em] mb-2 block">🪔 Free Plan + Diwali Gift</span>
          <h2 className="text-2xl sm:text-3xl font-display font-bold pr-10">Get Your Free Insurance Plan</h2>

          {/* Stepper */}
          <div className="flex items-center gap-2 mt-6">
            {STEPS.map((s, i) => (
              <React.Fragment key={s.title}>
                <button
                  onClick={() => i < step && setStep(i)}
                  className={`flex items-center gap-2 shrink-0 ${i < step ? 'cursor-pointer' : 'cursor-default'}`}
                  aria-current={i === step}
                >
                  <span className={`w-9 h-9 rounded-full flex items-center justify-center text-sm transition-all duration-500 ${i < step ? 'bg-[#22c55e] text-white' : i === step ? 'bg-[#FFD56B] text-[#2a1200] scale-110 shadow-lg shadow-yellow-500/40' : 'bg-white/10 text-white/50'}`}>
                    <i className={`fa-solid ${i < step ? 'fa-check' : s.icon}`} />
                  </span>
                  <span className={`hidden md:block text-xs font-bold ${i === step ? 'text-white' : 'text-white/50'}`}>{s.title}</span>
                </button>
                {i < STEPS.length - 1 && (
                  <span className="flex-1 h-1 rounded-full bg-white/10 overflow-hidden">
                    <span className="block h-full bg-[#FFD56B] transition-all duration-700" style={{ width: i < step ? '100%' : '0%' }} />
                  </span>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Body */}
        <div className="p-6 sm:p-8 overflow-y-auto grow">
          <div key={step} className="animate-fade-up">
            {step === 0 && (
              <div className="grid sm:grid-cols-2 gap-5">
                {Field('name', 'Full Name', { placeholder: 'As per PAN / Aadhaar' })}
                {Field('mobile', 'Mobile No.', { placeholder: '98765 43210', inputMode: 'tel', maxLength: 14 })}
                {Field('email', 'E-mail ID', { placeholder: 'you@example.com', type: 'email', inputMode: 'email' })}
                {Field('placeOfBirth', 'Place of Birth', { placeholder: 'City' })}
                {Field('fatherName', "Father's Name")}
                {Field('motherName', "Mother's Name")}
                {Field('spouseName', "Spouse's Name", { placeholder: 'If married' })}
                {Field('education', 'Education', { placeholder: 'e.g. Graduate' })}
                <div className="space-y-1.5 sm:col-span-2">
                  <label htmlFor="lf-address" className="text-[11px] font-bold text-gray-500 uppercase tracking-widest">
                    Correspondence Address <span className="text-red-500">*</span>
                  </label>
                  <textarea id="lf-address" rows={2} value={f.address} onChange={set('address')} placeholder="House no., street, area, city, PIN" className={inputCls(errors.address) + ' resize-none'} />
                  {errors.address && <p className="text-xs text-red-500">{errors.address}</p>}
                </div>
              </div>
            )}

            {step === 1 && (
              <div className="grid sm:grid-cols-2 gap-5">
                {Field('occupation', 'Occupation', { placeholder: 'Job / Business / Self-employed' })}
                {Field('natureOfDuties', 'Nature of Duties', { placeholder: 'e.g. Office work' })}
                {Field('lengthOfService', 'Length of Service', { placeholder: 'e.g. 5 years' })}
                <div className="space-y-1.5">
                  <label htmlFor="lf-annualIncome" className="text-[11px] font-bold text-gray-500 uppercase tracking-widest">Income</label>
                  <div className="flex gap-2">
                    <input id="lf-annualIncome" inputMode="numeric" value={f.annualIncome} onChange={set('annualIncome')} placeholder="₹ Amount" className={inputCls()} />
                    <select value={f.incomePeriod} onChange={set('incomePeriod')} className={inputCls() + ' w-32 cursor-pointer'}>
                      <option>Yearly</option>
                      <option>Monthly</option>
                    </select>
                  </div>
                </div>
                {Field('nomineeName', "Nominee's Name")}
                <div className="grid grid-cols-2 gap-3">
                  {Field('nomineeAge', 'Nominee Age', { inputMode: 'numeric', maxLength: 3 })}
                  {Field('nomineeRelation', 'Relation', { placeholder: 'e.g. Wife' })}
                </div>
                {Field('height', 'Height', { placeholder: "e.g. 5'8\" or 172 cm" })}
                {Field('weight', 'Weight', { placeholder: 'e.g. 70 kg' })}
                <div className="space-y-1.5 sm:col-span-2">
                  <label htmlFor="lf-interestedIn" className="text-[11px] font-bold text-gray-500 uppercase tracking-widest">What are you looking for?</label>
                  <select id="lf-interestedIn" value={f.interestedIn} onChange={set('interestedIn')} className={inputCls() + ' cursor-pointer'}>
                    <option value="">Choose a goal</option>
                    {PLANS.map((p) => <option key={p}>{p}</option>)}
                  </select>
                </div>
              </div>
            )}

            {step === 2 && (
              <>
                <div className="flex items-start gap-3 bg-blue-50 border border-blue-100 rounded-2xl p-4 mb-6 text-sm text-[#002147]">
                  <i className="fa-solid fa-lock mt-0.5 text-[#D4AF37]" />
                  <p>These details are only used to prepare your policy proposal. They are encrypted and never shared. You can also skip this step and give them to your advisor later.</p>
                </div>
                <div className="grid sm:grid-cols-2 gap-5">
                  {Field('pan', 'PAN Card No.', { placeholder: 'ABCDE1234F', upper: true, maxLength: 10 })}
                  {Field('aadhaar', 'Aadhaar Card No.', { placeholder: '12 digits', inputMode: 'numeric', maxLength: 14 })}
                  {Field('bankNameBranch', 'Bank Name & Branch', { placeholder: 'e.g. SBI, Laxmi Nagar', span: true })}
                  {Field('accountNo', 'Account No.', { inputMode: 'numeric', maxLength: 18 })}
                  {Field('ifsc', 'IFSC Code', { placeholder: 'SBIN0001234', upper: true, maxLength: 11 })}
                </div>
              </>
            )}

            {step === 3 && (
              <>
                <h3 className="text-sm font-bold text-[#002147] mb-3">Family History <span className="text-gray-400 font-normal">· पारिवारिक इतिहास</span></h3>
                <div className="overflow-x-auto -mx-6 sm:mx-0 px-6 sm:px-0 mb-6">
                  <table className="w-full min-w-[560px] text-sm border-separate border-spacing-0 rounded-2xl overflow-hidden border border-gray-200">
                    <thead>
                      <tr className="bg-[#1F4E9C] text-white text-xs">
                        {['Relation', ...FAMILY_COLS.map(([, h]) => h)].map((h) => (
                          <th key={h} className="text-left font-semibold px-3 py-2.5">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {FAMILY_ROWS.map(([key, label], i) => (
                        <tr key={key} className={i % 2 ? 'bg-gray-50' : 'bg-white'}>
                          <td className="px-3 py-1.5 text-xs font-semibold text-gray-700 whitespace-nowrap">{label}</td>
                          {FAMILY_COLS.map(([col, colLabel]) => (
                            <td key={col} className="px-1.5 py-1.5">
                              <input
                                aria-label={`${label}: ${colLabel}`}
                                value={family[key][col]}
                                maxLength={40}
                                onChange={(e) => setFamily((p) => ({ ...p, [key]: { ...p[key], [col]: e.target.value } }))}
                                className="w-full px-2.5 py-2 text-xs bg-white border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-[#D4AF37]"
                              />
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="space-y-1.5 mb-6">
                  <label htmlFor="lf-health" className="text-[11px] font-bold text-gray-500 uppercase tracking-widest">Any Health Problem</label>
                  <textarea id="lf-health" rows={2} value={f.healthProblem} onChange={set('healthProblem')} placeholder="Leave blank if none (e.g. diabetes, BP, past surgery)" className={inputCls() + ' resize-none'} />
                </div>

                <label className={`flex items-start gap-3 p-4 rounded-2xl border cursor-pointer transition-colors ${errors.consent ? 'border-red-300 bg-red-50' : 'border-gray-200 hover:bg-gray-50'}`}>
                  <input
                    type="checkbox"
                    checked={consent}
                    onChange={(e) => { setConsent(e.target.checked); setErrors((p) => ({ ...p, consent: '' })); }}
                    className="mt-1 w-4 h-4 accent-[#002147]"
                  />
                  <span className="text-xs text-gray-600 leading-relaxed">
                    I confirm these details are correct and I agree to be contacted by the LIC advisor by call, SMS or WhatsApp about insurance plans.
                    My details will be stored securely and used only to prepare my policy proposal.
                  </span>
                </label>
                {errors.consent && <p className="text-xs text-red-500 mt-1.5">{errors.consent}</p>}
              </>
            )}
          </div>

          {serverError && (
            <div className="mt-6 p-3 rounded-xl bg-red-50 border border-red-200 text-sm text-red-600 animate-fade-in">
              <i className="fa-solid fa-circle-exclamation mr-2" />{serverError}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="shrink-0 border-t border-gray-100 px-6 sm:px-8 py-4 flex items-center justify-between gap-3 bg-white">
          {step > 0 ? (
            <button onClick={() => setStep((s) => s - 1)} className="px-5 py-3 rounded-full text-sm font-bold text-gray-500 hover:bg-gray-100 transition-colors">
              <i className="fa-solid fa-arrow-left mr-2" />Back
            </button>
          ) : <span className="text-[11px] text-gray-400">Step 1 of {STEPS.length}</span>}

          <div className="flex items-center gap-2">
            {step === 2 && (
              <button onClick={() => setStep(3)} className="px-4 py-3 rounded-full text-sm font-semibold text-gray-400 hover:text-gray-600">
                Skip
              </button>
            )}
            {step < STEPS.length - 1 ? (
              <button onClick={next} className="bg-[#002147] text-white px-7 py-3 rounded-full font-bold text-sm hover:bg-[#D4AF37] hover:text-[#002147] transition-all active:scale-95">
                Continue <i className="fa-solid fa-arrow-right ml-2" />
              </button>
            ) : (
              <button
                onClick={submit}
                disabled={submitting}
                className="btn-shine bg-gradient-to-r from-[#FFD56B] to-[#D4AF37] text-[#2a1200] px-7 py-3 rounded-full font-black text-sm hover:scale-105 active:scale-95 transition-transform disabled:opacity-60 disabled:hover:scale-100"
              >
                {submitting ? <><i className="fa-solid fa-spinner fa-spin mr-2" />Saving…</> : <>Get My Free Plan <i className="fa-solid fa-gift ml-2" /></>}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeadFormModal;
