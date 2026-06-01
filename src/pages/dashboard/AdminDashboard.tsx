import React from 'react'
import { Link } from 'react-router-dom'

const stats = [
  { label: 'Total Products', value: '94' },
  { label: 'Pending Orders', value: '27' },
  { label: 'Revenue', value: '$8.4k' },
  { label: 'Messages', value: '12' },
]

const actions = [
  { label: 'Manage Products', href: '/admin/products' },
  { label: 'View Orders', href: '/admin/orders' },
  { label: 'Store Settings', href: '/admin/settings' },
  { label: 'Customer Messages', href: '/admin/messages' },
]

const AdminDashboard: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto p-6 sm:p-8">
      <header className="mb-8 rounded-3xl bg-slate-950/90 p-8 shadow-xl shadow-black/20">
        <p className="text-sm uppercase tracking-[0.3em] text-cyan-300">Store admin</p>
        <h1 className="mt-3 text-4xl font-semibold text-white">Admin control center</h1>
        <p className="mt-4 max-w-2xl text-sm leading-6 text-slate-300">
          Manage inventory, review orders, and keep the store running smoothly.
        </p>
      </header>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4 mb-8">
        {stats.map((item) => (
          <div
            key={item.label}
            className="rounded-3xl bg-slate-900/90 p-6 text-white shadow-lg shadow-black/20"
          >
            <p className="text-xs uppercase tracking-[0.28em] text-slate-400">{item.label}</p>
            <p className="mt-4 text-3xl font-semibold">{item.value}</p>
          </div>
        ))}
      </section>

      <section className="grid gap-6 lg:grid-cols-[2fr_1fr]">
        <div className="rounded-3xl bg-slate-950/90 p-6 shadow-lg shadow-black/20">
          <h2 className="text-2xl font-semibold text-white">Recent activity</h2>
          <ul className="mt-6 space-y-4 text-slate-300">
            <li className="rounded-3xl bg-slate-900/80 p-4">
              <p className="font-medium text-white">New product live</p>
              <p className="text-sm text-slate-400">Product #276 was added to the catalog.</p>
            </li>
            <li className="rounded-3xl bg-slate-900/80 p-4">
              <p className="font-medium text-white">Order shipped</p>
              <p className="text-sm text-slate-400">Order #1987 is on its way.</p>
            </li>
          </ul>
        </div>

        <div className="rounded-3xl bg-slate-950/90 p-6 shadow-lg shadow-black/20">
          <h2 className="text-2xl font-semibold text-white">Quick actions</h2>
          <div className="mt-5 space-y-3">
            {actions.map((action) => (
              <Link
                key={action.href}
                to={action.href}
                className="block rounded-2xl bg-slate-900/80 px-4 py-3 text-sm font-medium text-white transition hover:bg-slate-800"
              >
                {action.label}
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default AdminDashboard
