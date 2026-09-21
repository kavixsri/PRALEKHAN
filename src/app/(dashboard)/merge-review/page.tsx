export default function MergeReviewPage() {
    const mockCandidates = [
        {
            id: 'mc1',
            score: 0.85,
            donorA: { name: 'Mohammad Ali', phone: '+918765432109', email: 'ali.m@example.com' },
            donorB: { name: 'Md. Ali', phone: '+918765432109', email: '' },
            reasons: ['Phone exact match', 'Name fuzzy match (variant)']
        },
        {
            id: 'mc2',
            score: 0.65,
            donorA: { name: 'Priya Sharma', phone: '+919999999999', email: 'priya@test.com' },
            donorB: { name: 'Priya Sharmah', phone: '', email: 'priya@test.com' },
            reasons: ['Email exact match', 'Name fuzzy match']
        }
    ];

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold text-primary">Merge Review Queue</h2>
            </div>
            <p className="text-slate-500 mb-6">These records have a medium confidence of being the same person. Please review and merge them manually.</p>
            
            <div className="space-y-6">
                {mockCandidates.map(c => (
                    <div key={c.id} className="bg-white rounded-lg shadow-sm border border-slate-200 p-6 flex items-start gap-8">
                        <div className="flex-1">
                            <h3 className="font-bold text-lg mb-4 text-slate-700">Record A (Master)</h3>
                            <div className="space-y-2 text-sm">
                                <p><span className="font-semibold text-slate-500 w-16 inline-block">Name:</span> {c.donorA.name}</p>
                                <p><span className="font-semibold text-slate-500 w-16 inline-block">Phone:</span> {c.donorA.phone || '-'}</p>
                                <p><span className="font-semibold text-slate-500 w-16 inline-block">Email:</span> {c.donorA.email || '-'}</p>
                            </div>
                        </div>
                        
                        <div className="flex flex-col items-center justify-center pt-8">
                            <div className="bg-amber-100 text-amber-800 px-3 py-1 rounded-full text-xs font-bold mb-2">
                                {(c.score * 100).toFixed(0)}% Match
                            </div>
                            <div className="text-xs text-slate-400 max-w-[120px] text-center">
                                {c.reasons.join(', ')}
                            </div>
                        </div>

                        <div className="flex-1 bg-slate-50 p-4 rounded border border-slate-100">
                            <h3 className="font-bold text-lg mb-4 text-slate-700">Record B (Merge into A)</h3>
                            <div className="space-y-2 text-sm">
                                <p><span className="font-semibold text-slate-500 w-16 inline-block">Name:</span> {c.donorB.name}</p>
                                <p><span className="font-semibold text-slate-500 w-16 inline-block">Phone:</span> {c.donorB.phone || '-'}</p>
                                <p><span className="font-semibold text-slate-500 w-16 inline-block">Email:</span> {c.donorB.email || '-'}</p>
                            </div>
                        </div>

                        <div className="flex flex-col gap-2">
                            <button className="bg-primary text-primary-foreground px-4 py-2 rounded shadow-sm hover:opacity-90">Approve Merge</button>
                            <button className="bg-white border border-slate-300 text-slate-700 px-4 py-2 rounded shadow-sm hover:bg-slate-50">Reject</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
