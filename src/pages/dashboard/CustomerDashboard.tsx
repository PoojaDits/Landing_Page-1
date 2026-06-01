import React from 'react'
import { Link } from 'react-router-dom'

const panels = [
  { label: 'Total Orders', href: '/customer/orders', value: '12' },
  { label: 'Saved Items', href: '/customer/wishlist', value: '5' },
  { label: 'Addresses', href: '/customer/addresses', value: '3' },
  { label: 'Notifications', href: '/customer/notifications', value: '7' },
]

const CustomerDashboard: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto p-6 sm:p-8">
      <header className="mb-8 rounded-3xl border border-white/10 bg-slate-950/80 p-8 shadow-xl shadow-black/20">
        <p className="text-sm uppercase tracking-[0.3em] text-cyan-300">Customer dashboard</p>
        <h1 className="mt-3 text-4xl font-semibold text-white">Hello, welcome back.</h1>
        <p className="mt-4 max-w-2xl text-sm leading-6 text-slate-300">
          View your account summary, recent orders, and quick actions from here.
        </p>
      </header>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4 mb-8">
        {panels.map((panel) => (
          <Link
            key={panel.label}
            to={panel.href}
            className="rounded-3xl bg-slate-900/90 p-6 text-white shadow-lg shadow-black/20 transition hover:bg-slate-800"
          >
            <p className="text-xs uppercase tracking-[0.28em] text-slate-400">{panel.label}</p>
            <p className="mt-5 text-3xl font-semibold">{panel.value}</p>
          </Link>
        ))}
      </section>

      <section className="grid gap-6 lg:grid-cols-[2fr_1fr]">
        <div className="rounded-3xl bg-slate-950/90 p-6 shadow-lg shadow-black/20">
          <h2 className="text-2xl font-semibold text-white">Recent activity</h2>
          <ul className="mt-6 space-y-4 text-slate-300">
            <li className="rounded-3xl border border-white/10 bg-slate-900/80 p-4">
              <p className="font-medium text-white">Order #9201 shipped</p>
              <p className="text-sm text-slate-400">Your item will arrive within 3 business days.</p>
            </li>
            <li className="rounded-3xl border border-white/10 bg-slate-900/80 p-4">
              <p className="font-medium text-white">New address added</p>
              <p className="text-sm text-slate-400">Your new shipping address was saved successfully.</p>
            </li>
          </ul>
        </div>

        <div className="rounded-3xl bg-slate-950/90 p-6 shadow-lg shadow-black/20">
          <h2 className="text-2xl font-semibold text-white">Quick actions</h2>
          <div className="mt-5 space-y-3">
            <Link
              to="/customer/orders"
              className="block rounded-2xl border border-white/10 bg-slate-900/80 px-4 py-3 text-sm font-medium text-white transition hover:bg-slate-800"
            >
              View orders
            </Link>
            <Link
              to="/customer/wishlist"
              className="block rounded-2xl border border-white/10 bg-slate-900/80 px-4 py-3 text-sm font-medium text-white transition hover:bg-slate-800"
            >
              Open wishlist
            </Link>
            <Link
              to="/customer/settings"
              className="block rounded-2xl border border-white/10 bg-slate-900/80 px-4 py-3 text-sm font-medium text-white transition hover:bg-slate-800"
            >
              Account settings
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default CustomerDashboard
