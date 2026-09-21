'use client';

import { useState } from 'react';
import { DONATIONS, DONORS } from '@/lib/mock-data';
import Link from 'next/link';

export default function DonationsPage() {
  const [donations, setDonations] = useState(DONATIONS);
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [newDonation, setNewDonation] = useState({ donorId: '', amount: '', date: '', channel: 'Razorpay', campaign: 'Open Classroom' });

  const filteredDonations = donations.filter(d => 
    d.donor.toLowerCase().includes(search.toLowerCase()) || 
    d.campaign.toLowerCase().includes(search.toLowerCase()) ||
    d.receipt.toLowerCase().includes(search.toLowerCase())
  );

  const handleAddDonation = (e: React.FormEvent) => {
    e.preventDefault();
    const donor = DONORS.find(d => d.id === newDonation.donorId);
    if (!donor) return;

    const tx = {
      id: `tx${donations.length + 1}`,
      donorId: donor.id,
      donor: donor.name,
      amount: parseInt(newDonation.amount),
      date: newDonation.date,
      channel: newDonation.channel,
      campaign: newDonation.campaign,
      status: 'completed',
      receipt: `80G-2026-${String(donations.length + 1).padStart(3, '0')}`
    };
    
    setDonations([tx, ...donations]);
    setShowModal(false);
    setNewDonation({ donorId: '', amount: '', date: '', channel: 'Razorpay', campaign: 'Open Classroom' });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-bold" style={{ color: '#1E3A5F' }}>Donations</h1>
          <span className="bg-green-100 text-green-800 text-xs font-semibold px-2.5 py-0.5 rounded-full">
            ₹{donations.reduce((acc, curr) => acc + curr.amount, 0).toLocaleString()} Total
          </span>
        </div>
        <button 
          onClick={() => setShowModal(true)}
          className="px-4 py-2 rounded-[6px] text-white font-medium transition-colors" 
          style={{ backgroundColor: '#F59E0B' }}
        >
          + Record Donation
        </button>
      </div>

      <div className="bg-white rounded-[10px] shadow-[0_1px_3px_rgba(0,0,0,0.08),_0_4px_16px_rgba(0,0,0,0.04)] overflow-hidden">
        <div className="p-4 border-b border-gray-100">
          <input
            type="text"
            placeholder="Search by donor, campaign or receipt..."
            className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-[6px] focus:outline-none focus:ring-2 focus:ring-[#1E3A5F]"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 font-medium">Date</th>
                <th className="px-6 py-4 font-medium">Donor</th>
                <th className="px-6 py-4 font-medium">Campaign</th>
                <th className="px-6 py-4 font-medium">Channel</th>
                <th className="px-6 py-4 font-medium text-right">Amount</th>
                <th className="px-6 py-4 font-medium text-center">Receipt</th>
              </tr>
            </thead>
            <tbody>
              {filteredDonations.map((tx) => (
                <tr key={tx.id} className="bg-white border-b hover:bg-[#F0F4F8] transition-colors">
                  <td className="px-6 py-4 text-gray-900">{tx.date}</td>
                  <td className="px-6 py-4 font-medium" style={{ color: '#1E3A5F' }}>
                    <Link href={`/donors/${tx.donorId}`} className="hover:underline">
                      {tx.donor}
                    </Link>
                  </td>
                  <td className="px-6 py-4">{tx.campaign}</td>
                  <td className="px-6 py-4">
                    <span className="px-2.5 py-1 bg-gray-100 text-gray-700 text-xs rounded-full font-medium">
                      {tx.channel}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right font-bold text-gray-900">
                    ₹{tx.amount.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <button className="text-blue-600 hover:text-blue-800 text-xs font-medium">
                      {tx.receipt}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filteredDonations.length === 0 && (
            <div className="p-8 text-center text-gray-500">
              No donations found matching your search.
            </div>
          )}
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-[10px] w-full max-w-md p-6 shadow-xl">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold" style={{ color: '#1E3A5F' }}>Record Donation</h2>
              <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-gray-600">✕</button>
            </div>
            <form onSubmit={handleAddDonation} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Donor</label>
                <select required className="w-full px-3 py-2 border border-gray-300 rounded-[6px] focus:ring-2 focus:ring-[#1E3A5F] focus:outline-none" value={newDonation.donorId} onChange={e => setNewDonation({...newDonation, donorId: e.target.value})}>
                  <option value="">Select a donor...</option>
                  {DONORS.map(d => (
                    <option key={d.id} value={d.id}>{d.name} ({d.phone})</option>
                  ))}
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Amount (₹)</label>
                  <input required type="number" min="1" className="w-full px-3 py-2 border border-gray-300 rounded-[6px] focus:ring-2 focus:ring-[#1E3A5F] focus:outline-none" value={newDonation.amount} onChange={e => setNewDonation({...newDonation, amount: e.target.value})} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                  <input required type="date" className="w-full px-3 py-2 border border-gray-300 rounded-[6px] focus:ring-2 focus:ring-[#1E3A5F] focus:outline-none" value={newDonation.date} onChange={e => setNewDonation({...newDonation, date: e.target.value})} />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Channel</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-[6px] focus:ring-2 focus:ring-[#1E3A5F] focus:outline-none" value={newDonation.channel} onChange={e => setNewDonation({...newDonation, channel: e.target.value})}>
                    <option>Razorpay</option>
                    <option>UPI</option>
                    <option>Bank Transfer</option>
                    <option>Cheque</option>
                    <option>Cash</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Campaign</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-[6px] focus:ring-2 focus:ring-[#1E3A5F] focus:outline-none" value={newDonation.campaign} onChange={e => setNewDonation({...newDonation, campaign: e.target.value})}>
                    <option>Open Classroom</option>
                    <option>Scholarship Fund</option>
                    <option>Winter Drive</option>
                    <option>Diwali Drive</option>
                    <option>Education Infrastructure</option>
                  </select>
                </div>
              </div>
              <div className="flex justify-end gap-3 mt-6">
                <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2 text-gray-600 font-medium hover:bg-gray-100 rounded-[6px] transition-colors">
                  Cancel
                </button>
                <button type="submit" className="px-4 py-2 text-white font-medium rounded-[6px] transition-colors" style={{ backgroundColor: '#1E3A5F' }}>
                  Save Donation
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
