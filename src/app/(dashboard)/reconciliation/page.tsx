'use client';
import { useState } from 'react';

const mockRecon = [
  { id: 'r1', date: '2026-09-21', amount: 5000, ref: 'UPI/12345/Ramesh', status: 'matched' as const, matchedDonor: 'Ramesh Sharma' },
  { id: 'r2', date: '2026-09-20', amount: 1500, ref: 'IMPS/98765/Ali', status: 'review' as const, matchedDonor: '' },
  { id: 'r3', date: '2026-09-21', amount: 800, ref: 'CASH DEP 001', status: 'unmatched' as const, matchedDonor: '' },
  { id: 'r4', date: '2026-09-19', amount: 250000, ref: 'NEFT/TechCorp/CSR', status: 'matched' as const, matchedDonor: 'TechCorp CSR' },
];

const statusClass = {
  matched: 'bg-green-100 text-green-700',
  review: 'bg-amber-100 text-amber-700',
  unmatched: 'bg-red-100 text-red-700',
};

const statusLabel = {
  matched: '✓ Matched',
  review: '⚠ Needs Review',
  unmatched: '✗ Unmatched',
};

export default function ReconciliationPage() {
  const [uploaded, setUploaded] = useState(false);

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-primary">Reconciliation Inbox</h2>
          <p className="text-sm text-slate-500 mt-1">Match bank credits to recorded donations</p>
        </div>
        <button
          onClick={() => setUploaded(true)}
          className="bg-primary text-white px-4 py-2 rounded shadow-sm hover:opacity-90 text-sm font-semibold"
        >
          {uploaded ? '✓ bank_sept.csv uploaded' : 'Upload Bank CSV'}
        </button>
      </div>

      {uploaded && (
        <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg text-sm text-green-700 font-medium">
          ✓ 4 transactions loaded · 2 auto-matched · 1 needs review · 1 unmatched
        </div>
      )}

      <div className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="p-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Date</th>
              <th className="p-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Reference</th>
              <th className="p-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Amount</th>
              <th className="p-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
              <th className="p-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Matched To</th>
              <th className="p-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Action</th>
            </tr>
          </thead>
          <tbody>
            {mockRecon.map((r) => (
              <tr key={r.id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                <td className="p-4 text-sm font-mono">{r.date}</td>
                <td className="p-4 font-mono text-sm text-slate-600">{r.ref}</td>
                <td className="p-4 font-bold text-slate-800">₹{r.amount.toLocaleString('en-IN')}</td>
                <td className="p-4">
                  <span className={`px-2 py-1 rounded text-xs font-semibold ${statusClass[r.status]}`}>
                    {statusLabel[r.status]}
                  </span>
                </td>
                <td className="p-4 text-sm text-slate-600">{r.matchedDonor || '—'}</td>
                <td className="p-4">
                  {r.status === 'matched' && <span className="text-slate-400 text-sm">Done</span>}
                  {r.status === 'review' && (
                    <button className="text-amber-600 hover:underline text-sm font-medium">Resolve →</button>
                  )}
                  {r.status === 'unmatched' && (
                    <button className="text-primary hover:underline text-sm font-medium">Find Match</button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
