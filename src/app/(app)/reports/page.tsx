'use client';

export default function ReportsPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold" style={{ color: '#1E3A5F' }}>Reports & Analytics</h1>
          <p className="text-gray-500 mt-1">Key metrics and visualizations.</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-[10px] shadow-[0_1px_3px_rgba(0,0,0,0.08),_0_4px_16px_rgba(0,0,0,0.04)] h-64 flex items-center justify-center border border-gray-100">
          <p className="text-gray-400 font-medium text-lg">Retention Chart Placeholder</p>
        </div>
        <div className="bg-white p-6 rounded-[10px] shadow-[0_1px_3px_rgba(0,0,0,0.08),_0_4px_16px_rgba(0,0,0,0.04)] h-64 flex items-center justify-center border border-gray-100">
          <p className="text-gray-400 font-medium text-lg">Campaign Performance Placeholder</p>
        </div>
        <div className="bg-white p-6 rounded-[10px] shadow-[0_1px_3px_rgba(0,0,0,0.08),_0_4px_16px_rgba(0,0,0,0.04)] h-64 flex items-center justify-center border border-gray-100">
          <p className="text-gray-400 font-medium text-lg">Channel Distribution Placeholder</p>
        </div>
        <div className="bg-white p-6 rounded-[10px] shadow-[0_1px_3px_rgba(0,0,0,0.08),_0_4px_16px_rgba(0,0,0,0.04)] h-64 flex items-center justify-center border border-gray-100">
          <p className="text-gray-400 font-medium text-lg">Donor Segment Breakdown</p>
        </div>
      </div>
    </div>
  );
}
