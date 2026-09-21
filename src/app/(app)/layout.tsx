'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [user, setUser] = useState<{name: string, role: string} | null>(null);

  useEffect(() => {
    const auth = localStorage.getItem('pralekhan_auth');
    if (!auth) {
      router.push('/login');
    } else {
      try {
        setUser(JSON.parse(auth));
      } catch (e) {
        setUser({ name: 'Admin', role: 'Admin' });
      }
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('pralekhan_auth');
    router.push('/login');
  };

  if (!user) return null;

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
    <div className="flex h-screen bg-[#F8FAFC]">
      {/* Sidebar */}
      <div className="w-[240px] flex-shrink-0 flex flex-col" style={{ backgroundColor: '#1E3A5F' }}>
        <div className="p-6">
          <h1 className="text-2xl font-bold" style={{ color: '#F59E0B' }}>Pralekhan</h1>
          <p className="text-xs text-white/70 mt-1">UPAY NGO</p>
        </div>
        
        <nav className="flex-1 px-4 space-y-1 mt-4">
          {navItems.map((item) => {
            const isActive = pathname === item.path || (item.path !== '/' && pathname.startsWith(item.path));
            return (
              <Link
                key={item.name}
                href={item.path}
                className="flex items-center space-x-3 px-3 py-2.5 rounded-lg transition-colors"
                style={{
                  backgroundColor: isActive ? '#F59E0B' : 'transparent',
                  color: isActive ? '#1E3A5F' : 'white',
                  fontWeight: isActive ? 600 : 400
                }}
              >
                <span>{item.icon}</span>
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-white/10">
          <div className="bg-white/10 rounded-lg p-3 text-white">
            <p className="text-sm font-medium">{user.name}</p>
            <p className="text-xs text-white/70 mb-3">{user.role}</p>
            <button
              onClick={handleLogout}
              className="w-full py-1.5 text-sm bg-white/10 hover:bg-white/20 rounded transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <main className="flex-1 overflow-y-auto p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
