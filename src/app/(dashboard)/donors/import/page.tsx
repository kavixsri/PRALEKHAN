'use client';
import { useState } from 'react';

export default function ImportWizard() {
    const [step, setStep] = useState(1);

    return (
        <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow border border-slate-200">
            <h2 className="text-2xl font-bold text-primary mb-6">Import Donors</h2>
            
            <div className="flex justify-between mb-8">
                {[1, 2, 3, 4, 5].map(s => (
                    <div key={s} className={\w-8 h-8 rounded-full flex items-center justify-center \\}>
                        {s}
                    </div>
                ))}
            </div>

            {step === 1 && (
                <div>
                    <h3 className="text-xl mb-4">Step 1: Upload CSV</h3>
                    <input type="file" className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-primary-foreground hover:file:opacity-90" />
                </div>
            )}
            
            {step === 2 && (
                <div>
                    <h3 className="text-xl mb-4">Step 2: Map Columns</h3>
                    <p className="text-slate-500">Map your CSV columns to Pralekhan fields.</p>
                </div>
            )}

            {step === 3 && (
                <div>
                    <h3 className="text-xl mb-4">Step 3: Normalisation Preview</h3>
                    <p className="text-slate-500">Review how names and phones will be cleaned.</p>
                </div>
            )}

            {step === 4 && (
                <div>
                    <h3 className="text-xl mb-4">Step 4: Deduplication Preview</h3>
                    <p className="text-slate-500">Review potential merges based on existing records.</p>
                </div>
            )}

            {step === 5 && (
                <div>
                    <h3 className="text-xl mb-4">Step 5: Confirm</h3>
                    <p className="text-slate-500">Ready to import!</p>
                </div>
            )}

            <div className="mt-8 flex justify-between">
                <button 
                    disabled={step === 1}
                    onClick={() => setStep(s => s - 1)}
                    className="px-4 py-2 border border-slate-300 rounded disabled:opacity-50"
                >
                    Back
                </button>
                <button 
                    onClick={() => setStep(s => Math.min(5, s + 1))}
                    className="px-4 py-2 bg-primary text-primary-foreground rounded hover:opacity-90"
                >
                    {step === 5 ? 'Import Now' : 'Next'}
                </button>
            </div>
        </div>
    );
}
