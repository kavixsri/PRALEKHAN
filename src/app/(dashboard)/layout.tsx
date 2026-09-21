import type { ReactNode } from 'react';
import Link from 'next/link';

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col" style={{ fontFamily: 'var(--font-geist-sans), system-ui, sans-serif' }}>
      <header style={{ backgroundColor: '#253A5E', color: '#f8fafc' }} className="px-6 py-4 flex justify-between items-center shadow-md">
        <div className="flex items-center gap-6">
          <span className="text-xl font-bold tracking-tight" style={{ color: '#F59E0B' }}>Pralekhan</span>
          <nav className="hidden md:flex gap-5 text-sm font-medium">
            {[
              ['/donors', 'Donors'],
              ['/donations', 'Ledger'],
              ['/reconciliation', 'Recon Inbox'],
              ['/merge-review', 'Merge Review'],
              ['/reports', 'Insights'],
              ['/ai-writer', 'AI Writer'],
            ].map(([href, label]) => (
              <Link
                key={href}
                href={href}
                className="opacity-80 hover:opacity-100 transition-opacity"
                style={{ color: '#e2e8f0' }}
              >
                {label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs font-semibold px-3 py-1 rounded-full" style={{ backgroundColor: 'rgba(255,255,255,0.12)' }}>
            UPAY NGO
          </span>
          <div className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm"
            style={{ backgroundColor: '#F59E0B', color: '#1c1917' }}>
            A
          </div>
        </div>
      </header>
      <main className="flex-1 p-6" style={{ backgroundColor: '#f8fafc' }}>
        {children}
      </main>
    </div>
  );
}
