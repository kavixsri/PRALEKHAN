import Link from 'next/link';

export default function DonorsPage() {
    const mockDonors = [
        { id: '1', name: 'Ramesh Sharma', phone: '+919876543210', email: 'ramesh@example.com', type: 'individual', risk: 'low' },
        { id: '2', name: 'Mohammad Ali', phone: '+918765432109', email: 'ali.m@example.com', type: 'individual', risk: 'high' },
        { id: '3', name: 'TechCorp CSR', phone: '+917654321098', email: 'csr@techcorp.in', type: 'csr', risk: 'medium' },
    ];

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold text-primary">Donors</h2>
                <Link href="/donors/import">
                    <button className="bg-accent text-accent-foreground px-4 py-2 rounded shadow-sm hover:opacity-90">Import CSV</button>
                </Link>
            </div>
            <div className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
                <table className="w-full text-left border-collapse">
                    <thead className="bg-slate-50 border-b border-slate-200">
                        <tr>
                            <th className="p-4 text-sm font-semibold text-slate-600">Name</th>
                            <th className="p-4 text-sm font-semibold text-slate-600">Contact</th>
                            <th className="p-4 text-sm font-semibold text-slate-600">Type</th>
                            <th className="p-4 text-sm font-semibold text-slate-600">Lapse Risk</th>
                            <th className="p-4 text-sm font-semibold text-slate-600">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {mockDonors.map(d => (
                            <tr key={d.id} className="border-b border-slate-100 hover:bg-slate-50">
                                <td className="p-4 font-medium">{d.name}</td>
                                <td className="p-4 text-sm text-slate-500">
                                    <div>{d.phone}</div>
                                    <div>{d.email}</div>
                                </td>
                                <td className="p-4 text-sm uppercase tracking-wider">{d.type}</td>
                                <td className="p-4">
                                    <span className={\px-2 py-1 rounded text-xs font-semibold \\}>
                                        {d.risk}
                                    </span>
                                </td>
                                <td className="p-4">
                                    <button className="text-primary hover:underline text-sm font-medium">View 360</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
