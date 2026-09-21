'use client';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';

export default function ReportsPage() {
    const campaignData = [
        { name: 'Open Classroom', amount: 450000 },
        { name: 'Winter Drive', amount: 120000 },
        { name: 'Diwali Fund', amount: 300000 },
    ];

    const retentionData = [
        { month: 'Jan', retention: 85 },
        { month: 'Feb', retention: 82 },
        { month: 'Mar', retention: 88 },
        { month: 'Apr', retention: 90 },
    ];

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold text-primary">Insights & Reports</h2>
                <button className="bg-white border border-slate-300 text-slate-700 px-4 py-2 rounded shadow-sm hover:bg-slate-50">Export PDF</button>
            </div>

            <div className="grid grid-cols-2 gap-6 mb-6">
                <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
                    <h3 className="text-lg font-semibold text-slate-700 mb-4">Campaign Performance</h3>
                    <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={campaignData}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} />
                                <YAxis axisLine={false} tickLine={false} tickFormatter={(value) => \\k\} />
                                <Tooltip cursor={{fill: '#f8fafc'}} />
                                <Bar dataKey="amount" fill="#253A5E" radius={[4, 4, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
                    <h3 className="text-lg font-semibold text-slate-700 mb-4">Donor Retention (%)</h3>
                    <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={retentionData}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                <XAxis dataKey="month" axisLine={false} tickLine={false} />
                                <YAxis axisLine={false} tickLine={false} domain={[0, 100]} />
                                <Tooltip />
                                <Line type="monotone" dataKey="retention" stroke="#F59E0B" strokeWidth={3} dot={{r: 4, fill: '#F59E0B', strokeWidth: 2, stroke: '#fff'}} />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
                <h3 className="text-lg font-semibold text-slate-700 mb-4">Lapse Risk Queue (RFM)</h3>
                <table className="w-full text-left border-collapse">
                    <thead className="bg-slate-50 border-b border-slate-200">
                        <tr>
                            <th className="p-3 text-sm font-semibold text-slate-600">Donor</th>
                            <th className="p-3 text-sm font-semibold text-slate-600">Recency</th>
                            <th className="p-3 text-sm font-semibold text-slate-600">Frequency</th>
                            <th className="p-3 text-sm font-semibold text-slate-600">Monetary</th>
                            <th className="p-3 text-sm font-semibold text-slate-600">Risk Score</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="border-b border-slate-100">
                            <td className="p-3 font-medium">Vikram Singh</td>
                            <td className="p-3 text-sm text-red-500">14 months ago</td>
                            <td className="p-3 text-sm">4 gifts</td>
                            <td className="p-3 text-sm">₹12,000</td>
                            <td className="p-3">
                                <span className="px-2 py-1 rounded text-xs font-bold bg-red-100 text-red-700 cursor-help" title="High risk due to >12 month recency despite past high frequency">85 / 100</span>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}
