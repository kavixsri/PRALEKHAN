'use client';

import { useState, useEffect } from 'react';

export default function SettingsPage() {
  const [user, setUser] = useState({ name: '', email: '', role: '', org: '' });
  const [toast, setToast] = useState('');

  useEffect(() => {
    const auth = localStorage.getItem('pralekhan_auth');
    if (auth) {
      try {
        setUser(JSON.parse(auth));
      } catch (e) {}
    }
  }, []);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setToast('Settings saved successfully!');
    setTimeout(() => setToast(''), 3000);
  };

  return (
    <div className="max-w-4xl space-y-8">
      <div>
        <h1 className="text-3xl font-bold" style={{ color: '#1E3A5F' }}>Settings</h1>
        <p className="text-gray-500 mt-1">Manage your account and organization preferences.</p>
      </div>

      {toast && (
        <div className="bg-green-50 text-green-800 p-4 rounded-[6px] border border-green-200 font-medium">
          {toast}
        </div>
      )}

      {/* Profile Section */}
      <section className="bg-white rounded-[10px] shadow-[0_1px_3px_rgba(0,0,0,0.08),_0_4px_16px_rgba(0,0,0,0.04)] p-6">
        <h2 className="text-xl font-semibold mb-4 border-b pb-2" style={{ color: '#1E3A5F' }}>Profile Settings</h2>
        <form onSubmit={handleSave} className="space-y-4 max-w-2xl">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
              <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-[6px] focus:ring-2 focus:ring-[#1E3A5F] focus:outline-none" defaultValue={user.name} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input type="email" disabled className="w-full px-3 py-2 border border-gray-200 bg-gray-50 rounded-[6px] text-gray-500" defaultValue={user.email} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
              <input type="text" disabled className="w-full px-3 py-2 border border-gray-200 bg-gray-50 rounded-[6px] text-gray-500" defaultValue={user.role} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Organization</label>
              <input type="text" disabled className="w-full px-3 py-2 border border-gray-200 bg-gray-50 rounded-[6px] text-gray-500" defaultValue={user.org} />
            </div>
          </div>
          <button type="submit" className="px-4 py-2 text-white font-medium rounded-[6px] transition-colors mt-4" style={{ backgroundColor: '#1E3A5F' }}>
            Save Profile
          </button>
        </form>
      </section>

      {/* Security Section */}
      <section className="bg-white rounded-[10px] shadow-[0_1px_3px_rgba(0,0,0,0.08),_0_4px_16px_rgba(0,0,0,0.04)] p-6">
        <h2 className="text-xl font-semibold mb-4 border-b pb-2" style={{ color: '#1E3A5F' }}>Security</h2>
        <form onSubmit={handleSave} className="space-y-4 max-w-sm">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Current Password</label>
            <input type="password" required className="w-full px-3 py-2 border border-gray-300 rounded-[6px] focus:ring-2 focus:ring-[#1E3A5F] focus:outline-none" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
            <input type="password" required className="w-full px-3 py-2 border border-gray-300 rounded-[6px] focus:ring-2 focus:ring-[#1E3A5F] focus:outline-none" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Confirm New Password</label>
            <input type="password" required className="w-full px-3 py-2 border border-gray-300 rounded-[6px] focus:ring-2 focus:ring-[#1E3A5F] focus:outline-none" />
          </div>
          <button type="submit" className="px-4 py-2 text-white font-medium rounded-[6px] transition-colors mt-2" style={{ backgroundColor: '#1E3A5F' }}>
            Update Password
          </button>
        </form>
      </section>

      {/* Org Settings Section */}
      <section className="bg-white rounded-[10px] shadow-[0_1px_3px_rgba(0,0,0,0.08),_0_4px_16px_rgba(0,0,0,0.04)] p-6">
        <h2 className="text-xl font-semibold mb-4 border-b pb-2" style={{ color: '#1E3A5F' }}>Organization Settings</h2>
        <form onSubmit={handleSave} className="space-y-4 max-w-2xl">
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">NGO Name</label>
              <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-[6px] focus:ring-2 focus:ring-[#1E3A5F] focus:outline-none" defaultValue="UPAY NGO" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">80G Number</label>
              <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-[6px] focus:ring-2 focus:ring-[#1E3A5F] focus:outline-none" defaultValue="DEL-80G-2023-987" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">12A Number</label>
              <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-[6px] focus:ring-2 focus:ring-[#1E3A5F] focus:outline-none" defaultValue="DEL-12A-2023-456" />
            </div>
            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Razorpay Webhook URL</label>
              <input type="password" disabled className="w-full px-3 py-2 border border-gray-200 bg-gray-50 rounded-[6px] text-gray-500" defaultValue="https://api.pralekhan.upay.org/webhooks/razorpay" />
            </div>
            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">WhatsApp Template ID (80G Receipt)</label>
              <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-[6px] focus:ring-2 focus:ring-[#1E3A5F] focus:outline-none" defaultValue="tmpl_80g_receipt_v2" />
            </div>
          </div>
          <button type="submit" className="px-4 py-2 text-white font-medium rounded-[6px] transition-colors mt-4" style={{ backgroundColor: '#1E3A5F' }}>
            Save Organization Settings
          </button>
        </form>
      </section>
    </div>
  );
}
