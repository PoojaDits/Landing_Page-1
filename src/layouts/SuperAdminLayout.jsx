import { useState } from 'react';
import { Link, useLocation, Outlet } from 'react-router-dom';
import { getStoredUser, clearAuth } from '@/lib/role';
import { cn } from '@/lib/utils';
import {
    LayoutDashboard, ShoppingBag, Package, Users, BarChart3, Settings, LogOut,
    Menu, X, TrendingUp, ClipboardList, Truck, Bell, Activity,
    Globe, AlertTriangle, UserCog, Building, CreditCard, Database, Server, Sliders, Home, User,
} from 'lucide-react';

const BG = 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)';
const SB = 'rgba(15, 15, 30, 0.98)';
const HB = 'rgba(15, 15, 30, 0.9)';
const BD = 'rgba(255,255,255,0.06)';
const AC = '#e94560';
const ACL = '#f85c76';
const GREEN = '#22c55e';

const sections = [
    {
        label: 'Store',
        items: [{ icon: Home, label: 'Home', href: '/' }],
    },
    {
        label: 'Overview',
        items: [
            { icon: LayoutDashboard, label: 'Dashboard', href: '/super-admin/dashboard' },
            { icon: Activity, label: 'System Health', href: '/super-admin/system' },
            { icon: BarChart3, label: 'Analytics', href: '/super-admin/analytics' },
            { icon: TrendingUp, label: 'Reports', href: '/super-admin/reports' },
        ],
    },
    {
        label: 'Platform',
        items: [
            { icon: Building, label: 'Stores', href: '/super-admin/stores' },
            { icon: Users, label: 'All Users', href: '/super-admin/users' },
            { icon: UserCog, label: 'Admins', href: '/super-admin/admins' },
            { icon: AlertTriangle, label: 'Roles & Permissions', href: '/super-admin/roles' },
        ],
    },
    {
        label: 'Commerce',
        items: [
            { icon: Package, label: 'All Products', href: '/super-admin/products' },
            { icon: ClipboardList, label: 'All Orders', href: '/super-admin/orders' },
            { icon: CreditCard, label: 'Transactions', href: '/super-admin/transactions' },
            { icon: Truck, label: 'Logistics', href: '/super-admin/logistics' },
        ],
    },
    {
        label: 'System',
        items: [
            { icon: Globe, label: 'Site Config', href: '/super-admin/config' },
            { icon: Database, label: 'Database', href: '/super-admin/database' },
            { icon: Server, label: 'API Management', href: '/super-admin/api' },
            { icon: AlertTriangle, label: 'Audit Logs', href: '/super-admin/audit' },
        ],
    },
    {
        label: 'Settings',
        items: [{ icon: Sliders, label: 'Global Settings', href: '/super-admin/settings' }],
    },
];

export default function SuperAdminLayout({ handleLogout }) {
    const user = getStoredUser();
    const location = useLocation();
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [collapsed, setCollapsed] = useState(false);
    const [userMenuOpen, setUserMenuOpen] = useState(false);
    const isActive = (href) => href === '/' ? location.pathname === '/' : location.pathname.startsWith(href);

    return (
        <div className="min-h-screen flex" style={{ background: BG }}>
            {sidebarOpen && <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />}

            <aside className={cn(
                'fixed top-0 left-0 z-50 h-full flex flex-col shrink-0 transition-all duration-300 lg:translate-x-0 lg:relative',
                sidebarOpen ? 'translate-x-0' : '-translate-x-full', collapsed ? 'w-16' : 'w-64'
            )} style={{ background: SB, borderRight: `1px solid ${BD}` }}>
                <div className={cn('flex items-center h-14 border-b shrink-0', collapsed ? 'justify-center px-2' : 'justify-between px-4')}
                    style={{ borderColor: BD }}>
                    <Link to="/" className="flex items-center gap-2 shrink-0">
                        <div className="relative">
                            <div className="w-7 h-7 rounded-lg flex items-center justify-center text-white font-bold text-xs shadow-lg"
                                style={{ background: `linear-gradient(135deg, ${AC}, ${ACL})`, boxShadow: '0 4px 20px rgba(233,69,96,0.35)' }}>S</div>
                            <div className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full ring-2" style={{ background: GREEN, borderColor: '#0f0f1e' }} />
                        </div>
                        {!collapsed && <div><span className="font-bold text-sm text-white block leading-tight">SuperAdmin</span><span className="text-[8px] font-semibold tracking-widest uppercase" style={{ color: AC }}>Root Access</span></div>}
                    </Link>
                    <button onClick={() => setCollapsed(!collapsed)} className="hidden lg:flex p-1 rounded-lg text-gray-500 hover:text-white hover:bg-white/5" title={collapsed ? 'Expand' : 'Collapse'}>
                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d={collapsed ? 'M13 5l7 7-7 7M5 5l7 7-7 7' : 'M11 19l-7-7 7-7m8 14l-7-7 7-7'} />
                        </svg>
                    </button>
                </div>

                <nav className="flex-1 overflow-y-auto py-2 px-2 space-y-4">
                    {sections.map(sec => (
                        <div key={sec.label}>
                            {!collapsed && <h3 className="text-[10px] font-semibold uppercase tracking-wider mb-1 px-2" style={{ color: 'rgba(255,255,255,0.2)' }}>{sec.label}</h3>}
                            <ul className="space-y-0.5">
                                {sec.items.map(item => {
                                    const Icon = item.icon; const active = isActive(item.href);
                                    return (
                                        <li key={item.label + item.href}>
                                            <Link to={item.href} className={cn(
                                                'flex items-center gap-2.5 rounded-lg text-sm font-medium transition-all duration-200',
                                                collapsed ? 'justify-center px-0 py-2.5' : 'px-3 py-2',
                                                active ? 'text-white' : 'text-gray-400 hover:text-white hover:bg-white/5'
                                            )} style={active ? { background: 'rgba(233, 69, 96, 0.12)', boxShadow: 'inset 0 0 0 1px rgba(233,69,96,0.15)' } : {}}
                                                title={collapsed ? item.label : undefined}>
                                                <Icon className="w-4 h-4 shrink-0" style={{ color: active ? AC : 'rgba(255,255,255,0.2)' }} />
                                                {!collapsed && <span>{item.label}</span>}
                                            </Link>
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>
                    ))}
                </nav>

                <div className="border-t p-2 space-y-0.5" style={{ borderColor: BD }}>
                    <Link to="/super-admin/settings" className={cn(
                        'flex items-center gap-2.5 rounded-lg text-sm font-medium text-gray-400 hover:text-white hover:bg-white/5 transition-all',
                        collapsed ? 'justify-center px-0 py-2.5' : 'px-3 py-2'
                    )} title={collapsed ? 'Profile' : undefined}>
                        <User className="w-4 h-4 shrink-0" style={{ color: 'rgba(255,255,255,0.2)' }} />
                        {!collapsed && 'Profile'}
                    </Link>
                    <button onClick={handleLogout} className={cn(
                        'flex items-center gap-2.5 rounded-lg text-sm font-medium w-full hover:bg-white/5 transition-all',
                        collapsed ? 'justify-center px-0 py-2.5' : 'px-3 py-2'
                    )} style={{ color: AC }} title={collapsed ? 'Logout' : undefined}>
                        <LogOut className="w-4 h-4 shrink-0" />
                        {!collapsed && 'Sign Out'}
                    </button>
                </div>
            </aside>

            <div className="flex-1 flex flex-col min-w-0">
                <header className="sticky top-0 z-30 h-14 flex items-center justify-between px-4 sm:px-6 shrink-0 border-b"
                    style={{ background: HB, borderColor: BD, backdropFilter: 'blur(12px)' }}>
                    <div className="flex items-center gap-3">
                        <button onClick={() => setSidebarOpen(true)} className="lg:hidden p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/5"><Menu className="w-5 h-5" /></button>
                        <div className="hidden sm:flex items-center gap-2.5">
                            <span className="flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase border"
                                style={{ background: 'rgba(233,69,96,0.1)', borderColor: 'rgba(233,69,96,0.2)', color: AC }}>Super Admin</span>
                            <span className="text-xs text-gray-500 font-mono">/{location.pathname.split('/').filter(Boolean).join('/')}</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-full" style={{ background: 'rgba(255,255,255,0.03)' }}>
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ background: GREEN }} />
                                <span className="relative inline-flex rounded-full h-2 w-2" style={{ background: GREEN }} />
                            </span>
                            <span className="text-[10px] text-gray-400">System Online</span>
                        </div>
                        <Link to="/" className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/5" title="Home"><Home className="w-4 h-4" /></Link>
                        <button className="relative p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/5">
                            <Bell className="w-4 h-4" />
                            <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full ring-2" style={{ background: AC, borderColor: '#0f0f1e' }} />
                        </button>
                        <div className="relative">
                            <button onClick={() => setUserMenuOpen(!userMenuOpen)} className="flex items-center gap-2 p-1 rounded-lg hover:bg-white/5">
                                <div className="w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-bold ring-2"
                                    style={{ background: `linear-gradient(135deg, ${AC}, ${ACL})`, boxShadow: '0 0 0 2px rgba(233,69,96,0.25)' }}>
                                    {user?.firstName?.charAt(0)?.toUpperCase() || 'S'}
                                </div>
                            </button>
                            {userMenuOpen && (
                                <>
                                    <div className="fixed inset-0 z-10" onClick={() => setUserMenuOpen(false)} />
                                    <div className="absolute right-0 top-full mt-2 w-52 rounded-xl shadow-xl z-20 py-1.5 border" style={{ background: '#0f0f1e', borderColor: 'rgba(255,255,255,0.08)' }}>
                                        <div className="px-4 py-2.5 border-b" style={{ borderColor: BD }}>
                                            <p className="text-sm font-medium text-white">{user?.firstName} {user?.lastName}</p>
                                            <p className="text-xs text-gray-400">{user?.email}</p>
                                            <div className="flex items-center gap-1.5 mt-1.5">
                                                <span className="px-2 py-0.5 rounded-full text-[9px] font-bold tracking-wide border" style={{ background: 'rgba(233,69,96,0.12)', borderColor: 'rgba(233,69,96,0.2)', color: AC }}>SUPER ADMIN</span>
                                                <span className="px-2 py-0.5 rounded-full text-[9px] font-bold" style={{ background: 'rgba(34,197,94,0.1)', color: GREEN }}>ROOT</span>
                                            </div>
                                        </div>
                                        <Link to="/super-admin/settings" onClick={() => setUserMenuOpen(false)} className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-gray-300 hover:bg-white/5"><Settings className="w-4 h-4" /> Settings</Link>
                                        <Link to="/super-admin/audit" onClick={() => setUserMenuOpen(false)} className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-gray-300 hover:bg-white/5"><AlertTriangle className="w-4 h-4" /> Audit Logs</Link>
                                        <div className="border-t mt-1 pt-1" style={{ borderColor: BD }}>
                                            <button onClick={handleLogout} className="flex items-center gap-2.5 px-4 py-2.5 text-sm w-full hover:bg-white/5" style={{ color: AC }}><LogOut className="w-4 h-4" /> Terminate Session</button>
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </header>
                <main className="flex-1 p-4 sm:p-6 lg:p-8 bg-white text-gray-900"><Outlet /></main>
            </div>
        </div>
    );
}