export default function DonationsPage() {
  const mockDonations = [
    { id: 'tx1', donor: 'Ramesh Sharma', amount: 5000, date: '2026-09-21', channel: 'Razorpay', status: 'completed' },
    { id: 'tx2', donor: 'TechCorp CSR', amount: 250000, date: '2026-09-20', channel: 'Bank Transfer', status: 'completed' },
    { id: 'tx3', donor: 'Mohammad Ali', amount: 1500, date: '2026-09-18', channel: 'UPI', status: 'completed' },
    { id: 'tx4', donor: 'Priya Sharma', amount: 3000, date: '2026-09-17', channel: 'Cash', status: 'completed' },
    { id: 'tx5', donor: 'Vikram Singh', amount: 10000, date: '2026-09-15', channel: 'Cheque', status: 'pending' },
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold" style={{ color: '#253A5E' }}>Donation Ledger</h2>
          <p className="text-sm text-slate-500 mt-1">60,000+ donations · All channels unified</p>
        </div>
        <button
          className="text-white px-4 py-2 rounded shadow-sm text-sm font-semibold"
          style={{ backgroundColor: '#253A5E' }}
        >
          + Manual Entry
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead className="border-b border-slate-200" style={{ backgroundColor: '#f8fafc' }}>
            <tr>
              {['Date', 'Donor', 'Amount', 'Channel', 'Status', '80G Receipt'].map((h) => (
                <th key={h} className="p-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {mockDonations.map((d) => (
              <tr key={d.id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                <td className="p-4 text-sm font-mono text-slate-500">{d.date}</td>
                <td className="p-4 font-medium text-slate-800">{d.donor}</td>
                <td className="p-4 font-bold text-slate-800">₹{d.amount.toLocaleString('en-IN')}</td>
                <td className="p-4 text-sm text-slate-600">{d.channel}</td>
                <td className="p-4">
                  <span
                    className="px-2 py-1 rounded text-xs font-semibold"
                    style={{
                      backgroundColor: d.status === 'completed' ? '#dcfce7' : '#fef9c3',
                      color: d.status === 'completed' ? '#15803d' : '#854d0e',
                    }}
                  >
                    {d.status}
                  </span>
                </td>
                <td className="p-4">
                  <button className="text-sm font-medium" style={{ color: '#F59E0B' }}>
                    Download PDF
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
