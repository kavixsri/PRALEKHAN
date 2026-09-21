export default function ReconciliationPage() {
    const mockRecon = [
        { id: 'r1', date: '2026-09-21', amount: 5000, ref: 'UPI/12345/Ramesh', status: 'matched', matchedDonation: 'tx1' },
        { id: 'r2', date: '2026-09-20', amount: 1500, ref: 'IMPS/98765/Ali', status: 'review', candidates: ['tx3', 'tx8'] },
        { id: 'r3', date: '2026-09-21', amount: 800, ref: 'CASH DEP', status: 'unmatched' },
    ];

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold text-primary">Reconciliation Inbox</h2>
                <button className="bg-primary text-primary-foreground px-4 py-2 rounded shadow-sm hover:opacity-90">Upload Bank CSV</button>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
                <table className="w-full text-left border-collapse">
                    <thead className="bg-slate-50 border-b border-slate-200">
                        <tr>
                            <th className="p-4 text-sm font-semibold text-slate-600">Bank Date</th>
                            <th className="p-4 text-sm font-semibold text-slate-600">Reference</th>
                            <th className="p-4 text-sm font-semibold text-slate-600">Amount (INR)</th>
                            <th className="p-4 text-sm font-semibold text-slate-600">Status</th>
                            <th className="p-4 text-sm font-semibold text-slate-600">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {mockRecon.map(r => (
                            <tr key={r.id} className="border-b border-slate-100 hover:bg-slate-50">
                                <td className="p-4 text-sm">{r.date}</td>
                                <td className="p-4 font-mono text-sm">{r.ref}</td>
                                <td className="p-4 font-bold">₹{r.amount.toLocaleString('en-IN')}</td>
                                <td className="p-4">
                                    <span className={\px-2 py-1 rounded text-xs font-semibold \\}>
                                        {r.status.toUpperCase()}
                                    </span>
                                </td>
                                <td className="p-4">
                                    {r.status === 'matched' ? (
                                        <span className="text-slate-400 text-sm">Resolved</span>
                                    ) : r.status === 'review' ? (
                                        <button className="text-accent hover:underline text-sm font-medium">Resolve (2 options)</button>
                                    ) : (
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
