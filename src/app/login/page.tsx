'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (email === 'admin@upay.org' && password === 'upay2026') {
      localStorage.setItem(
        'pralekhan_auth',
        JSON.stringify({ email: 'admin@upay.org', name: 'Admin User', org: 'UPAY NGO', role: 'Admin' })
      );
      window.location.href = '/';
    } else {
      setError('Invalid credentials');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC]">
      <div className="bg-white p-8 rounded-[10px] shadow-[0_1px_3px_rgba(0,0,0,0.08),_0_4px_16px_rgba(0,0,0,0.04)] w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold" style={{ color: '#1E3A5F' }}>Pralekhan</h1>
          <p className="text-gray-500 mt-2">UPAY NGO Donor Management</p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-md text-sm text-center">
            {error}
          </div>
        )}

        <div className="mb-6 p-4 bg-blue-50 text-blue-800 rounded-md text-sm border border-blue-100">
          <strong>Demo Credentials:</strong><br />
          Email: admin@upay.org<br />
          Password: upay2026
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-[6px] focus:outline-none focus:ring-2 focus:ring-[#1E3A5F]"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              type="password"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-[6px] focus:outline-none focus:ring-2 focus:ring-[#1E3A5F]"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 rounded-[6px] text-white font-medium transition-colors"
            style={{ backgroundColor: '#1E3A5F' }}
            onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#F59E0B'}
            onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#1E3A5F'}
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}
