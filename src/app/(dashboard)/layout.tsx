import { ReactNode } from 'react';
import Link from 'next/link';

export default function DashboardLayout({ children }: { children: ReactNode }) {
    return (
        <div className="min-h-screen flex flex-col">
            <header className="bg-primary text-primary-foreground p-4 flex justify-between items-center shadow-md">
                <div className="flex items-center gap-4">
                    <h1 className="text-xl font-bold tracking-tight text-accent">Pralekhan</h1>
                    <nav className="hidden md:flex gap-4 ml-8">
                        <Link href="/donors" className="hover:text-accent transition-colors">Donors</Link>
                        <Link href="/donations" className="hover:text-accent transition-colors">Ledger</Link>
                        <Link href="/reconciliation" className="hover:text-accent transition-colors">Recon Inbox</Link>
                        <Link href="/merge-review" className="hover:text-accent transition-colors">Merge Review</Link>
                        <Link href="/reports" className="hover:text-accent transition-colors">Insights</Link>
                        <Link href="/ai-writer" className="hover:text-accent transition-colors">AI Writer</Link>
                    </nav>
                </div>
                <div className="flex items-center gap-4">
                    <span className="text-sm font-semibold bg-white/10 px-3 py-1 rounded-full">UPAY NGO</span>
                    <div className="w-8 h-8 rounded-full bg-accent text-accent-foreground flex items-center justify-center font-bold text-sm">
                        A
                    </div>
                </div>
            </header>
            <main className="flex-1 p-6 bg-slate-50">
                {children}
            </main>
        </div>
    );
}
