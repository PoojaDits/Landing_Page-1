import React from 'react'
import { Link } from 'react-router-dom'
import { stores } from '@/lib/storeData'

const AllStores: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto p-6 sm:p-8">
      <header className="mb-8 rounded-3xl bg-slate-950/90 p-8 shadow-xl shadow-black/20">
        <p className="text-sm uppercase tracking-[0.3em] text-cyan-300">Manage stores</p>
        <h1 className="mt-3 text-4xl font-semibold text-white">All stores</h1>
        <p className="mt-4 max-w-2xl text-sm leading-6 text-slate-300">
          Browse every store on the platform and click a row to view detailed location, orders, products, and complaints.
        </p>
      </header>

      <div className="overflow-hidden rounded-3xl border border-white/10 bg-slate-950/90 shadow-xl shadow-black/20">
        <div className="grid gap-4 p-6 text-slate-400 sm:grid-cols-[1.5fr_1fr_1fr_0.8fr_0.8fr]">
          <span className="font-semibold text-white">Store</span>
          <span className="font-semibold text-white">Location</span>
          <span className="font-semibold text-white">Owner Email</span>
          <span className="font-semibold text-white">Products</span>
          <span className="font-semibold text-white">Pending</span>
        </div>

        {stores.map((store) => (
          <Link
            key={store.id}
            to={`/super-admin/stores/${store.id}`}
            className="grid gap-4 border-t border-white/10 px-6 py-5 text-slate-200 transition hover:bg-slate-900/80 sm:grid-cols-[1.5fr_1fr_1fr_0.8fr_0.8fr]"
          >
            <div>
              <p className="font-medium text-white">{store.name}</p>
              <p className="text-sm text-slate-400">{store.status}</p>
            </div>
            <div className="text-slate-300">{store.location}</div>
            <div className="text-slate-300 break-all">{store.ownerEmail}</div>
            <div className="text-slate-300">{store.productsCount}</div>
            <div className="text-slate-300">{store.pendingOrders}</div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default AllStores
