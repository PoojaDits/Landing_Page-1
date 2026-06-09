import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { startImpersonation, DASHBOARD_PATHS, ROLES, getStoredUser } from '@/lib/role'
import type { User } from '@/types'

const users: User[] = [
  {
    id: '2',
    firstName: 'Alice',
    lastName: 'Johnson',
    email: 'alice@example.com',
    role: ROLES.ADMIN,
  },
  {
    id: '3',
    firstName: 'Bob',
    lastName: 'White',
    email: 'bob@example.com',
    role: ROLES.CUSTOMER,
  },
  {
    id: '4',
    firstName: 'Carol',
    lastName: 'Doe',
    email: 'carol@example.com',
    role: ROLES.CUSTOMER,
  },
  {
    id: '5',
    firstName: 'Robert',
    lastName: 'Tennison',
    email: 'robert@example.com',
    role: ROLES.ADMIN,
  },
]

const Users: React.FC = () => {
  const navigate = useNavigate()
  const [message, setMessage] = useState<string | null>(null)
  const currentUser = getStoredUser()

  const handleImpersonate = (user: User): void => {
    try {
      startImpersonation(user)
      const destination = DASHBOARD_PATHS[user.role] || '/'
      setMessage(`Now impersonating ${user.firstName} ${user.lastName}`)
      navigate(destination, { replace: true })
    } catch (error) {
      setMessage('Unable to impersonate this user.')
    }
  }

  return (
    <div className="max-w-6xl mx-auto p-6 sm:p-8">
      <header className="mb-6 rounded-3xl bg-slate-950/90 p-8 shadow-xl shadow-black/20">
        <p className="text-sm uppercase tracking-[0.3em] text-cyan-300">Super Admin</p>
        <h1 className="mt-3 text-4xl font-semibold text-white">User management</h1>
        <p className="mt-4 text-sm leading-6 text-slate-300">
          Impersonate a user to inspect their dashboard and account experience.
        </p>
      </header>

      {message && (
        <div className="mb-6 rounded-3xl border border-cyan-400/20 bg-cyan-500/10 p-4 text-cyan-100">
          {message}
        </div>
      )}

      <div className="overflow-hidden rounded-3xl border border-white/10 bg-slate-950/90 shadow-lg shadow-black/20">
        <div className="grid gap-4 p-6 text-slate-400 sm:grid-cols-[2fr_1fr_1fr_1fr]">
          <span className="font-semibold text-white">Name</span>
          <span className="font-semibold text-white">Email</span>
          <span className="font-semibold text-white">Role</span>
          <span className="font-semibold text-white">Actions</span>
        </div>

        {users.map((user) => {
          const canImpersonate = currentUser?.role === ROLES.SUPER_ADMIN && user.role !== ROLES.SUPER_ADMIN
          return (
            <div
              key={user.id}
              className="grid items-center gap-4 border-t border-white/10 px-6 py-4 sm:grid-cols-[2fr_1fr_1fr_1fr]"
            >
              <div>
                <p className="font-medium text-white">{user.firstName} {user.lastName}</p>
              </div>
              <div className="text-slate-300">{user.email}</div>
              <div className="text-slate-300 uppercase tracking-[0.2em] text-xs">
                {user.role.replace('_', ' ')}
              </div>
              <div>
                {canImpersonate ? (
                  <button
                    onClick={() => handleImpersonate(user)}
                    className="rounded-2xl bg-cyan-500 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400"
                  >
                    Impersonate
                  </button>
                ) : (
                  <span className="text-slate-500">No actions</span>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Users
