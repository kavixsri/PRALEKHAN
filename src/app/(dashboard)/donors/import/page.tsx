'use client';
import { useState } from 'react';
import Link from 'next/link';

const steps = ['Upload CSV', 'Map Columns', 'Normalise', 'Dedupe Preview', 'Confirm'];

const previewRows = [
  { original: 'Mohd Ali', normalized: 'Mohammad Ali', phone_orig: '9876543210', phone_norm: '+919876543210', flag: 'Name variant matched' },
  { original: 'Priya Sharmah', normalized: 'Priya Sharma', phone_orig: '09123456789', phone_norm: '+919123456789', flag: 'Phone prefix fixed' },
  { original: 'Vikram singh', normalized: 'Vikram Singh', phone_orig: '+91 98765 00001', phone_norm: '+919876500001', flag: '' },
];

const dedupeRows = [
  { a: 'Mohammad Ali (#2)', b: 'Mohd Ali (import row 1)', score: '85%', reasons: 'Phone exact match + name variant' },
  { a: 'Priya Sharma (#4)', b: 'Priya Sharmah (import row 2)', score: '70%', reasons: 'Email exact match + name fuzzy' },
];

export default function ImportWizard() {
  const [step, setStep] = useState(1);
  const [file, setFile] = useState<string>('');

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white p-8 rounded-xl shadow border border-slate-200">
        <h2 className="text-2xl font-bold text-primary mb-2">Import Donors</h2>
        <p className="text-slate-500 text-sm mb-8">Upload your messy spreadsheet — we&apos;ll clean, normalise, and deduplicate it.</p>

        {/* Step indicators */}
        <div className="flex items-center mb-10">
          {steps.map((label, i) => {
            const s = i + 1;
            const active = step === s;
            const done = step > s;
            return (
              <div key={s} className="flex items-center flex-1">
                <div className="flex flex-col items-center">
                  <div
                    className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm border-2 transition-all
                      ${done ? 'bg-primary border-primary text-white' : active ? 'bg-accent border-accent text-white' : 'bg-white border-slate-300 text-slate-400'}`}
                  >
                    {done ? '✓' : s}
                  </div>
                  <span className={`text-xs mt-1 font-medium ${active ? 'text-accent' : done ? 'text-primary' : 'text-slate-400'}`}>
                    {label}
                  </span>
                </div>
                {i < steps.length - 1 && (
                  <div className={`flex-1 h-0.5 mx-2 mb-4 ${done ? 'bg-primary' : 'bg-slate-200'}`} />
                )}
              </div>
            );
          })}
        </div>

        {/* Step content */}
        <div className="min-h-[260px]">
          {step === 1 && (
            <div className="text-center py-8">
              <div className="border-2 border-dashed border-slate-300 rounded-xl p-12 hover:border-accent transition-colors cursor-pointer">
                <p className="text-4xl mb-4">📄</p>
                <p className="text-slate-600 font-medium mb-2">Drop your CSV or Excel file here</p>
                <p className="text-slate-400 text-sm mb-6">Supports .csv, .xls, .xlsx — messy headers welcome</p>
                <label className="inline-block cursor-pointer bg-primary text-white px-6 py-2.5 rounded-lg font-semibold hover:opacity-90 transition">
                  Browse File
                  <input type="file" className="hidden" onChange={(e) => setFile(e.target.files?.[0]?.name || '')} />
                </label>
                {file && <p className="mt-4 text-sm text-green-600 font-medium">✓ {file} selected</p>}
                {!file && <p className="mt-4 text-xs text-slate-400">Or use the sample file: <span className="text-accent font-medium cursor-pointer" onClick={() => setFile('dirty_donors_sample.csv')}>dirty_donors_sample.csv</span></p>}
              </div>
            </div>
          )}

          {step === 2 && (
            <div>
              <h3 className="font-semibold text-slate-700 mb-4">Map your CSV columns → Pralekhan fields</h3>
              <div className="space-y-3">
                {[['Name / Full Name', 'Donor Name'], ['Mobile / Phone', 'Phone Number'], ['Email ID', 'Email'], ['Amount', 'Donation Amount'], ['Date', 'Donation Date']].map(([csv, field]) => (
                  <div key={csv} className="flex items-center gap-4 p-3 bg-slate-50 rounded-lg border border-slate-200">
                    <span className="font-mono text-sm text-slate-600 w-40">{csv}</span>
                    <span className="text-slate-400">→</span>
                    <span className="text-primary font-medium text-sm">{field}</span>
                    <span className="ml-auto text-xs text-green-600 font-semibold">✓ Auto-detected</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {step === 3 && (
            <div>
              <h3 className="font-semibold text-slate-700 mb-4">Normalisation Preview — 3 rows shown</h3>
              <table className="w-full text-sm border border-slate-200 rounded-lg overflow-hidden">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="p-3 text-left text-xs font-semibold text-slate-500 uppercase">Original Name</th>
                    <th className="p-3 text-left text-xs font-semibold text-slate-500 uppercase">Normalised</th>
                    <th className="p-3 text-left text-xs font-semibold text-slate-500 uppercase">Phone (original)</th>
                    <th className="p-3 text-left text-xs font-semibold text-slate-500 uppercase">Phone (E.164)</th>
                    <th className="p-3 text-left text-xs font-semibold text-slate-500 uppercase">Flag</th>
                  </tr>
                </thead>
                <tbody>
                  {previewRows.map((r, i) => (
                    <tr key={i} className="border-t border-slate-100">
                      <td className="p-3 text-red-500 line-through">{r.original}</td>
                      <td className="p-3 font-medium text-green-700">{r.normalized}</td>
                      <td className="p-3 font-mono text-slate-400">{r.phone_orig}</td>
                      <td className="p-3 font-mono text-green-700">{r.phone_norm}</td>
                      <td className="p-3 text-xs text-amber-600">{r.flag}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {step === 4 && (
            <div>
              <h3 className="font-semibold text-slate-700 mb-2">Deduplication Preview</h3>
              <p className="text-sm text-slate-500 mb-4">These records may match existing donors. Review before importing.</p>
              <div className="space-y-3">
                {dedupeRows.map((r, i) => (
                  <div key={i} className="flex items-center gap-4 p-4 border border-amber-200 bg-amber-50 rounded-lg">
                    <div className="flex-1 text-sm font-medium text-slate-700">{r.a}</div>
                    <div className="text-amber-600 font-bold">{r.score} match</div>
                    <div className="flex-1 text-sm text-slate-500">{r.b}</div>
                    <div className="text-xs text-slate-400 max-w-[120px]">{r.reasons}</div>
                    <div className="flex gap-2 ml-2">
                      <button className="text-xs px-2 py-1 bg-primary text-white rounded">Merge</button>
                      <button className="text-xs px-2 py-1 border border-slate-300 rounded">Skip</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {step === 5 && (
            <div className="text-center py-8">
              <div className="text-6xl mb-4">✅</div>
              <h3 className="text-xl font-bold text-primary mb-2">Ready to Import</h3>
              <p className="text-slate-500 mb-6">3 records · 2 merge suggestions sent to review queue · 0 errors</p>
              <Link href="/donors">
                <button className="bg-primary text-white px-8 py-3 rounded-lg font-bold hover:opacity-90 transition">
                  Confirm &amp; Import
                </button>
              </Link>
            </div>
          )}
        </div>

        {/* Navigation */}
        {step < 5 && (
          <div className="mt-8 flex justify-between">
            <button
              disabled={step === 1}
              onClick={() => setStep((s) => s - 1)}
              className="px-5 py-2 border border-slate-300 rounded-lg font-medium text-slate-600 disabled:opacity-30"
            >
              Back
            </button>
            <button
              onClick={() => setStep((s) => Math.min(5, s + 1))}
              className="px-6 py-2 bg-primary text-white font-semibold rounded-lg hover:opacity-90"
            >
              {step === 4 ? 'Proceed to Confirm' : 'Next →'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
