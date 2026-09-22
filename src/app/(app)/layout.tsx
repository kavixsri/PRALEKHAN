'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [user, setUser] = useState<{ name: string; role: string; email: string } | null>(null);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    const auth = localStorage.getItem('pralekhan_auth');
    if (!auth) {
      window.location.href = '/login/';
    } else {
      try {
        setUser(JSON.parse(auth));
      } catch {
        setUser({ name: 'Admin User', role: 'Admin', email: 'admin@upay.org' });
      }
      setChecked(true);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('pralekhan_auth');
    window.location.href = '/login/';
  };

  if (!checked) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC]">
        <div className="text-gray-400 text-sm">Loading…</div>
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

  return (
    <div className="flex h-screen overflow-hidden" style={{ backgroundColor: '#F8FAFC' }}>
      {/* Sidebar */}
      <div className="w-60 flex-shrink-0 flex flex-col" style={{ backgroundColor: '#1E3A5F' }}>
        <div className="px-6 py-5 border-b border-white/10">
          <h1 className="text-xl font-bold tracking-tight" style={{ color: '#F59E0B' }}>Pralekhan</h1>
          <p className="text-xs mt-0.5" style={{ color: 'rgba(255,255,255,0.5)' }}>UPAY NGO · Donor System</p>
        </div>

        <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = pathname === item.path || (item.path !== '/' && pathname.startsWith(item.path));
            return (
              <Link
                key={item.name}
                href={item.path}
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all"
                style={{
                  backgroundColor: isActive ? '#F59E0B' : 'transparent',
                  color: isActive ? '#1E3A5F' : 'rgba(255,255,255,0.8)',
                  fontWeight: isActive ? 600 : 400,
                }}
              >
                <span className="text-base">{item.icon}</span>
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>

        <div className="px-3 py-4 border-t border-white/10">
          <div className="rounded-lg p-3" style={{ backgroundColor: 'rgba(255,255,255,0.08)' }}>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold" style={{ backgroundColor: '#F59E0B', color: '#1E3A5F' }}>
                {user?.name?.charAt(0) ?? 'A'}
              </div>
              <div>
                <p className="text-sm font-medium text-white">{user?.name}</p>
                <p className="text-xs" style={{ color: 'rgba(255,255,255,0.5)' }}>{user?.role}</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="w-full py-1.5 text-xs rounded-md transition-colors"
              style={{ backgroundColor: 'rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.8)' }}
            >
              Sign Out
            </button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <main className="flex-1 overflow-y-auto p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
