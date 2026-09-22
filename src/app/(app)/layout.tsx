'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [user, setUser] = useState<{ name: string; role: string } | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const raw = localStorage.getItem('pralekhan_auth');
    if (!raw) {
      router.replace('/login');
      return;
    }
    try {
      setUser(JSON.parse(raw));
    } catch {
      setUser({ name: 'Admin User', role: 'Admin' });
    }
    setReady(true);
  }, [router]);

  if (!ready) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#F8FAFC' }}>
        <p style={{ color: '#9CA3AF', fontSize: '0.875rem' }}>Loading Pralekhan…</p>
      </div>
    );
  }

  const navItems = [
    { name: 'Dashboard', path: '/', icon: '🏠' },
    { name: 'Donors', path: '/donors', icon: '👥' },
    { name: 'Donations', path: '/donations', icon: '💰' },
    { name: 'Reconciliation', path: '/reconciliation', icon: '🔄' },
    { name: 'Merge Review', path: '/merge-review', icon: '🔀' },
    { name: 'Reports', path: '/reports', icon: '📊' },
    { name: 'AI Writer', path: '/ai-writer', icon: '✍️' },
    { name: 'Settings', path: '/settings', icon: '⚙️' },
  ];

  const handleLogout = () => {
    localStorage.removeItem('pralekhan_auth');
    router.replace('/login');
  };

  return (
    <div style={{ display: 'flex', height: '100vh', overflow: 'hidden', backgroundColor: '#F8FAFC' }}>
      {/* Sidebar */}
      <div style={{ width: 240, flexShrink: 0, display: 'flex', flexDirection: 'column', backgroundColor: '#1E3A5F' }}>
        <div style={{ padding: '20px 24px', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
          <div style={{ fontSize: '1.25rem', fontWeight: 700, color: '#F59E0B', letterSpacing: '-0.02em' }}>Pralekhan</div>
          <div style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.45)', marginTop: 2 }}>UPAY NGO · Donor System</div>
        </div>

        <nav style={{ flex: 1, padding: '12px 12px', overflowY: 'auto' }}>
          {navItems.map((item) => {
            const isActive = pathname === item.path || (item.path !== '/' && pathname.startsWith(item.path));
            return (
              <Link
                key={item.name}
                href={item.path}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                  padding: '9px 12px',
                  borderRadius: 8,
                  marginBottom: 2,
                  textDecoration: 'none',
                  fontSize: '0.875rem',
                  fontWeight: isActive ? 600 : 400,
                  backgroundColor: isActive ? '#F59E0B' : 'transparent',
                  color: isActive ? '#1E3A5F' : 'rgba(255,255,255,0.8)',
                  transition: 'background 0.15s',
                }}
              >
                <span style={{ fontSize: '1rem' }}>{item.icon}</span>
                {item.name}
              </Link>
            );
          })}
        </nav>

        <div style={{ padding: 12, borderTop: '1px solid rgba(255,255,255,0.1)' }}>
          <div style={{ backgroundColor: 'rgba(255,255,255,0.08)', borderRadius: 8, padding: 12 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
              <div style={{ width: 32, height: 32, borderRadius: '50%', backgroundColor: '#F59E0B', color: '#1E3A5F', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '0.8rem', flexShrink: 0 }}>
                {user?.name?.charAt(0) ?? 'A'}
              </div>
              <div>
                <div style={{ fontSize: '0.8rem', fontWeight: 600, color: 'white' }}>{user?.name}</div>
                <div style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.5)' }}>{user?.role}</div>
              </div>
            </div>
            <button
              onClick={handleLogout}
              style={{ width: '100%', padding: '6px 0', fontSize: '0.75rem', color: 'rgba(255,255,255,0.7)', backgroundColor: 'rgba(255,255,255,0.1)', border: 'none', borderRadius: 6, cursor: 'pointer' }}
            >
              Sign Out
            </button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        <main style={{ flex: 1, overflowY: 'auto', padding: 32 }}>
          {children}
        </main>
      </div>
    </div>
  );
}
