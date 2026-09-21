'use client';
import { useState } from 'react';
import Link from 'next/link';

export default function OnboardingWizard() {
    const [step, setStep] = useState(1);

    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
            <div className="max-w-2xl w-full bg-white p-8 rounded-xl shadow-lg border border-slate-200">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-primary tracking-tight">Welcome to Pralekhan</h1>
                    <p className="text-slate-500 mt-2">Let's set up your NGO in under 10 minutes.</p>
                </div>
                
                <div className="flex mb-8 relative">
                    <div className="absolute top-1/2 left-0 w-full h-1 bg-slate-100 -z-10 -translate-y-1/2"></div>
                    {[1, 2, 3, 4].map(s => (
                        <div key={s} className="flex-1 flex justify-center">
                            <div className={\w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg \\}>
                                {s}
                            </div>
                        </div>
                    ))}
                </div>

                <div className="min-h-[200px]">
                    {step === 1 && (
                        <div className="space-y-4 text-center">
                            <h3 className="text-2xl font-semibold mb-6">Organisation Profile</h3>
                            <input type="text" placeholder="NGO Name (e.g. UPAY)" className="w-full max-w-sm mx-auto block p-3 border rounded" />
                            <input type="text" placeholder="80G Registration Number" className="w-full max-w-sm mx-auto block p-3 border rounded" />
                        </div>
                    )}
                    {step === 2 && (
                        <div className="space-y-4 text-center">
                            <h3 className="text-2xl font-semibold mb-6">Connect Razorpay</h3>
                            <p className="text-slate-500 mb-4">Paste your webhook secret to receive donations instantly.</p>
                            <input type="password" placeholder="Webhook Secret" className="w-full max-w-sm mx-auto block p-3 border rounded" />
                            <p className="text-xs text-slate-400 mt-2">For this demo, we use a mock adapter. Any value works.</p>
                        </div>
                    )}
                    {step === 3 && (
                        <div className="space-y-4 text-center">
                            <h3 className="text-2xl font-semibold mb-6">Message Templates</h3>
                            <p className="text-slate-500 mb-4">Set your default WhatsApp thank-you message.</p>
                            <textarea className="w-full h-32 p-3 border rounded" defaultValue="Namaste {{donor.name}}! Thank you for your donation of ₹{{donation.amount}}. This funds {{impact.value}} {{impact.unit}}. Download your 80G receipt here: {{receipt.link}}" />
                        </div>
                    )}
                    {step === 4 && (
                        <div className="space-y-4 text-center">
                            <h3 className="text-2xl font-semibold mb-6">Ready to go live</h3>
                            <p className="text-slate-500">Your setup is complete. You can now import your messy CSV spreadsheets.</p>
                        </div>
                    )}
                </div>

                <div className="mt-10 flex justify-between">
                    <button 
                        disabled={step === 1}
                        onClick={() => setStep(s => s - 1)}
                        className="px-6 py-2 border border-slate-300 rounded font-medium text-slate-600 disabled:opacity-0"
                    >
                        Back
                    </button>
                    {step < 4 ? (
                        <button 
                            onClick={() => setStep(s => Math.min(4, s + 1))}
                            className="px-6 py-2 bg-primary text-primary-foreground font-medium rounded hover:opacity-90"
                        >
                            Next Step
                        </button>
                    ) : (
                        <Link href="/donors/import">
                            <button className="px-6 py-2 bg-accent text-accent-foreground font-bold rounded hover:opacity-90">
                                Start Import Wizard
                            </button>
                        </Link>
                    )}
                </div>
            </div>
        </div>
    );
}
