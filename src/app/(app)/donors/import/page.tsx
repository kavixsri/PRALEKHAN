'use client';

export default function ImportWizardPage() {
  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold" style={{ color: '#1E3A5F' }}>Import Donors</h1>
        <p className="text-gray-500 mt-2">Upload a CSV file to bulk import donor records.</p>
      </div>

      <div className="bg-white p-12 rounded-[10px] shadow-[0_1px_3px_rgba(0,0,0,0.08),_0_4px_16px_rgba(0,0,0,0.04)] border-2 border-dashed border-gray-300 text-center">
        <div className="w-16 h-16 mx-auto bg-blue-50 rounded-full flex items-center justify-center mb-4">
          <span className="text-2xl">📄</span>
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">Select a CSV file to upload</h3>
        <p className="text-sm text-gray-500 mb-6">File must contain headers: name, email, phone, city</p>
        <button className="px-6 py-2 rounded-[6px] text-white font-medium transition-colors" style={{ backgroundColor: '#1E3A5F' }}>
          Browse Files
        </button>
      </div>
      
      <div className="bg-blue-50 rounded-lg p-4 flex gap-4 text-sm text-blue-800">
        <span className="text-lg">💡</span>
        <div>
          <p className="font-bold mb-1">Import Guidelines</p>
          <ul className="list-disc pl-4 space-y-1">
            <li>Maximum 5000 rows per import.</li>
            <li>Duplicates will be flagged for review in the Merge Review tab.</li>
            <li>Ensure dates are in YYYY-MM-DD format if including last donation date.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
