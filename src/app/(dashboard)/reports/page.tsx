'use client';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell, Legend,
} from 'recharts';

const campaignData = [
  { name: 'Open Classroom', amount: 450000 },
  { name: 'Winter Drive', amount: 120000 },
  { name: 'Diwali Fund', amount: 300000 },
  { name: 'Scholarship', amount: 180000 },
];

const retentionData = [
  { month: 'Jan', retention: 85 },
  { month: 'Feb', retention: 82 },
  { month: 'Mar', retention: 88 },
  { month: 'Apr', retention: 90 },
  { month: 'May', retention: 87 },
  { month: 'Jun', retention: 91 },
];

const channelData = [
  { name: 'Razorpay', value: 45 },
  { name: 'Bank/UPI', value: 30 },
  { name: 'Cash', value: 15 },
  { name: 'CSR', value: 10 },
];

const COLORS = ['#253A5E', '#F59E0B', '#10B981', '#8B5CF6'];

const riskDonors = [
  { name: 'Vikram Singh', recency: '14 months', freq: '4 gifts', monetary: '₹12,000', score: 85, reason: 'Recency >12m + high past frequency' },
  { name: 'Sunita Mehta', recency: '10 months', freq: '2 gifts', monetary: '₹5,500', score: 72, reason: 'Recency >9m + low frequency' },
  { name: 'Rajan Gupta', recency: '8 months', freq: '6 gifts', monetary: '₹30,000', score: 60, reason: 'Recency >6m — was very active' },
];

export default function ReportsPage() {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-primary">Insights & Reports</h2>
          <p className="text-sm text-slate-500 mt-1">Campaign, channel, retention, and lapse analytics</p>
        </div>
        <button className="bg-white border border-slate-300 text-slate-700 px-4 py-2 rounded shadow-sm hover:bg-slate-50 text-sm font-medium">
          Export PDF
        </button>
      </div>

      {/* KPI cards */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        {[
          { label: 'Total Donors', value: '24,891', delta: '+321 this month' },
          { label: 'Donations (Sept)', value: '₹8.7L', delta: '+12% vs Aug' },
          { label: 'Retention Rate', value: '91%', delta: '+1% vs last quarter' },
          { label: 'Lapse Risk Queue', value: '3', delta: 'Action needed' },
        ].map((kpi) => (
          <div key={kpi.label} className="bg-white p-5 rounded-lg border border-slate-200 shadow-sm">
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">{kpi.label}</p>
            <p className="text-2xl font-bold text-primary mt-1">{kpi.value}</p>
            <p className="text-xs text-slate-400 mt-1">{kpi.delta}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-6 mb-6">
        {/* Campaign bar chart */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
          <h3 className="text-base font-semibold text-slate-700 mb-4">Campaign Performance (₹)</h3>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={campaignData} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 11 }} />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 11 }}
                  tickFormatter={(v: number) => `${v / 1000}k`}
                />
                {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                <Tooltip formatter={(v: any) => [`₹${Number(v).toLocaleString('en-IN')}`, 'Amount']} />
                <Bar dataKey="amount" fill="#253A5E" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Retention line chart */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
          <h3 className="text-base font-semibold text-slate-700 mb-4">Donor Retention Rate (%)</h3>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={retentionData} margin={{ top: 0, right: 10, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 11 }} />
                <YAxis axisLine={false} tickLine={false} domain={[70, 100]} tick={{ fontSize: 11 }} />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="retention"
                  stroke="#F59E0B"
                  strokeWidth={3}
                  dot={{ r: 4, fill: '#F59E0B', strokeWidth: 2, stroke: '#fff' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6 mb-6">
        {/* Channel pie */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
          <h3 className="text-base font-semibold text-slate-700 mb-4">Channel Mix</h3>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={channelData} cx="50%" cy="50%" outerRadius={70} dataKey="value" label={false}>
                  {channelData.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Legend iconSize={10} iconType="circle" />
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Lapse risk queue */}
        <div className="col-span-2 bg-white rounded-lg shadow-sm border border-slate-200 p-6">
          <h3 className="text-base font-semibold text-slate-700 mb-4">Lapse Risk Queue (RFM Score)</h3>
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="pb-2 text-left text-xs font-semibold text-slate-500 uppercase">Donor</th>
                <th className="pb-2 text-left text-xs font-semibold text-slate-500 uppercase">Recency</th>
                <th className="pb-2 text-left text-xs font-semibold text-slate-500 uppercase">Gifts</th>
                <th className="pb-2 text-left text-xs font-semibold text-slate-500 uppercase">Total</th>
                <th className="pb-2 text-left text-xs font-semibold text-slate-500 uppercase">Risk</th>
              </tr>
            </thead>
            <tbody>
              {riskDonors.map((d) => (
                <tr key={d.name} className="border-b border-slate-100">
                  <td className="py-3 font-medium">{d.name}</td>
                  <td className="py-3 text-red-500 font-medium">{d.recency}</td>
                  <td className="py-3">{d.freq}</td>
                  <td className="py-3">{d.monetary}</td>
                  <td className="py-3">
                    <span
                      className="px-2 py-1 rounded text-xs font-bold bg-red-100 text-red-700 cursor-help"
                      title={d.reason}
                    >
                      {d.score} / 100
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="text-xs text-slate-400 mt-3">Hover the score badge to see the RFM breakdown &quot;why&quot;.</p>
        </div>
      </div>
    </div>
  );
}
