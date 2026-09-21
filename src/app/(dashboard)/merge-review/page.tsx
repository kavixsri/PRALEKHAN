export default function MergeReviewPage() {
  const mockCandidates = [
    {
      id: 'mc1',
      score: 0.85,
      donorA: { name: 'Mohammad Ali', phone: '+918765432109', email: 'ali.m@example.com' },
      donorB: { name: 'Md. Ali', phone: '+918765432109', email: '' },
      reasons: ['Phone exact match', 'Name variant (Md → Mohammad)'],
    },
    {
      id: 'mc2',
      score: 0.65,
      donorA: { name: 'Priya Sharma', phone: '+919999999999', email: 'priya@test.com' },
      donorB: { name: 'Priya Sharmah', phone: '', email: 'priya@test.com' },
      reasons: ['Email exact match', 'Name fuzzy match (trigram 0.72)'],
    },
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold" style={{ color: '#253A5E' }}>Merge Review Queue</h2>
          <p className="text-sm text-slate-500 mt-1">
            2 records need human review — never silently merged
          </p>
        </div>
      </div>

      <div className="mb-4 p-4 rounded-lg border text-sm" style={{ backgroundColor: '#fffbeb', borderColor: '#fde68a', color: '#92400e' }}>
        ⚠ Confident matches (score ≥ 0.90) are auto-linked with an audit log entry. Records below show 0.50–0.89 scores requiring your decision.
      </div>

      <div className="space-y-6">
        {mockCandidates.map((c) => (
          <div key={c.id} className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <div className="flex items-start gap-6">
              {/* Record A */}
              <div className="flex-1 p-4 rounded-lg" style={{ backgroundColor: '#f0f9ff', border: '1px solid #bae6fd' }}>
                <h3 className="font-bold text-sm text-slate-500 uppercase tracking-wider mb-3">Record A — Master</h3>
                <div className="space-y-1.5 text-sm">
                  <p><span className="font-semibold text-slate-400 w-14 inline-block">Name</span> <span className="font-medium text-slate-800">{c.donorA.name}</span></p>
                  <p><span className="font-semibold text-slate-400 w-14 inline-block">Phone</span> {c.donorA.phone || '—'}</p>
                  <p><span className="font-semibold text-slate-400 w-14 inline-block">Email</span> {c.donorA.email || '—'}</p>
                </div>
              </div>

              {/* Score badge */}
              <div className="flex flex-col items-center justify-center pt-6 min-w-[100px]">
                <div className="text-2xl font-black mb-1" style={{ color: '#F59E0B' }}>
                  {Math.round(c.score * 100)}%
                </div>
                <div className="text-xs text-slate-400 text-center">match score</div>
                <div className="mt-2 space-y-1">
                  {c.reasons.map((r) => (
                    <div key={r} className="text-xs text-center px-2 py-0.5 rounded" style={{ backgroundColor: '#f3f4f6', color: '#6b7280' }}>
                      {r}
                    </div>
                  ))}
                </div>
              </div>

              {/* Record B */}
              <div className="flex-1 p-4 rounded-lg" style={{ backgroundColor: '#fafafa', border: '1px solid #e5e7eb' }}>
                <h3 className="font-bold text-sm text-slate-500 uppercase tracking-wider mb-3">Record B — Merge into A</h3>
                <div className="space-y-1.5 text-sm">
                  <p><span className="font-semibold text-slate-400 w-14 inline-block">Name</span> <span className="font-medium text-slate-800">{c.donorB.name}</span></p>
                  <p><span className="font-semibold text-slate-400 w-14 inline-block">Phone</span> {c.donorB.phone || '—'}</p>
                  <p><span className="font-semibold text-slate-400 w-14 inline-block">Email</span> {c.donorB.email || '—'}</p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col gap-2 pt-4">
                <button
                  className="text-white px-5 py-2 rounded-lg font-semibold text-sm"
                  style={{ backgroundColor: '#253A5E' }}
                >
                  Approve Merge
                </button>
                <button className="px-5 py-2 rounded-lg text-sm border border-slate-300 text-slate-600 hover:bg-slate-50">
                  Reject
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
