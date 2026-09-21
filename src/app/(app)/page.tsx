'use client';

import { DONORS, DONATIONS } from '@/lib/mock-data';
import Link from 'next/link';

export default function Dashboard() {
  const kpiCards = [
    { label: 'Total Donors', value: '24,891', change: '+321 this month' },
    { label: 'Total Raised (FY26-27)', value: '₹98.7L', change: '+12% vs last year' },
    { label: 'Active Campaigns', value: '4', change: 'On track' },
    { label: 'Pending Reconciliation', value: '2', change: 'Requires review' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold" style={{ color: '#1E3A5F' }}>Dashboard</h1>
          <p className="text-gray-500 mt-1">Welcome back, Admin</p>
        </div>
        <div className="flex gap-3">
          <Link href="/donors" className="px-4 py-2 rounded-[6px] text-white font-medium transition-colors" style={{ backgroundColor: '#1E3A5F' }}>
            + Add Donor
          </Link>
          <Link href="/donations" className="px-4 py-2 rounded-[6px] text-white font-medium transition-colors" style={{ backgroundColor: '#F59E0B' }}>
            + Record Donation
          </Link>
        </div>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {kpiCards.map((kpi, i) => (
          <div key={i} className="bg-white p-6 rounded-[10px] shadow-[0_1px_3px_rgba(0,0,0,0.08),_0_4px_16px_rgba(0,0,0,0.04)]">
            <h3 className="text-gray-500 text-sm font-medium">{kpi.label}</h3>
            <p className="text-3xl font-bold mt-2" style={{ color: '#1E3A5F' }}>{kpi.value}</p>
            <p className="text-sm text-green-600 mt-2 font-medium">{kpi.change}</p>
          </div>
        ))}
      </div>

      {/* Quick Actions & Recent Activity */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        <div className="md:col-span-2 bg-white rounded-[10px] shadow-[0_1px_3px_rgba(0,0,0,0.08),_0_4px_16px_rgba(0,0,0,0.04)] p-6">
          <h2 className="text-xl font-semibold mb-4" style={{ color: '#1E3A5F' }}>Recent Donations</h2>
          <div className="space-y-4">
            {DONATIONS.slice(0, 5).map((tx) => (
              <div key={tx.id} className="flex justify-between items-center py-3 border-b border-gray-100 last:border-0">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold" style={{ backgroundColor: '#F59E0B' }}>
                    {tx.donor.charAt(0)}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{tx.donor}</p>
                    <p className="text-sm text-gray-500">{tx.campaign} • {tx.channel}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-gray-900">₹{tx.amount.toLocaleString()}</p>
                  <p className="text-xs text-gray-500">{tx.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-[10px] shadow-[0_1px_3px_rgba(0,0,0,0.08),_0_4px_16px_rgba(0,0,0,0.04)] p-6">
          <h2 className="text-xl font-semibold mb-4" style={{ color: '#1E3A5F' }}>Quick Links</h2>
          <div className="space-y-3">
            <Link href="/donors/import" className="block w-full py-3 px-4 border border-gray-200 rounded-[6px] text-gray-700 hover:bg-gray-50 transition-colors font-medium">
              📥 Import CSV
            </Link>
            <Link href="/reconciliation" className="block w-full py-3 px-4 border border-gray-200 rounded-[6px] text-gray-700 hover:bg-gray-50 transition-colors font-medium">
              🏦 Upload Bank Statement
            </Link>
            <Link href="/reports" className="block w-full py-3 px-4 border border-gray-200 rounded-[6px] text-gray-700 hover:bg-gray-50 transition-colors font-medium">
              📈 View Monthly Report
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
