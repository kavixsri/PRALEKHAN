'use client';
import { useState } from 'react';

export default function AIWriterPage() {
    const [prompt, setPrompt] = useState('');
    const [draft, setDraft] = useState('');
    const [loading, setLoading] = useState(false);

    const handleGenerate = () => {
        setLoading(true);
        setTimeout(() => {
            setDraft("Dear Supporter,\\n\\nBased on your recent contributions, we have been able to fund 50 child-months of education [Src: tx1, tx3]. Thank you for your generous Rs 25,000 [Src: tx2] contribution to the Open Classroom campaign.\\n\\nHowever, we still need 30000 [UNVERIFIED] more to reach our goal.");
            setLoading(false);
        }, 1500);
    };

    return (
        <div className="flex gap-6 h-[calc(100vh-8rem)]">
            <div className="flex-1 flex flex-col bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
                <div className="p-4 border-b border-slate-200 bg-slate-50">
                    <h2 className="font-semibold text-primary">Grounded AI Writer</h2>
                </div>
                <div className="p-4 border-b border-slate-200">
                    <textarea 
                        className="w-full h-24 p-3 border border-slate-300 rounded focus:outline-none focus:ring-2 focus:ring-accent"
                        placeholder="E.g. Write a proposal for a Rs 1 Lakh CSR grant based on recent education campaigns..."
                        value={prompt}
                        onChange={e => setPrompt(e.target.value)}
                    />
                    <div className="mt-4 flex justify-end">
                        <button 
                            onClick={handleGenerate}
                            className="bg-primary text-primary-foreground px-6 py-2 rounded shadow-sm hover:opacity-90 flex items-center gap-2"
                        >
                            {loading ? 'Generating...' : 'Generate Draft'}
                        </button>
                    </div>
                </div>
                <div className="flex-1 p-6 overflow-y-auto font-serif text-lg leading-relaxed whitespace-pre-wrap">
                    {draft ? (
                        <div dangerouslySetInnerHTML={{ __html: draft.replace(/\[Src: .*?\]/g, '<span class="bg-blue-100 text-blue-800 text-xs px-1 rounded cursor-pointer hover:bg-blue-200">$&</span>').replace(/\[UNVERIFIED\]/g, '<span class="bg-red-100 text-red-800 text-xs px-1 rounded font-bold" title="This number could not be found in source records">UNVERIFIED CLAIM</span>') }} />
                    ) : (
                        <p className="text-slate-400 text-center mt-12">Your verified draft will appear here.</p>
                    )}
                </div>
            </div>

            <div className="w-80 bg-slate-50 rounded-lg shadow-sm border border-slate-200 p-4 flex flex-col">
                <h3 className="font-semibold text-slate-700 mb-4">Sources & Verification</h3>
                {draft ? (
                    <div className="space-y-4">
                        <div className="p-3 bg-red-50 border border-red-200 rounded text-sm text-red-800">
                            <strong>Warning:</strong> 1 unverified numeric claim detected. Please review before sending.
                        </div>
                        <div>
                            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Cited Records</h4>
                            <ul className="space-y-2 text-sm">
                                <li className="p-2 bg-white border border-slate-200 rounded shadow-sm cursor-pointer hover:border-accent">
                                    <div className="font-medium text-primary">tx2 (Donation)</div>
                                    <div className="text-slate-500">TechCorp CSR - Rs 25,000</div>
                                </li>
                                <li className="p-2 bg-white border border-slate-200 rounded shadow-sm cursor-pointer hover:border-accent">
                                    <div className="font-medium text-primary">tx1, tx3 (Donation)</div>
                                    <div className="text-slate-500">Combined impact - 50 units</div>
                                </li>
                            </ul>
                        </div>
                    </div>
                ) : (
                    <p className="text-sm text-slate-500">Sources will appear here once a draft is generated.</p>
                )}
            </div>
        </div>
    );
}
