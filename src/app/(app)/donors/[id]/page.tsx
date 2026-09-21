import { DONORS, DONATIONS } from '@/lib/mock-data';

export function generateStaticParams() {
  return DONORS.map((donor) => ({
    id: donor.id,
  }));
}

export default async function DonorProfilePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const donor = DONORS.find(d => d.id === id);
  const donorDonations = DONATIONS.filter(d => d.donorId === id);

  if (!donor) return <div className="p-8">Donor not found</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full flex items-center justify-center text-white text-2xl font-bold" style={{ backgroundColor: '#1E3A5F' }}>
            {donor.name.charAt(0)}
          </div>
          <div>
            <h1 className="text-3xl font-bold" style={{ color: '#1E3A5F' }}>{donor.name}</h1>
            <div className="flex items-center gap-2 mt-1">
              <span className={`px-2.5 py-0.5 text-xs rounded-full font-medium ${
                donor.type === 'csr' ? 'bg-purple-100 text-purple-800' : 'bg-green-100 text-green-800'
              }`}>
                {donor.type.toUpperCase()}
              </span>
              <span className="text-gray-500 text-sm">{donor.city}</span>
            </div>
          </div>
        </div>
        <button className="px-4 py-2 rounded-[6px] text-white font-medium transition-colors" style={{ backgroundColor: '#F59E0B' }}>
          Edit Profile
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-[10px] shadow-[0_1px_3px_rgba(0,0,0,0.08),_0_4px_16px_rgba(0,0,0,0.04)]">
          <h3 className="text-gray-500 text-sm font-medium mb-4">Contact Info</h3>
          <div className="space-y-3">
            <div>
              <p className="text-xs text-gray-400">Phone</p>
              <p className="font-medium">{donor.phone}</p>
            </div>
            <div>
              <p className="text-xs text-gray-400">Email</p>
              <p className="font-medium">{donor.email}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-[10px] shadow-[0_1px_3px_rgba(0,0,0,0.08),_0_4px_16px_rgba(0,0,0,0.04)]">
          <h3 className="text-gray-500 text-sm font-medium mb-4">Giving Summary</h3>
          <div className="space-y-3">
            <div>
              <p className="text-xs text-gray-400">Lifetime Value</p>
              <p className="font-bold text-lg" style={{ color: '#1E3A5F' }}>₹{donor.totalDonated.toLocaleString()}</p>
            </div>
            <div>
              <p className="text-xs text-gray-400">Total Donations</p>
              <p className="font-medium">{donor.donations}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-[10px] shadow-[0_1px_3px_rgba(0,0,0,0.08),_0_4px_16px_rgba(0,0,0,0.04)]">
          <h3 className="text-gray-500 text-sm font-medium mb-4">Engagement</h3>
          <div className="space-y-3">
            <div>
              <p className="text-xs text-gray-400">Segment</p>
              <span className="inline-block mt-1 px-2.5 py-1 text-xs rounded-full font-medium bg-blue-100 text-blue-800 capitalize">
                {donor.segment}
              </span>
            </div>
            <div>
              <p className="text-xs text-gray-400">Last Donation</p>
              <p className="font-medium">{donor.lastDonation}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-[10px] shadow-[0_1px_3px_rgba(0,0,0,0.08),_0_4px_16px_rgba(0,0,0,0.04)] overflow-hidden mt-8">
        <div className="p-4 border-b border-gray-100">
          <h2 className="text-xl font-semibold" style={{ color: '#1E3A5F' }}>Donation History</h2>
        </div>
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th className="px-6 py-4 font-medium">Date</th>
              <th className="px-6 py-4 font-medium">Campaign</th>
              <th className="px-6 py-4 font-medium">Channel</th>
              <th className="px-6 py-4 font-medium text-right">Amount</th>
            </tr>
          </thead>
          <tbody>
            {donorDonations.map((tx) => (
              <tr key={tx.id} className="bg-white border-b last:border-0 hover:bg-[#F0F4F8]">
                <td className="px-6 py-4">{tx.date}</td>
                <td className="px-6 py-4">{tx.campaign}</td>
                <td className="px-6 py-4">{tx.channel}</td>
                <td className="px-6 py-4 text-right font-bold text-gray-900">₹{tx.amount.toLocaleString()}</td>
              </tr>
            ))}
            {donorDonations.length === 0 && (
              <tr>
                <td colSpan={4} className="px-6 py-8 text-center text-gray-500">No donations recorded yet.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
