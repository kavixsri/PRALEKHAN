'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    if (email === 'admin@upay.org' && password === 'upay2026') {
      localStorage.setItem('pralekhan_auth', JSON.stringify({
        email: 'admin@upay.org',
        name: 'Admin User',
        org: 'UPAY NGO',
        role: 'Admin',
      }));
      router.replace('/');
    } else {
      setError('Invalid email or password. Use admin@upay.org / upay2026');
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#F8FAFC', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ backgroundColor: 'white', borderRadius: 12, boxShadow: '0 1px 3px rgba(0,0,0,0.08), 0 8px 32px rgba(0,0,0,0.06)', padding: 40, width: '100%', maxWidth: 420 }}>
        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 52, height: 52, borderRadius: 12, backgroundColor: '#1E3A5F', marginBottom: 14 }}>
            <span style={{ fontSize: '1.4rem' }}>📋</span>
          </div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#1E3A5F', margin: 0 }}>Pralekhan</h1>
          <p style={{ color: '#9CA3AF', fontSize: '0.875rem', marginTop: 4, margin: '4px 0 0' }}>UPAY NGO Donor Management System</p>
        </div>

        {/* Demo hint */}
        <div style={{ backgroundColor: '#EFF6FF', border: '1px solid #BFDBFE', borderRadius: 8, padding: '10px 14px', marginBottom: 20, fontSize: '0.8rem', color: '#1D4ED8' }}>
          <strong>Demo access:</strong> admin@upay.org &nbsp;/&nbsp; upay2026
        </div>

        {error && (
          <div style={{ backgroundColor: '#FEF2F2', border: '1px solid #FECACA', borderRadius: 8, padding: '10px 14px', marginBottom: 16, fontSize: '0.8rem', color: '#DC2626' }}>
            {error}
          </div>
        )}

        <form onSubmit={handleLogin}>
          <div style={{ marginBottom: 16 }}>
            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#374151', marginBottom: 6 }}>Email address</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@upay.org"
              style={{ width: '100%', padding: '10px 12px', border: '1px solid #D1D5DB', borderRadius: 6, fontSize: '0.875rem', outline: 'none', boxSizing: 'border-box', color: '#111827' }}
            />
          </div>
          <div style={{ marginBottom: 24 }}>
            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#374151', marginBottom: 6 }}>Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="upay2026"
              style={{ width: '100%', padding: '10px 12px', border: '1px solid #D1D5DB', borderRadius: 6, fontSize: '0.875rem', outline: 'none', boxSizing: 'border-box', color: '#111827' }}
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            style={{ width: '100%', padding: '11px 0', backgroundColor: loading ? '#9CA3AF' : '#1E3A5F', color: 'white', border: 'none', borderRadius: 6, fontSize: '0.9rem', fontWeight: 600, cursor: loading ? 'default' : 'pointer' }}
          >
            {loading ? 'Signing in…' : 'Sign In'}
          </button>
        </form>

        <p style={{ textAlign: 'center', fontSize: '0.75rem', color: '#9CA3AF', marginTop: 20 }}>
          Samadhan 2026-27 · Track 2 Demo
        </p>
      </div>
    </div>
  );
}
