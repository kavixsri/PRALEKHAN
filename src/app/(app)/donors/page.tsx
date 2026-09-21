'use client';

import { useState } from 'react';
import { DONORS } from '@/lib/mock-data';

export default function DonorsPage() {
  const [donors, setDonors] = useState(DONORS);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('All');
  const [showModal, setShowModal] = useState(false);
  const [newDonor, setNewDonor] = useState({ name: '', phone: '', email: '', city: '', type: 'individual', notes: '' });

  const filteredDonors = donors.filter(d => {
    const matchesSearch = d.name.toLowerCase().includes(search.toLowerCase()) || d.email.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === 'All' || 
                         (filter === 'Individual' && d.type === 'individual') || 
                         (filter === 'CSR' && d.type === 'csr') ||
                         (filter === 'Lapsed' && d.segment === 'lapsed');
    return matchesSearch && matchesFilter;
  });

  const handleAddDonor = (e: React.FormEvent) => {
    e.preventDefault();
    const donorToAdd = {
      id: `d${donors.length + 1}`,
      name: newDonor.name,
      phone: newDonor.phone,
      email: newDonor.email,
      city: newDonor.city,
      type: newDonor.type,
      totalDonated: 0,
      donations: 0,
      lastDonation: 'N/A',
      risk: 'low',
      segment: 'new',
    };
    setDonors([donorToAdd, ...donors]);
    setShowModal(false);
    setNewDonor({ name: '', phone: '', email: '', city: '', type: 'individual', notes: '' });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-bold" style={{ color: '#1E3A5F' }}>Donors</h1>
          <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded-full">
            {filteredDonors.length}
          </span>
        </div>
        <button 
          onClick={() => setShowModal(true)}
          className="px-4 py-2 rounded-[6px] text-white font-medium transition-colors" 
          style={{ backgroundColor: '#F59E0B' }}
        >
          + Add Donor
        </button>
      </div>

      <div className="bg-white rounded-[10px] shadow-[0_1px_3px_rgba(0,0,0,0.08),_0_4px_16px_rgba(0,0,0,0.04)] overflow-hidden">
        <div className="p-4 border-b border-gray-100 flex justify-between items-center gap-4">
          <input
            type="text"
            placeholder="Search donors by name or email..."
            className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-[6px] focus:outline-none focus:ring-2 focus:ring-[#1E3A5F]"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <div className="flex gap-2">
            {['All', 'Individual', 'CSR', 'Lapsed'].map(f => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-3 py-1.5 rounded-[6px] text-sm font-medium transition-colors border ${
                  filter === f ? 'bg-[#1E3A5F] text-white border-[#1E3A5F]' : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 font-medium">Donor</th>
                <th className="px-6 py-4 font-medium">Contact</th>
                <th className="px-6 py-4 font-medium">Location</th>
                <th className="px-6 py-4 font-medium">Type</th>
                <th className="px-6 py-4 font-medium text-right">Total Donated</th>
                <th className="px-6 py-4 font-medium text-right">Last Donation</th>
              </tr>
            </thead>
            <tbody>
              {filteredDonors.map((donor) => (
                <tr key={donor.id} className="bg-white border-b hover:bg-[#F0F4F8] transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold" style={{ backgroundColor: '#1E3A5F' }}>
                        {donor.name.charAt(0)}
                      </div>
                      <div className="font-medium text-gray-900">{donor.name}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div>{donor.phone}</div>
                    <div className="text-xs text-gray-400">{donor.email}</div>
                  </td>
                  <td className="px-6 py-4">{donor.city}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 text-xs rounded-full font-medium ${
                      donor.type === 'csr' ? 'bg-purple-100 text-purple-800' : 'bg-green-100 text-green-800'
                    }`}>
                      {donor.type.toUpperCase()}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right font-medium text-gray-900">
                    ₹{donor.totalDonated.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 text-right">
                    {donor.lastDonation}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filteredDonors.length === 0 && (
            <div className="p-8 text-center text-gray-500">
              No donors found matching your search.
            </div>
          )}
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-[10px] w-full max-w-md p-6 shadow-xl">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold" style={{ color: '#1E3A5F' }}>Add New Donor</h2>
              <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-gray-600">✕</button>
            </div>
            <form onSubmit={handleAddDonor} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <input required type="text" className="w-full px-3 py-2 border border-gray-300 rounded-[6px] focus:ring-2 focus:ring-[#1E3A5F] focus:outline-none" value={newDonor.name} onChange={e => setNewDonor({...newDonor, name: e.target.value})} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                  <input required type="text" className="w-full px-3 py-2 border border-gray-300 rounded-[6px] focus:ring-2 focus:ring-[#1E3A5F] focus:outline-none" value={newDonor.phone} onChange={e => setNewDonor({...newDonor, phone: e.target.value})} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input required type="email" className="w-full px-3 py-2 border border-gray-300 rounded-[6px] focus:ring-2 focus:ring-[#1E3A5F] focus:outline-none" value={newDonor.email} onChange={e => setNewDonor({...newDonor, email: e.target.value})} />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                  <input required type="text" className="w-full px-3 py-2 border border-gray-300 rounded-[6px] focus:ring-2 focus:ring-[#1E3A5F] focus:outline-none" value={newDonor.city} onChange={e => setNewDonor({...newDonor, city: e.target.value})} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-[6px] focus:ring-2 focus:ring-[#1E3A5F] focus:outline-none" value={newDonor.type} onChange={e => setNewDonor({...newDonor, type: e.target.value})}>
                    <option value="individual">Individual</option>
                    <option value="csr">CSR</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
                <textarea className="w-full px-3 py-2 border border-gray-300 rounded-[6px] focus:ring-2 focus:ring-[#1E3A5F] focus:outline-none" rows={2} value={newDonor.notes} onChange={e => setNewDonor({...newDonor, notes: e.target.value})}></textarea>
              </div>
              <div className="flex justify-end gap-3 mt-6">
                <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2 text-gray-600 font-medium hover:bg-gray-100 rounded-[6px] transition-colors">
                  Cancel
                </button>
                <button type="submit" className="px-4 py-2 text-white font-medium rounded-[6px] transition-colors" style={{ backgroundColor: '#1E3A5F' }}>
                  Save Donor
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
