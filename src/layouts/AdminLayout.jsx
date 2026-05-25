import { useState } from 'react';
import { Link, useLocation, Outlet } from 'react-router-dom';
import { getStoredUser, clearAuth } from '@/lib/role';
import { cn } from '@/lib/utils';
import {
    LayoutDashboard, ShoppingBag, Package, Users, BarChart3, Settings, LogOut,
    Menu, X, TrendingUp, ClipboardList, Tag, Truck, Star, MessageSquare, Bell, Home, User,
} from 'lucide-react';

const BG = 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)';
const SB = 'rgba(22, 22, 46, 0.98)';
const HB = 'rgba(22, 22, 46, 0.9)';
const BD = 'rgba(255,255,255,0.06)';
const AC = '#e94560';
const ACL = '#f85c76';

const sections = [
    {
        label: 'Store',
        items: [{ icon: Home, label: 'Home', href: '/' }],
    },
    {
        label: 'Overview',
        items: [
            { icon: LayoutDashboard, label: 'Dashboard', href: '/admin/dashboard' },
            { icon: BarChart3, label: 'Analytics', href: '/admin/analytics' },
            { icon: TrendingUp, label: 'Sales Report', href: '/admin/reports' },
        ],
    },
    {
        label: 'Management',
        items: [
            { icon: Package, label: 'Products', href: '/admin/products' },
            { icon: Tag, label: 'Categories', href: '/admin/categories' },
            { icon: ClipboardList, label: 'Orders', href: '/admin/orders' },
            { icon: Truck, label: 'Shipping', href: '/admin/shipping' },
        ],
    },
    {
        label: 'Engagement',
        items: [
            { icon: Star, label: 'Reviews', href: '/admin/reviews' },
            { icon: MessageSquare, label: 'Messages', href: '/admin/messages' },
            { icon: Users, label: 'Customers', href: '/admin/customers' },
        ],
    },
    {
        label: 'Settings',
        items: [{ icon: Settings, label: 'Store Settings', href: '/admin/settings' }],
    },
];

export default function AdminLayout({ handleLogout }) {
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
                sidebarOpen ? 'translate-x-0' : '-translate-x-full', collapsed ? 'w-16' : 'w-60'
            )} style={{ background: SB, borderRight: `1px solid ${BD}` }}>
                <div className={cn('flex items-center h-14 border-b shrink-0', collapsed ? 'justify-center px-2' : 'justify-between px-4')}
                    style={{ borderColor: BD }}>
                    <Link to="/" className="flex items-center gap-2 shrink-0">
                        <div className="w-7 h-7 rounded-lg flex items-center justify-center text-white font-bold text-xs shadow-lg"
                            style={{ background: `linear-gradient(135deg, ${AC}, ${ACL})`, boxShadow: '0 4px 15px rgba(233,69,96,0.3)' }}>A</div>
                        {!collapsed && <span className="font-bold text-sm text-white">AdminPanel</span>}
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
                            {!collapsed && <h3 className="text-[10px] font-semibold uppercase tracking-wider mb-1 px-2" style={{ color: 'rgba(255,255,255,0.25)' }}>{sec.label}</h3>}
                            <ul className="space-y-0.5">
                                {sec.items.map(item => {
                                    const Icon = item.icon; const active = isActive(item.href);
                                    return (
                                        <li key={item.label + item.href}>
                                            <Link to={item.href} className={cn(
                                                'flex items-center gap-2.5 rounded-lg text-sm font-medium transition-all duration-200',
                                                collapsed ? 'justify-center px-0 py-2.5' : 'px-3 py-2',
                                                active ? 'text-white' : 'text-gray-400 hover:text-white hover:bg-white/5'
                                            )} style={active ? { background: 'rgba(233, 69, 96, 0.15)' } : {}} title={collapsed ? item.label : undefined}>
                                                <Icon className="w-4 h-4 shrink-0" style={{ color: active ? AC : 'rgba(255,255,255,0.3)' }} />
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
                    <Link to="/admin/settings" className={cn(
                        'flex items-center gap-2.5 rounded-lg text-sm font-medium text-gray-400 hover:text-white hover:bg-white/5 transition-all',
                        collapsed ? 'justify-center px-0 py-2.5' : 'px-3 py-2'
                    )} title={collapsed ? 'Profile' : undefined}>
                        <User className="w-4 h-4 shrink-0" style={{ color: 'rgba(255,255,255,0.3)' }} />
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
                        <div className="hidden sm:flex items-center gap-2">
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold" style={{ background: 'rgba(233,69,96,0.15)', color: AC }}>ADMIN</span>
                            <span className="text-xs text-gray-400">{location.pathname.split('/').filter(Boolean).join(' / ')}</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="hidden md:flex items-center gap-2 rounded-lg px-3 py-1.5" style={{ background: 'rgba(255,255,255,0.05)' }}>
                            <svg className="w-3.5 h-3.5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>
                            <input type="text" placeholder="Search..." className="bg-transparent border-none outline-none text-xs text-gray-300 placeholder-gray-500 w-24" />
                        </div>
                        <Link to="/" className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/5" title="Home"><Home className="w-4 h-4" /></Link>
                        <button className="relative p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/5">
                            <Bell className="w-4 h-4" />
                            <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full ring-2" style={{ background: AC, borderColor: '#16213e' }} />
                        </button>
                        <div className="relative">
                            <button onClick={() => setUserMenuOpen(!userMenuOpen)} className="flex items-center gap-2 p-1 rounded-lg hover:bg-white/5">
                                <div className="w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-semibold ring-2"
                                    style={{ background: `linear-gradient(135deg, ${AC}, ${ACL})`, boxShadow: '0 0 0 2px rgba(233,69,96,0.2)' }}>
                                    {user?.firstName?.charAt(0)?.toUpperCase() || 'A'}
                                </div>
                            </button>
                            {userMenuOpen && (
                                <>
                                    <div className="fixed inset-0 z-10" onClick={() => setUserMenuOpen(false)} />
                                    <div className="absolute right-0 top-full mt-2 w-48 rounded-xl shadow-xl z-20 py-1.5 border" style={{ background: '#16213e', borderColor: 'rgba(255,255,255,0.08)' }}>
                                        <div className="px-4 py-2.5 border-b" style={{ borderColor: BD }}>
                                            <p className="text-sm font-medium text-white">{user?.firstName} {user?.lastName}</p>
                                            <p className="text-xs text-gray-400">{user?.email}</p>
                                            <span className="inline-block mt-1 px-2 py-0.5 rounded-full text-[10px] font-semibold" style={{ background: 'rgba(233,69,96,0.15)', color: AC }}>ADMIN</span>
                                        </div>
                                        <Link to="/admin/settings" onClick={() => setUserMenuOpen(false)} className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-gray-300 hover:bg-white/5"><Settings className="w-4 h-4" /> Settings</Link>
                                        <div className="border-t mt-1 pt-1" style={{ borderColor: BD }}>
                                            <button onClick={handleLogout} className="flex items-center gap-2.5 px-4 py-2.5 text-sm w-full hover:bg-white/5" style={{ color: AC }}><LogOut className="w-4 h-4" /> Sign Out</button>
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