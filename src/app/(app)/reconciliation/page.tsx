'use client';

import { RECON_ITEMS } from '@/lib/mock-data';

export default function ReconciliationPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold" style={{ color: '#1E3A5F' }}>Reconciliation</h1>
          <p className="text-gray-500 mt-1">Match bank transactions with recorded donations.</p>
        </div>
        <button className="px-4 py-2 rounded-[6px] text-white font-medium transition-colors" style={{ backgroundColor: '#1E3A5F' }}>
          Upload Statement
        </button>
      </div>

      <div className="bg-white rounded-[10px] shadow-[0_1px_3px_rgba(0,0,0,0.08),_0_4px_16px_rgba(0,0,0,0.04)] overflow-hidden">
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-4 font-medium">Date</th>
              <th className="px-6 py-4 font-medium">Bank Ref</th>
              <th className="px-6 py-4 font-medium text-right">Amount</th>
              <th className="px-6 py-4 font-medium">Status</th>
              <th className="px-6 py-4 font-medium">Action</th>
            </tr>
          </thead>
          <tbody>
            {RECON_ITEMS.map((item) => (
              <tr key={item.id} className="bg-white border-b hover:bg-[#F0F4F8] transition-colors">
                <td className="px-6 py-4">{item.date}</td>
                <td className="px-6 py-4 font-mono text-xs">{item.ref}</td>
                <td className="px-6 py-4 text-right font-bold text-gray-900">₹{item.amount.toLocaleString()}</td>
                <td className="px-6 py-4">
                  <span className={`px-2.5 py-1 text-xs rounded-full font-medium ${
                    item.status === 'matched' ? 'bg-green-100 text-green-800' :
                    item.status === 'unmatched' ? 'bg-red-100 text-red-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {item.status.toUpperCase()}
                  </span>
                  {item.matchedDonor && <p className="text-xs text-gray-500 mt-1">Found: {item.matchedDonor}</p>}
                </td>
                <td className="px-6 py-4">
                  {item.status === 'matched' ? (
                    <button className="text-gray-400 cursor-not-allowed text-sm font-medium">Matched</button>
                  ) : (
                    <button className="text-[#F59E0B] hover:text-amber-600 font-medium text-sm">Review</button>
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
