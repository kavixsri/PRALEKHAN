'use client';

export default function AIWriterPage() {
  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold" style={{ color: '#1E3A5F' }}>AI Writer</h1>
          <p className="text-gray-500 mt-1">Generate personalized thank you notes and campaign emails.</p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-[10px] shadow-[0_1px_3px_rgba(0,0,0,0.08),_0_4px_16px_rgba(0,0,0,0.04)]">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Select Donor Segment</label>
            <select className="w-full px-3 py-2 border border-gray-300 rounded-[6px] focus:ring-2 focus:ring-[#1E3A5F] focus:outline-none">
              <option>First-time Donors</option>
              <option>Champions</option>
              <option>Lapsed Donors</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Tone</label>
            <select className="w-full px-3 py-2 border border-gray-300 rounded-[6px] focus:ring-2 focus:ring-[#1E3A5F] focus:outline-none">
              <option>Warm & Grateful</option>
              <option>Professional</option>
              <option>Urgent</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Custom Context</label>
            <textarea className="w-full px-3 py-2 border border-gray-300 rounded-[6px] focus:ring-2 focus:ring-[#1E3A5F] focus:outline-none" rows={3} placeholder="Mention the upcoming winter drive..."></textarea>
          </div>
          <button className="px-6 py-2 text-white font-medium rounded-[6px] transition-colors" style={{ backgroundColor: '#F59E0B' }}>
            ✨ Generate Draft
          </button>
        </div>
      </div>
      
      <div className="bg-gray-50 p-6 rounded-[10px] border border-dashed border-gray-300 min-h-[200px] flex items-center justify-center">
        <p className="text-gray-400">Generated content will appear here...</p>
      </div>
    </div>
  );
}
