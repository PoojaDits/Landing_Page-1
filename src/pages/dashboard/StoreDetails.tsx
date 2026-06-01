import React from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { getStoreById } from '@/lib/storeData'

const StoreDetails: React.FC = () => {
  const { storeId } = useParams<{ storeId: string }>()
  const navigate = useNavigate()
  const store = storeId ? getStoreById(storeId) : undefined

  if (!store) {
    return (
      <div className="max-w-6xl mx-auto p-6 sm:p-8">
        <div className="rounded-3xl bg-slate-950/90 p-8 shadow-xl shadow-black/20">
          <h1 className="text-3xl font-semibold text-white">Store not found</h1>
          <p className="mt-3 text-sm text-slate-400">
            The requested store does not exist. Please return to the store list.
          </p>
          <button
            onClick={() => navigate('/super-admin/stores')}
            className="mt-6 rounded-2xl bg-cyan-500 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400"
          >
            Back to stores
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto p-6 sm:p-8">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-cyan-300">Store details</p>
          <h1 className="mt-2 text-4xl font-semibold text-white">{store.name}</h1>
          <p className="mt-2 text-sm text-slate-400">{store.location} · {store.region}</p>
        </div>
        <Link
          to="/super-admin/stores"
          className="inline-flex items-center justify-center rounded-2xl bg-slate-800 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-700"
        >
          Back to store list
        </Link>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.5fr_1fr]">
        <div className="space-y-6 rounded-3xl bg-slate-950/90 p-6 shadow-xl shadow-black/20">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-slate-400">Owner</p>
              <p className="mt-2 text-lg font-semibold text-white">{store.ownerName}</p>
              <p className="mt-1 text-sm text-slate-400">{store.ownerEmail}</p>
              <p className="mt-1 text-sm text-slate-400">{store.phone}</p>
            </div>
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-slate-400">Status</p>
              <p className="mt-2 rounded-2xl px-3 py-2 text-sm font-semibold text-white bg-slate-800 inline-block">
                {store.status}
              </p>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <div className="rounded-3xl bg-slate-900/80 p-5">
              <p className="text-xs uppercase tracking-[0.24em] text-slate-400">Products</p>
              <p className="mt-3 text-3xl font-semibold text-white">{store.productsCount}</p>
            </div>
            <div className="rounded-3xl bg-slate-900/80 p-5">
              <p className="text-xs uppercase tracking-[0.24em] text-slate-400">Current orders</p>
              <p className="mt-3 text-3xl font-semibold text-white">{store.currentOrders}</p>
            </div>
            <div className="rounded-3xl bg-slate-900/80 p-5">
              <p className="text-xs uppercase tracking-[0.24em] text-slate-400">Pending orders</p>
              <p className="mt-3 text-3xl font-semibold text-white">{store.pendingOrders}</p>
            </div>
            <div className="rounded-3xl bg-slate-900/80 p-5">
              <p className="text-xs uppercase tracking-[0.24em] text-slate-400">Open complaints</p>
              <p className="mt-3 text-3xl font-semibold text-white">{store.complaints}</p>
            </div>
          </div>

          <section className="rounded-3xl bg-slate-900/80 p-6">
            <h2 className="text-2xl font-semibold text-white">Detailed summary</h2>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <div className="rounded-3xl bg-slate-950/80 p-4">
                <p className="text-xs uppercase tracking-[0.24em] text-slate-400">Location</p>
                <p className="mt-2 text-sm text-slate-200">{store.location}</p>
              </div>
              <div className="rounded-3xl bg-slate-950/80 p-4">
                <p className="text-xs uppercase tracking-[0.24em] text-slate-400">Region</p>
                <p className="mt-2 text-sm text-slate-200">{store.region}</p>
              </div>
              <div className="rounded-3xl bg-slate-950/80 p-4">
                <p className="text-xs uppercase tracking-[0.24em] text-slate-400">Owner email</p>
                <p className="mt-2 text-sm text-slate-200">{store.ownerEmail}</p>
              </div>
              <div className="rounded-3xl bg-slate-950/80 p-4">
                <p className="text-xs uppercase tracking-[0.24em] text-slate-400">Phone</p>
                <p className="mt-2 text-sm text-slate-200">{store.phone}</p>
              </div>
            </div>
          </section>
        </div>

        <aside className="space-y-6 rounded-3xl bg-slate-900/80 p-6 shadow-xl shadow-black/20">
          <div>
            <h2 className="text-2xl font-semibold text-white">Action center</h2>
            <p className="mt-3 text-sm text-slate-400">
              Manage store operations and review current issues at a glance.
            </p>
          </div>
          <div className="rounded-3xl bg-slate-950/80 p-5">
            <p className="text-xs uppercase tracking-[0.24em] text-slate-400">Order health</p>
            <p className="mt-3 text-lg font-semibold text-white">{store.pendingOrders} pending orders</p>
            <p className="mt-2 text-sm text-slate-400">Focus on resolving pending shipments to keep the store on track.</p>
          </div>
          <div className="rounded-3xl bg-slate-950/80 p-5">
            <p className="text-xs uppercase tracking-[0.24em] text-slate-400">Customer care</p>
            <p className="mt-3 text-lg font-semibold text-white">{store.complaints} open complaints</p>
            <p className="mt-2 text-sm text-slate-400">Resolve complaints quickly to improve seller score.</p>
          </div>
        </aside>
      </div>
    </div>
  )
}

export default StoreDetails
