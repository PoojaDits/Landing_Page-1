export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Admin Dashboard</h2>
        <p className="text-sm text-gray-500 mt-1">
          Overview of your store performance.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Revenue', value: '$24,580' },
          { label: 'Orders', value: 184 },
          { label: 'Products', value: 76 },
          { label: 'Customers', value: 1240 },
        ].map((c) => (
          <div
            key={c.label}
            className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm"
          >
            <p className="text-xs uppercase tracking-wider text-gray-500">{c.label}</p>
            <p className="mt-2 text-2xl font-bold text-gray-900">{c.value}</p>
          </div>
        ))}
      </div>

      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-900">Recent Orders</h3>
        <p className="text-sm text-gray-500 mt-2">No new orders yet.</p>
      </div>
    </div>
  );
}
