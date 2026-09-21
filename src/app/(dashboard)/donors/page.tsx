import Link from 'next/link';

const mockDonors = [
  { id: '1', name: 'Ramesh Sharma', phone: '+919876543210', email: 'ramesh@example.com', type: 'individual', risk: 'low' as const },
  { id: '2', name: 'Mohammad Ali', phone: '+918765432109', email: 'ali.m@example.com', type: 'individual', risk: 'high' as const },
  { id: '3', name: 'TechCorp CSR', phone: '+917654321098', email: 'csr@techcorp.in', type: 'csr', risk: 'medium' as const },
  { id: '4', name: 'Priya Sharmah', phone: '', email: 'priya@test.com', type: 'individual', risk: 'low' as const },
  { id: '5', name: 'Vikram Singh', phone: '+919123456789', email: 'vikram@singh.com', type: 'individual', risk: 'high' as const },
];

const riskClass = {
  high: 'bg-red-100 text-red-700',
  medium: 'bg-amber-100 text-amber-700',
  low: 'bg-green-100 text-green-700',
};

export default function DonorsPage() {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-primary">Donors</h2>
          <p className="text-sm text-slate-500 mt-1">25,000 donors · 2 pending merge reviews</p>
        </div>
        <div className="flex gap-3">
          <Link href="/merge-review">
            <button className="border border-amber-400 text-amber-700 bg-amber-50 px-4 py-2 rounded shadow-sm hover:bg-amber-100 text-sm font-medium">
              ⚠ Merge Review (2)
            </button>
          </Link>
          <Link href="/donors/import">
            <button className="bg-accent text-accent-foreground px-4 py-2 rounded shadow-sm hover:opacity-90 text-sm font-semibold">
              Import CSV
            </button>
          </Link>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="p-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Name</th>
              <th className="p-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Contact</th>
              <th className="p-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Type</th>
              <th className="p-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Lapse Risk</th>
              <th className="p-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Action</th>
            </tr>
          </thead>
          <tbody>
            {mockDonors.map((d) => (
              <tr key={d.id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                <td className="p-4 font-medium text-slate-800">{d.name}</td>
                <td className="p-4 text-sm text-slate-500">
                  <div>{d.phone || '—'}</div>
                  <div>{d.email}</div>
                </td>
                <td className="p-4 text-xs font-semibold uppercase tracking-wider text-slate-600">
                  {d.type}
                </td>
                <td className="p-4">
                  <span className={`px-2 py-1 rounded text-xs font-semibold ${riskClass[d.risk]}`}>
                    {d.risk}
                  </span>
                </td>
                <td className="p-4">
                  <button className="text-primary hover:underline text-sm font-medium">View 360°</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
