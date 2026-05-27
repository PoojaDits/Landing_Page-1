export default function CustomerDashboard() {
  return (
    <div className="min-h-full p-4 sm:p-6 lg:p-8 space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white">Customer Dashboard</h2>
        <p className="text-sm text-gray-300 mt-1">
          Welcome back! Here's a quick look at your account.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Orders', value: 12 },
          { label: 'Pending', value: 2 },
          { label: 'Wishlist', value: 5 },
          { label: 'Addresses', value: 1 },
        ].map((c) => (
          <div
            key={c.label}
            className="rounded-xl border border-white/10 bg-white/5 backdrop-blur p-4 shadow-sm"
          >
            <p className="text-xs uppercase tracking-wider text-gray-400">{c.label}</p>
            <p className="mt-2 text-2xl font-bold text-white">{c.value}</p>
          </div>
        ))}
      </div>

      <div className="rounded-xl border border-white/10 bg-white/5 backdrop-blur p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-white">Recent Activity</h3>
        <p className="text-sm text-gray-400 mt-2">No recent activity yet.</p>
      </div>
    </div>
  );
}
