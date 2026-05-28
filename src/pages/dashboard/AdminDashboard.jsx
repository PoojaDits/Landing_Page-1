import React from 'react';
import { 
  TrendingUp, Users, ShoppingBag, DollarSign, 
  ArrowUpRight, ArrowDownRight,Calendar, Download, Plus
} from 'lucide-react';

const stats = [
  {
    label: 'Total Revenue',
    value: '$45,231.89',
    change: '+12.5%',
    trend: 'up',
    icon: DollarSign,
    gradient: 'from-blue-600 to-indigo-600',
    shadow: 'shadow-blue-200'
  },
  {
    label: 'Total Orders',
    value: '2,350',
    change: '+5.4%',
    trend: 'up',
    icon: ShoppingBag,
    gradient: 'from-purple-600 to-pink-600',
    shadow: 'shadow-purple-200'
  },
  {
    label: 'Active Customers',
    value: '12,204',
    change: '-2.1%',
    trend: 'down',
    icon: Users,
    gradient: 'from-amber-500 to-orange-600',
    shadow: 'shadow-orange-200'
  },
  {
    label: 'Conversion Rate',
    value: '4.35%',
    change: '+18.2%',
    trend: 'up',
    icon: TrendingUp,
    gradient: 'from-emerald-500 to-teal-600',
    shadow: 'shadow-emerald-200'
  }
];

export default function AdminDashboard() {
  return (
    <div className="space-y-8 pb-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
      
      {/* --- HERO HEADER --- */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Dashboard <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Overview</span>
          </h1>
          <p className="text-slate-500 mt-1 flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            Performance updated as of May 28, 2026
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 text-slate-700 rounded-xl font-semibold text-sm hover:bg-slate-50 transition-all shadow-sm">
            <Download className="w-4 h-4" /> Export
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl font-semibold text-sm hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-200 transition-all active:scale-95">
            <Plus className="w-4 h-4" /> Add Product
          </button>
        </div>
      </div>

      {/* --- STATS GRID --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((item) => (
          <div key={item.label} className={`group relative bg-white p-6 rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1`}>
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 bg-gradient-to-br ${item.gradient} rounded-2xl flex items-center justify-center text-white shadow-lg ${item.shadow} group-hover:scale-110 transition-transform`}>
                <item.icon className="w-6 h-6" />
              </div>
              <div className={`flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-full ${
                item.trend === 'up' ? 'text-emerald-600 bg-emerald-50' : 'text-rose-600 bg-rose-50'
              }`}>
                {item.trend === 'up' ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                {item.change}
              </div>
            </div>
            <p className="text-sm font-semibold text-slate-400 tracking-wide uppercase">{item.label}</p>
            <h3 className="text-2xl font-black text-slate-800 mt-1">{item.value}</h3>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
   


      </div>
    </div>
  );
}