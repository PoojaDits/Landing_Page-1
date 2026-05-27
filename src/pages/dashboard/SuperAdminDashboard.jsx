export default function SuperAdminDashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Super Admin Dashboard</h2>
        <p className="text-sm text-gray-500 mt-1">
          Platform-wide overview across all stores.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Stores', value: 32 },
          { label: 'Admins', value: 58 },
          { label: 'Users', value: '12.4k' },
          { label: 'GMV', value: '$1.2M' },
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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900">System Health</h3>
          <p className="text-sm text-gray-500 mt-2">All services operational.</p>
        </div>
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900">Recent Audit Logs</h3>
          <p className="text-sm text-gray-500 mt-2">No recent activity.</p>
        </div>
      </div>
    </div>
  );
}
