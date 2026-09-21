'use client';
import { useState } from 'react';

export default function AIWriterPage() {
  const [prompt, setPrompt] = useState('');
  const [draft, setDraft] = useState('');
  const [loading, setLoading] = useState(false);
  const [approved, setApproved] = useState(false);

  const handleGenerate = () => {
    if (!prompt.trim()) return;
    setLoading(true);
    setApproved(false);
    setTimeout(() => {
      setDraft(
        `Dear Supporter,\n\nBased on the data from our recent campaigns, we have been able to fund **50 child-months** of education [Src: donations tx1, tx3]. Thank you for your generous **₹25,000** contribution [Src: donation tx2] to the Open Classroom campaign.\n\nWith continued support, we aim to reach **30000** more children next year.\n\nWarm regards,\nUPAY Team`
      );
      setLoading(false);
    }, 1500);
  };

  // Render draft: mark [Src: ...] citations and flag unverified numbers
  const sourceNumbers = [50, 25000]; // Numbers we can actually verify
  const renderDraft = (text: string) => {
    if (!text) return null;
    // Find numbers not in sourceNumbers and not a year (4+ digits starting with 19/20 are dates, skip)
    const parts = text.split(/(\[Src:[^\]]+\]|\*\*[^*]+\*\*|\b\d+\b)/g);
    return parts.map((part, i) => {
      if (/^\[Src:[^\]]+\]$/.test(part)) {
        return (
          <span key={i} className="inline-block bg-blue-100 text-blue-800 text-xs px-1.5 py-0.5 rounded cursor-pointer hover:bg-blue-200 mx-0.5">
            {part}
          </span>
        );
      }
      if (/^\*\*[^*]+\*\*$/.test(part)) {
        return <strong key={i}>{part.slice(2, -2)}</strong>;
      }
      const num = parseInt(part, 10);
      if (!isNaN(num) && /^\d+$/.test(part) && num > 99 && !sourceNumbers.includes(num)) {
        return (
          <span key={i} className="inline-block bg-red-100 text-red-800 text-xs px-1.5 py-0.5 rounded font-bold mx-0.5" title="This number could not be verified in source records">
            {part} ⚠
          </span>
        );
      }
      return <span key={i}>{part}</span>;
    });
  };

  const hasUnverified = draft && /\b30000\b/.test(draft);

  return (
    <div className="flex gap-6" style={{ height: 'calc(100vh - 8rem)' }}>
      {/* Main editor */}
      <div className="flex-1 flex flex-col bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="px-5 py-4 border-b border-slate-200 flex items-center justify-between" style={{ backgroundColor: '#f8fafc' }}>
          <div>
            <h2 className="font-bold text-slate-800">Grounded AI Writer</h2>
            <p className="text-xs text-slate-500">Every number cites its source. Unverified claims are flagged.</p>
          </div>
          <div className="flex gap-2">
            {draft && !approved && (
              <button
                onClick={() => setApproved(true)}
                disabled={!!hasUnverified}
                className="text-sm font-semibold px-4 py-1.5 rounded-lg transition"
                style={{
                  backgroundColor: hasUnverified ? '#e5e7eb' : '#253A5E',
                  color: hasUnverified ? '#9ca3af' : '#f8fafc',
                  cursor: hasUnverified ? 'not-allowed' : 'pointer',
                }}
                title={hasUnverified ? 'Fix unverified claims before approving' : 'Approve this draft'}
              >
                {hasUnverified ? '🔒 Fix Issues First' : 'Approve & Enable Send'}
              </button>
            )}
            {approved && (
              <button
                className="text-sm font-semibold px-4 py-1.5 rounded-lg"
                style={{ backgroundColor: '#15803d', color: '#f8fafc' }}
              >
                Send to Donor →
              </button>
            )}
          </div>
        </div>

        {/* Prompt */}
        <div className="px-5 py-4 border-b border-slate-200">
          <textarea
            className="w-full h-20 p-3 border border-slate-300 rounded-lg text-sm focus:outline-none resize-none"
            placeholder="E.g. Write a grant proposal for ₹1 Lakh CSR based on recent education campaigns..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />
          <div className="mt-3 flex justify-end">
            <button
              onClick={handleGenerate}
              disabled={loading}
              className="text-white px-6 py-2 rounded-lg text-sm font-semibold"
              style={{ backgroundColor: loading ? '#94a3b8' : '#253A5E' }}
            >
              {loading ? 'Generating…' : '✨ Generate Draft'}
            </button>
          </div>
        </div>

        {/* Draft output */}
        <div className="flex-1 px-6 py-5 overflow-y-auto leading-relaxed text-slate-800" style={{ fontSize: '15px' }}>
          {draft ? (
            <div className="whitespace-pre-wrap">{renderDraft(draft)}</div>
          ) : (
            <p className="text-slate-400 text-center mt-16 text-sm">Your verified draft will appear here.</p>
          )}
        </div>
      </div>

      {/* Sources panel */}
      <div className="w-72 bg-white rounded-xl shadow-sm border border-slate-200 p-5 flex flex-col gap-4 overflow-y-auto">
        <h3 className="font-bold text-slate-700">Sources & Verification</h3>

        {!draft && (
          <p className="text-sm text-slate-400">Generate a draft to see source citations here.</p>
        )}

        {draft && hasUnverified && (
          <div className="p-3 rounded-lg border text-sm" style={{ backgroundColor: '#fef2f2', borderColor: '#fecaca', color: '#991b1b' }}>
            <strong>⚠ 1 unverified claim</strong>
            <p className="mt-1 text-xs">The number &quot;30000&quot; could not be found in source donation records. Edit or remove it before approving.</p>
          </div>
        )}

        {draft && !hasUnverified && (
          <div className="p-3 rounded-lg border text-sm" style={{ backgroundColor: '#f0fdf4', borderColor: '#bbf7d0', color: '#166534' }}>
            <strong>✓ All claims verified</strong>
            <p className="mt-1 text-xs">Every numeric assertion is backed by a source record.</p>
          </div>
        )}

        {draft && (
          <div>
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Cited Records</h4>
            <div className="space-y-2">
              {[
                { id: 'tx2', label: 'Donation — TechCorp CSR', detail: '₹25,000 · 2026-09-20' },
                { id: 'tx1, tx3', label: 'Donations — Ramesh + Ali', detail: '50 units funded combined' },
              ].map((src) => (
                <div
                  key={src.id}
                  className="p-3 bg-white border border-slate-200 rounded-lg shadow-sm cursor-pointer hover:border-slate-400 transition"
                >
                  <div className="text-xs font-bold text-slate-400 mb-0.5">{src.id}</div>
                  <div className="text-sm font-medium text-slate-700">{src.label}</div>
                  <div className="text-xs text-slate-400">{src.detail}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
