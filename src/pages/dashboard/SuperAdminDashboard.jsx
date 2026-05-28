import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Globe, 
  Store, 
  Users, 
  ShieldCheck, 
  TrendingUp, 
  Activity, 
  Zap, 
  Server,
  ArrowUpRight,
  ArrowDownRight,
  MoreVertical,
  Search,
  Filter
} from 'lucide-react';

const platformStats = [
  {
label: 'stores',
value: '42',
change: '+3',
trend: 'up',
icon: Store,
color: 'text-blue-600',
bg: 'bg-blue-50',
description: 'Active merchant stores'
},

  {
label: 'Total admins',
value: '58',
change: '+3',
trend: 'up',
icon: Store,
color: 'text-blue-600',
bg: 'bg-blue-50',
description: 'Active merchant stores'
},

  {
label: 'Total Users',
value: '12,402',
change: '+1.2k',
trend: 'up',
icon: Users,
color: 'text-emerald-600',
bg: 'bg-emerald-50',
description: 'Across all platforms'
},
     {
label: 'Platform GMV',
value: '$1,284,500',
change: '+15.2%',
trend: 'up',
icon: Globe,
color: 'text-indigo-600',
bg: 'bg-indigo-50',
description: 'Gross Merchandise Value'
}
];

const storePerformance = [
  { name: 'Fashion Hub', owner: 'Alice Johnson', sales: '$45,200', status: 'Active', growth: '+12%' },
  { name: 'Tech World', owner: 'Bob Smith', sales: '$120,500', status: 'Active', growth: '+24%' },
  { name: 'Home Decor', owner: 'Carol White', sales: '$12,300', status: 'Warning', growth: '-5%' },
  { name: 'Sports Direct', owner: 'Dave Wilson', sales: '$89,000', status: 'Active', growth: '+8%' },
];

const auditLogs = [
  { action: 'New Store Approved', user: 'SuperAdmin', target: 'GadgetBox', time: '10 mins ago', type: 'success' },
  { action: 'Security Policy Updated', user: 'System', target: 'Auth-Service', time: '1 hour ago', type: 'info' },
  { action: 'Database Backup', user: 'System', target: 'PostgreSQL Main', time: '4 hours ago', type: 'warning' },
];

export default function SuperAdminDashboard() {
  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      
      {/* Header with Search */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <ShieldCheck className="w-5 h-5 text-indigo-600" />
            <span className="text-xs font-bold text-indigo-600 uppercase tracking-widest">Platform Control Tower</span>
          </div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Super Admin Dashboard</h1>
        </div>
        
        <div className="flex items-center gap-2 bg-white p-1.5 rounded-2xl shadow-sm border border-slate-200 w-full lg:w-96">
          <div className="pl-3 pr-2 text-slate-400">
            <Search className="w-4 h-4" />
          </div>
          <input 
            type="text" 
            placeholder="Search stores, users, or logs..." 
            className="flex-1 bg-transparent border-none outline-none text-sm py-1"
          />
          <button className="p-2 bg-slate-100 text-slate-600 rounded-xl hover:bg-slate-200 transition-colors">
            <Filter className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Platform Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {platformStats.map((stat, i) => (
          <Link to={stat.href} key={i} className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-xl transition-all group overflow-hidden relative">
            {/* Background Accent */}
            <div className={`absolute -right-4 -top-4 w-24 h-24 rounded-full opacity-5 group-hover:opacity-10 transition-opacity ${stat.bg.replace('50', '500')}`}></div>
            
            <div className="flex items-center justify-between mb-4 relative z-10">
              <div className={`w-12 h-12 ${stat.bg} ${stat.color} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform`}>
                <stat.icon className="w-6 h-6" />
              </div>
              <div className={`text-[10px] font-bold px-2 py-1 rounded-lg flex items-center gap-1 ${
                stat.trend === 'up' ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'
              }`}>
                {stat.trend === 'up' ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                {stat.change}
              </div>
            </div>
            
            <div className="relative z-10">
              <p className="text-sm font-semibold text-slate-400 uppercase tracking-wider">{stat.label}</p>
              <h3 className="text-2xl font-black text-slate-800 mt-1">{stat.value}</h3>
              <p className="text-xs text-slate-500 mt-2 flex items-center gap-1">
                <Activity className="w-3 h-3 text-slate-300" />
                {stat.description}
              </p>
            </div>
          </Link>
        ))}
      </div>

        
    </div>
  );
}
