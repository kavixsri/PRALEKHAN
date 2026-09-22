'use client';
import { useEffect } from 'react';

// Root / route: hand off to the (app) group which handles auth
export default function RootPage() {
  useEffect(() => {
    // The (app)/layout.tsx handles the auth check and redirects to /login if needed
    // This page itself just shows a brief loader
    const auth = localStorage.getItem('pralekhan_auth');
    if (!auth) {
      window.location.href = '/login/';
    }
    // If authenticated, (app)/page.tsx (dashboard) takes over via the (app) layout
  }, []);

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#F8FAFC' }}>
      <div style={{ textAlign: 'center' }}>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#1E3A5F' }}>Pralekhan</h1>
        <p style={{ color: '#9CA3AF', marginTop: 8, fontSize: '0.875rem' }}>Loading…</p>
      </div>
    </div>
  );
}
