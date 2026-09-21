'use client';

import { MERGE_CANDIDATES } from '@/lib/mock-data';

export default function MergeReviewPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold" style={{ color: '#1E3A5F' }}>Merge Review</h1>
          <p className="text-gray-500 mt-1">Review duplicate donor candidates based on AI matching.</p>
        </div>
      </div>

      <div className="space-y-6">
        {MERGE_CANDIDATES.map((candidate) => (
          <div key={candidate.id} className="bg-white rounded-[10px] shadow-[0_1px_3px_rgba(0,0,0,0.08),_0_4px_16px_rgba(0,0,0,0.04)] p-6">
            <div className="flex justify-between items-center mb-4">
              <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-bold border border-yellow-200">
                Match Score: {(candidate.score * 100).toFixed(0)}%
              </span>
              <div className="space-x-3">
                <button className="px-4 py-2 border border-gray-300 rounded-[6px] text-gray-700 font-medium hover:bg-gray-50">Ignore</button>
                <button className="px-4 py-2 rounded-[6px] text-white font-medium" style={{ backgroundColor: '#1E3A5F' }}>Merge Donors</button>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-6 relative">
              <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                <h3 className="text-sm font-semibold text-gray-500 uppercase mb-3">Record A (Existing)</h3>
                <p className="font-bold text-lg mb-1">{candidate.donorA.name}</p>
                <p className="text-gray-600 text-sm">📱 {candidate.donorA.phone || 'N/A'}</p>
                <p className="text-gray-600 text-sm">✉️ {candidate.donorA.email || 'N/A'}</p>
              </div>
              <div className="border border-blue-200 rounded-lg p-4 bg-blue-50/30">
                <h3 className="text-sm font-semibold text-gray-500 uppercase mb-3">Record B (Import)</h3>
                <p className="font-bold text-lg mb-1">{candidate.donorB.name}</p>
                <p className="text-gray-600 text-sm">📱 {candidate.donorB.phone || 'N/A'}</p>
                <p className="text-gray-600 text-sm">✉️ {candidate.donorB.email || 'N/A'}</p>
              </div>
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-full p-2 shadow-sm border border-gray-200">
                <span className="text-xl">🔗</span>
              </div>
            </div>
            
            <div className="mt-4 pt-4 border-t border-gray-100">
              <p className="text-sm text-gray-500"><strong>Match Reasons:</strong> {candidate.reasons.join(', ')}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
