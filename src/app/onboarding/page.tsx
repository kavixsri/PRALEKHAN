'use client';
import { useState } from 'react';
import Link from 'next/link';

const steps = ['Org Profile', 'Razorpay', 'Templates', 'Go Live!'];

export default function OnboardingWizard() {
  const [step, setStep] = useState(1);

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full bg-white p-8 rounded-xl shadow-lg border border-slate-200">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-primary tracking-tight">Welcome to Pralekhan</h1>
          <p className="text-slate-500 mt-2">Set up your NGO in under 10 minutes.</p>
        </div>

        {/* Step indicators */}
        <div className="flex items-center mb-10">
          {steps.map((label, i) => {
            const s = i + 1;
            const active = step === s;
            const done = step > s;
            return (
              <div key={s} className="flex items-center flex-1">
                <div className="flex flex-col items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg border-2 transition-all
                      ${done ? 'bg-primary border-primary text-white' : active ? 'bg-accent border-accent text-accent-foreground' : 'bg-white border-slate-300 text-slate-400'}`}
                  >
                    {done ? '✓' : s}
                  </div>
                  <span className={`text-xs mt-1 font-medium ${active ? 'text-accent' : done ? 'text-primary' : 'text-slate-400'}`}>
                    {label}
                  </span>
                </div>
                {i < steps.length - 1 && (
                  <div className={`flex-1 h-0.5 mx-2 mb-4 ${done ? 'bg-primary' : 'bg-slate-200'}`} />
                )}
              </div>
            );
          })}
        </div>

        <div className="min-h-[220px]">
          {step === 1 && (
            <div className="space-y-4">
              <h3 className="text-xl font-semibold mb-4 text-slate-700">Organisation Profile</h3>
              <input type="text" placeholder="NGO Name (e.g. UPAY)" defaultValue="UPAY" className="w-full p-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent" />
              <input type="text" placeholder="12A Registration No." defaultValue="12A-UPAY-2019" className="w-full p-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent" />
              <input type="text" placeholder="80G Registration No." defaultValue="80G-UPAY-2019" className="w-full p-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent" />
            </div>
          )}
          {step === 2 && (
            <div className="space-y-4">
              <h3 className="text-xl font-semibold mb-4 text-slate-700">Connect Razorpay</h3>
              <p className="text-slate-500 text-sm mb-4">Paste your webhook secret to receive donations instantly.</p>
              <input type="password" placeholder="Webhook Secret" defaultValue="mock-secret-key" className="w-full p-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent" />
              <p className="text-xs text-slate-400 mt-2 p-3 bg-blue-50 border border-blue-100 rounded-lg">
                ℹ️ This demo uses a <strong>mock adapter</strong>. Any value works — no real Razorpay account needed.
              </p>
            </div>
          )}
          {step === 3 && (
            <div className="space-y-4">
              <h3 className="text-xl font-semibold mb-4 text-slate-700">Message Templates</h3>
              <label className="text-sm font-medium text-slate-600">WhatsApp Thank-You (English)</label>
              <textarea
                className="w-full h-28 p-3 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-accent"
                defaultValue="Namaste {{donor.name}}! Thank you for your donation of ₹{{donation.amount}}. This funds {{impact.value}} {{impact.unit}}. Your 80G receipt: {{receipt.link}}"
              />
              <label className="text-sm font-medium text-slate-600">WhatsApp Thank-You (Hindi)</label>
              <textarea
                className="w-full h-28 p-3 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-accent"
                defaultValue="नमस्ते {{donor.name}}! आपके ₹{{donation.amount}} के दान के लिए धन्यवाद। आपकी 80G रसीद: {{receipt.link}}"
              />
            </div>
          )}
          {step === 4 && (
            <div className="text-center py-6">
              <div className="text-5xl mb-4">🎉</div>
              <h3 className="text-2xl font-bold text-primary mb-2">You&apos;re all set!</h3>
              <p className="text-slate-500 mb-6">UPAY is configured. Start by importing your donor spreadsheet.</p>
            </div>
          )}
        </div>

        <div className="mt-8 flex justify-between">
          <button
            disabled={step === 1}
            onClick={() => setStep((s) => s - 1)}
            className="px-6 py-2.5 border border-slate-300 rounded-lg font-medium text-slate-600 disabled:opacity-0"
          >
            Back
          </button>
          {step < 4 ? (
            <button
              onClick={() => setStep((s) => Math.min(4, s + 1))}
              className="px-6 py-2.5 bg-primary text-white font-semibold rounded-lg hover:opacity-90"
            >
              Next Step →
            </button>
          ) : (
            <Link href="/donors/import">
              <button className="px-6 py-2.5 bg-accent text-accent-foreground font-bold rounded-lg hover:opacity-90">
                Start Import Wizard →
              </button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
