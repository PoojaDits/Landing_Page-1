import React, { useState } from 'react';
import { 
  Store, 
  Search, 
  Filter, 
  MoreVertical, 
  ExternalLink, 
  Shield, 
  User, 
  Calendar,
  ChevronRight,
  Plus
} from 'lucide-react';

const initialStores = [
  { id: 1, name: 'Fashion Hub', owner: 'Alice Johnson', email: 'alice@fashionhub.com', category: 'Fashion', status: 'Active', gmv: '$45,200', date: 'Jan 12, 2026' },
  { id: 2, name: 'Tech World', owner: 'Bob Smith', email: 'bob@techworld.com', category: 'Electronics', status: 'Active', gmv: '$120,500', date: 'Feb 05, 2026' },
  { id: 3, name: 'Home Decor', owner: 'Carol White', email: 'carol@homedecor.com', category: 'Lifestyle', status: 'Warning', gmv: '$12,300', date: 'Mar 15, 2026' },
  { id: 4, name: 'Sports Direct', owner: 'Dave Wilson', email: 'dave@sports.com', category: 'Sports', status: 'Active', gmv: '$89,000', date: 'Apr 20, 2026' },
  { id: 5, name: 'Gadget Box', owner: 'Emma Davis', email: 'emma@gadgetbox.com', category: 'Electronics', status: 'Active', gmv: '$34,100', date: 'May 02, 2026' },
  { id: 6, name: 'Organic Eats', owner: 'Frank Miller', email: 'frank@organiceats.com', category: 'Food', status: 'Inactive', gmv: '$0', date: 'May 24, 2026' },
];

export default function AllStores() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredStores = initialStores.filter(store => 
    store.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    store.owner.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">All Stores</h1>
          <p className="text-sm text-slate-500 mt-1">Manage and monitor all tenant stores on the platform.</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-xl font-semibold text-sm hover:bg-indigo-700 transition-all shadow-md active:scale-95">
          <Plus className="w-4 h-4" /> Add New Store
        </button>
      </div>

      {/* Filters & Search */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search by store name or owner..." 
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-2xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all text-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-200 text-slate-600 rounded-2xl text-sm font-medium hover:bg-slate-50 transition-colors">
            <Filter className="w-4 h-4" /> Filter
          </button>
          <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-200 text-slate-600 rounded-2xl text-sm font-medium hover:bg-slate-50 transition-colors">
            Category
          </button>
        </div>
      </div>

      {/* Stores Table */}
      <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50/50 text-[10px] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100">
                <th className="px-6 py-4">Store & Owner</th>
                <th className="px-6 py-4">Category</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Total GMV</th>
                <th className="px-6 py-4">Joined Date</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filteredStores.map((store) => (
                <tr key={store.id} className="hover:bg-slate-50/50 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600 font-bold group-hover:scale-110 transition-transform">
                        {store.name.charAt(0)}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-slate-800">{store.name}</p>
                        <div className="flex items-center gap-1 text-xs text-slate-400">
                          <User className="w-3 h-3" />
                          {store.owner}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-xs font-medium text-slate-600 bg-slate-100 px-2 py-1 rounded-lg">
                      {store.category}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                      store.status === 'Active' ? 'bg-emerald-100 text-emerald-700' : 
                      store.status === 'Warning' ? 'bg-amber-100 text-amber-700' : 'bg-slate-100 text-slate-500'
                    }`}>
                      {store.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <span className="text-sm font-bold text-slate-800">{store.gmv}</span>
                      <span className="text-[10px] text-emerald-500 font-bold tracking-tighter">Growth +12%</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-xs text-slate-500">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {store.date}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all" title="View Storefront">
                        <ExternalLink className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-all">
                        <MoreVertical className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filteredStores.length === 0 && (
          <div className="py-12 text-center">
            <Store className="w-12 h-12 text-slate-200 mx-auto mb-3" />
            <p className="text-slate-500 font-medium">No stores found matching your search.</p>
          </div>
        )}
      </div>

      {/* Pagination Placeholder */}
      <div className="flex items-center justify-between px-2">
        <p className="text-xs text-slate-400 font-medium italic">Showing {filteredStores.length} of {initialStores.length} total stores</p>
        <div className="flex gap-2">
          <button className="px-4 py-2 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-400 cursor-not-allowed">Previous</button>
          <button className="px-4 py-2 bg-white border border-slate-200 rounded-xl text-xs font-bold text-indigo-600 hover:bg-indigo-50 transition-colors">Next</button>
        </div>
      </div>
    </div>
  );
}
