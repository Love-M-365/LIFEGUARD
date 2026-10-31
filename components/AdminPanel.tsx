import React, { useEffect, useMemo, useState } from 'react';

interface Lead {
  _id: string;
  name: string;
  mobile: string;
  email: string;
  city: string;
  occupation: string;
  interestedIn: string;
  status: string;
  createdAt: string;
}

const STATUSES = ['new', 'contacted', 'converted', 'not-interested'];
const STATUS_STYLE: Record<string, string> = {
  new: 'bg-blue-100 text-blue-700',
  contacted: 'bg-amber-100 text-amber-700',
  converted: 'bg-green-100 text-green-700',
  'not-interested': 'bg-gray-200 text-gray-600',
};
const TOKEN_KEY = 'lg_admin_token';

function readToken() {
  try { return sessionStorage.getItem(TOKEN_KEY) || ''; } catch { return ''; }
}

const AdminPanel: React.FC = () => {
  const [token, setToken] = useState(readToken);
  const [password, setPassword] = useState('');
  const [leads, setLeads] = useState<Lead[] | null>(null);
  const [error, setError] = useState('');
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState('all');
  const [busy, setBusy] = useState('');

  const api = (url: string, init: RequestInit = {}, t = token) =>
    fetch(url, { ...init, headers: { ...(init.headers || {}), Authorization: `Bearer ${t}`, 'Content-Type': 'application/json' } });

  const load = async (t = token) => {
    setError('');
    const res = await api('/api/admin/leads', {}, t);
    if (res.status === 401) {
      setToken('');
      try { sessionStorage.removeItem(TOKEN_KEY); } catch { /* ignore */ }
      setError('Wrong password');
      return;
    }
    if (!res.ok) { setError('Could not load leads'); return; }
    setLeads(await res.json());
  };

  useEffect(() => { if (token) load(); }, []);

  const login = async (e: React.FormEvent) => {
    e.preventDefault();
    setToken(password);
    try { sessionStorage.setItem(TOKEN_KEY, password); } catch { /* ignore */ }
    await load(password);
  };

  const openPdf = async (lead: Lead) => {
    setBusy(lead._id);
    const res = await api(`/api/admin/leads/${lead._id}/pdf`);
    setBusy('');
    if (!res.ok) return alert('Could not load PDF');
    const url = URL.createObjectURL(await res.blob());
    window.open(url, '_blank');
    setTimeout(() => URL.revokeObjectURL(url), 60_000);
  };

  const setStatus = async (lead: Lead, status: string) => {
    setLeads((ls) => ls!.map((l) => (l._id === lead._id ? { ...l, status } : l)));
    await api(`/api/admin/leads/${lead._id}`, { method: 'PATCH', body: JSON.stringify({ status }) });
  };

  const exportCsv = () => {
    const rows = [['Date', 'Name', 'Mobile', 'Email', 'City', 'Occupation', 'Looking for', 'Status']];
    shown.forEach((l) => rows.push([new Date(l.createdAt).toLocaleString('en-IN'), l.name, l.mobile, l.email, l.city, l.occupation, l.interestedIn, l.status]));
    const csv = rows.map((r) => r.map((c) => `"${String(c ?? '').replace(/"/g, '""')}"`).join(',')).join('\n');
    const a = document.createElement('a');
    a.href = URL.createObjectURL(new Blob([csv], { type: 'text/csv' }));
    a.download = `leads-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
  };

  const shown = useMemo(() => {
    const q = query.trim().toLowerCase();
    return (leads || []).filter((l) =>
      (filter === 'all' || l.status === filter) &&
      (!q || [l.name, l.mobile, l.email, l.city].some((v) => v?.toLowerCase().includes(q)))
    );
  }, [leads, query, filter]);

  if (!leads) {
    return (
      <div className="min-h-screen bg-[#002147] flex items-center justify-center p-4">
        <form onSubmit={login} className="bg-white rounded-3xl p-8 w-full max-w-sm shadow-2xl animate-pop-in">
          <h1 className="text-2xl font-display font-bold text-[#002147] mb-1">Leads Admin</h1>
          <p className="text-sm text-gray-500 mb-6">Enter the admin password to view saved client details.</p>
          <input
            type="password"
            autoFocus
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Admin password"
            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl outline-none focus:ring-2 focus:ring-[#D4AF37] mb-3"
          />
          {error && <p className="text-sm text-red-500 mb-3">{error}</p>}
          <button className="w-full bg-[#002147] text-white py-3 rounded-2xl font-bold hover:bg-[#D4AF37] hover:text-[#002147] transition-colors">Sign in</button>
        </form>
      </div>
    );
  }

  const counts = STATUSES.map((s) => [s, leads.filter((l) => l.status === s).length] as const);

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-[#002147] text-white">
        <div className="max-w-7xl mx-auto px-4 py-5 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="text-xl font-display font-bold">Free Insurance Leads</h1>
            <p className="text-xs text-blue-200">{leads.length} total</p>
          </div>
          <div className="flex gap-2">
            <button onClick={() => load()} className="px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 text-sm"><i className="fa-solid fa-rotate mr-2" />Refresh</button>
            <button onClick={exportCsv} className="px-4 py-2 rounded-full bg-[#D4AF37] text-[#002147] font-bold text-sm"><i className="fa-solid fa-file-csv mr-2" />Export CSV</button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
          {counts.map(([s, n]) => (
            <button key={s} onClick={() => setFilter(filter === s ? 'all' : s)} className={`text-left bg-white rounded-2xl p-4 border transition-all ${filter === s ? 'border-[#D4AF37] shadow-md' : 'border-gray-100'}`}>
              <p className="text-2xl font-black text-[#002147]">{n}</p>
              <p className="text-xs uppercase tracking-widest text-gray-400 font-bold">{s.replace('-', ' ')}</p>
            </button>
          ))}
        </div>

        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search name, mobile, email, city…"
          className="w-full px-4 py-3 bg-white border border-gray-200 rounded-2xl outline-none focus:ring-2 focus:ring-[#D4AF37] mb-4 text-sm"
        />

        <div className="bg-white rounded-2xl border border-gray-100 overflow-x-auto">
          <table className="w-full text-sm min-w-[760px]">
            <thead className="bg-gray-50 text-xs uppercase tracking-wider text-gray-500">
              <tr>
                {['Date', 'Name', 'Mobile', 'City', 'Looking for', 'Status', 'Form'].map((h) => <th key={h} className="text-left px-4 py-3">{h}</th>)}
              </tr>
            </thead>
            <tbody>
              {shown.map((l) => (
                <tr key={l._id} className="border-t border-gray-100 hover:bg-slate-50">
                  <td className="px-4 py-3 text-gray-500 whitespace-nowrap">{new Date(l.createdAt).toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' })}</td>
                  <td className="px-4 py-3 font-semibold text-[#002147]">{l.name}<div className="text-xs font-normal text-gray-400">{l.email}</div></td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <a href={`tel:${l.mobile}`} className="hover:underline">{l.mobile}</a>
                    <a href={`https://wa.me/91${l.mobile}`} target="_blank" rel="noreferrer" className="ml-2 text-green-600"><i className="fa-brands fa-whatsapp" /></a>
                  </td>
                  <td className="px-4 py-3 text-gray-600">{l.city}</td>
                  <td className="px-4 py-3 text-gray-600">{l.interestedIn || '—'}</td>
                  <td className="px-4 py-3">
                    <select value={l.status} onChange={(e) => setStatus(l, e.target.value)} className={`text-xs font-bold rounded-full px-3 py-1.5 border-0 cursor-pointer ${STATUS_STYLE[l.status]}`}>
                      {STATUSES.map((s) => <option key={s} value={s}>{s.replace('-', ' ')}</option>)}
                    </select>
                  </td>
                  <td className="px-4 py-3">
                    <button onClick={() => openPdf(l)} disabled={busy === l._id} className="px-3 py-1.5 rounded-full bg-red-50 text-red-600 font-semibold text-xs hover:bg-red-100">
                      <i className={`fa-solid ${busy === l._id ? 'fa-spinner fa-spin' : 'fa-file-pdf'} mr-1`} />PDF
                    </button>
                  </td>
                </tr>
              ))}
              {shown.length === 0 && (
                <tr><td colSpan={7} className="px-4 py-12 text-center text-gray-400">No leads yet.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};

export default AdminPanel;
