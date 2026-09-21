export default function DonationsPage() {
    const mockDonations = [
        { id: 'tx1', donor: 'Ramesh Sharma', amount: 5000, date: '2026-09-21', channel: 'razorpay', status: 'completed' },
        { id: 'tx2', donor: 'TechCorp CSR', amount: 250000, date: '2026-09-20', channel: 'bank', status: 'completed' },
        { id: 'tx3', donor: 'Mohammad Ali', amount: 1500, date: '2026-09-18', channel: 'upi', status: 'completed' },
    ];

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold text-primary">Donation Ledger</h2>
                <button className="bg-primary text-primary-foreground px-4 py-2 rounded shadow-sm hover:opacity-90">Manual Entry</button>
            </div>
            <div className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
                <table className="w-full text-left border-collapse">
                    <thead className="bg-slate-50 border-b border-slate-200">
                        <tr>
                            <th className="p-4 text-sm font-semibold text-slate-600">Date</th>
                            <th className="p-4 text-sm font-semibold text-slate-600">Donor</th>
                            <th className="p-4 text-sm font-semibold text-slate-600">Amount (INR)</th>
                            <th className="p-4 text-sm font-semibold text-slate-600">Channel</th>
                            <th className="p-4 text-sm font-semibold text-slate-600">Status</th>
                            <th className="p-4 text-sm font-semibold text-slate-600">Receipt</th>
                        </tr>
                    </thead>
                    <tbody>
                        {mockDonations.map(d => (
                            <tr key={d.id} className="border-b border-slate-100 hover:bg-slate-50">
                                <td className="p-4 text-sm">{d.date}</td>
                                <td className="p-4 font-medium">{d.donor}</td>
                                <td className="p-4 font-bold">₹{d.amount.toLocaleString('en-IN')}</td>
                                <td className="p-4 text-sm uppercase">{d.channel}</td>
                                <td className="p-4">
                                    <span className="px-2 py-1 rounded text-xs font-semibold bg-green-100 text-green-700">
                                        {d.status}
                                    </span>
                                </td>
                                <td className="p-4">
                                    <button className="text-accent hover:underline text-sm font-medium">80G PDF</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
