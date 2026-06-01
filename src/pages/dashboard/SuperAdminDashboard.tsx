import React from 'react'
import { Link } from 'react-router-dom'

const cards = [
  { title: 'Total Stores', value: '24' },
  { title: 'Active Users', value: '4.2k' },
  { title: 'Pending Orders', value: '128' },
  { title: 'System Alerts', value: '3' },
]

const quickLinks = [
  { label: 'Manage Stores', href: '/super-admin/stores' },
  { label: 'Review Users', href: '/super-admin/users' },
  { label: 'View Reports', href: '/super-admin/reports' },
  { label: 'Platform settings', href: '/super-admin/settings' },
]

const SuperAdminDashboard: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto p-6 sm:p-8">
      <header className="mb-8 rounded-3xl bg-slate-950/90 p-8 shadow-xl shadow-black/20">
        <p className="text-sm uppercase tracking-[0.3em] text-cyan-300">Super admin console</p>
        <h1 className="mt-3 text-4xl font-semibold text-white">Platform overview</h1>
        <p className="mt-4 max-w-2xl text-sm leading-6 text-slate-300">
          Monitor stores, users, and overall system health from a single dashboard.
        </p>
      </header>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4 mb-8">
        {cards.map((card) => (
          <div
            key={card.title}
            className="rounded-3xl bg-slate-900/90 p-6 text-white shadow-lg shadow-black/20"
          >
            <p className="text-xs uppercase tracking-[0.28em] text-slate-400">{card.title}</p>
            <p className="mt-5 text-4xl font-semibold">{card.value}</p>
          </div>
        ))}
      </section>

      <section className="grid gap-6 lg:grid-cols-[2fr_1fr]">
        <div className="rounded-3xl bg-slate-950/90 p-6 shadow-lg shadow-black/20">
          <h2 className="text-2xl font-semibold text-white">Latest activity</h2>
          <ul className="mt-6 space-y-4 text-slate-300">
            <li className="rounded-3xl bg-slate-900/80 p-4">
              <p className="font-medium text-white">Store approval completed</p>
              <p className="text-sm text-slate-400">A new store has been approved and activated.</p>
            </li>
            <li className="rounded-3xl bg-slate-900/80 p-4">
              <p className="font-medium text-white">User signups increased</p>
              <p className="text-sm text-slate-400">More users joined the platform this week.</p>
            </li>
          </ul>
        </div>

        <div className="rounded-3xl bg-slate-950/90 p-6 shadow-lg shadow-black/20">
          <h2 className="text-2xl font-semibold text-white">Quick actions</h2>
          <div className="mt-5 space-y-3">
            {quickLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className="block rounded-2xl bg-slate-900/80 px-4 py-3 text-sm font-medium text-white transition hover:bg-slate-800"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default SuperAdminDashboard
