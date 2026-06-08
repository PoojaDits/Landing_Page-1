import React from 'react'
import { NavLink } from 'react-router-dom'
import type { ReactNode } from 'react'

interface DashboardLink {
  label: string
  path: string
  icon: ReactNode
}

interface DashboardLayoutProps {
  title: string
  links: DashboardLink[]
  children: ReactNode
  handleLogout: () => void
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  title,
  links,
  children,
  handleLogout,
}) => {
  return (
    <div className="min-h-screen flex bg-[#0b1122] text-slate-100">
      <aside className="hidden w-72 shrink-0 flex-col border-r border-white/10 bg-[#111827] md:flex">
        <div className="px-6 py-6 border-b border-white/10">
          <p className="text-xs uppercase tracking-[0.32em] text-slate-400">
            Dashboard
          </p>
          <h2 className="mt-3 text-2xl font-semibold text-white">
            {title}
          </h2>
        </div>

        <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-2">
          {links.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-3xl px-4 py-3 text-sm font-medium transition ${isActive
                  ? 'bg-cyan-500/15 text-cyan-300'
                  : 'text-slate-300 hover:bg-white/5 hover:text-white'
                }`
              }
            >
              <span className="text-lg">{link.icon}</span>
              <span>{link.label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="px-6 py-4 border-t border-white/10">
          <button
            onClick={handleLogout}
            className="w-full rounded-3xl bg-rose-500 px-4 py-3 text-sm font-semibold text-white transition hover:bg-rose-400"
          >
            Logout
          </button>
        </div>
      </aside>

      <div className="flex flex-1 flex-col">
        <header className="flex items-center justify-between gap-4 border-b border-white/10 bg-[#0f172a] px-4 py-4 md:px-6">
          <div>
            <p className="text-xs uppercase tracking-[0.32em] text-slate-400">
              {title}
            </p>
            <h1 className="mt-2 text-2xl font-semibold text-white">
              Welcome back
            </h1>
          </div>
          <button
            onClick={handleLogout}
            className="inline-flex items-center justify-center rounded-3xl bg-rose-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-rose-400"
          >
            Logout
          </button>
        </header>

        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <div className="max-w-7xl mx-auto w-full">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}

export default DashboardLayout
