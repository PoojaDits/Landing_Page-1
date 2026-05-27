import { useState } from 'react';
import { Link, useLocation, Outlet } from 'react-router-dom';
import { getStoredUser } from '@/lib/role';
import { cn } from '@/lib/utils';
import {
    LayoutDashboard, BarChart3, FileText, Package, PackagePlus, Tags,
    ShoppingCart, Truck, Star, MessageSquare, Users, Settings, LogOut,
    Menu, X, Bell, Home, ChevronDown, User,
} from 'lucide-react';

const BG = 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f3460 100%)';
const SB = 'rgba(15, 23, 42, 0.95)';
const HB = 'rgba(15, 23, 42, 0.9)';
const BD = 'rgba(255,255,255,0.06)';
const AC = '#3b82f6';   // blue accent for admin
const ACL = '#60a5fa';
const MUTED = 'rgba(255,255,255,0.3)';

export default function AdminLayout({ handleLogout }) {
    const user = getStoredUser();
    const location = useLocation();
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [userMenuOpen, setUserMenuOpen] = useState(false);
    const isActive = (href) =>
        href === '/' ? location.pathname === '/' : location.pathname.startsWith(href);

    const sections = [
        {
            label: 'Overview',
            items: [
                { icon: LayoutDashboard, label: 'Dashboard', href: '/admin/dashboard' },
                { icon: BarChart3, label: 'Analytics', href: '/admin/analytics' },
                { icon: FileText, label: 'Sales Reports', href: '/admin/reports' },
            ],
        },
        {
            label: 'Catalog',
            items: [
                { icon: Package, label: 'Products', href: '/admin/products' },
                { icon: PackagePlus, label: 'Add Product', href: '/admin/products/new' },
                { icon: Tags, label: 'Categories', href: '/admin/categories' },
            ],
        },
        {
            label: 'Operations',
            items: [
                { icon: ShoppingCart, label: 'Orders', href: '/admin/orders' },
                { icon: Truck, label: 'Shipping', href: '/admin/shipping' },
                { icon: Star, label: 'Reviews', href: '/admin/reviews' },
                { icon: MessageSquare, label: 'Messages', href: '/admin/messages' },
            ],
        },
        {
            label: 'Store',
            items: [
                { icon: Users, label: 'Customers', href: '/admin/customers' },
                { icon: Settings, label: 'Store Settings', href: '/admin/settings' },
            ],
        },
    ];

    return (
        <div className="min-h-screen flex" style={{ background: BG }}>
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

           
            <aside
                className={cn(
                    'fixed top-0 left-0 z-50 h-full w-60 flex flex-col shrink-0 transition-transform duration-300 lg:translate-x-0 lg:relative',
                    sidebarOpen ? 'translate-x-0' : '-translate-x-full'
                )}
                style={{ background: SB, borderRight: `1px solid ${BD}` }}
            >
                {/* Brand */}
                <div className="flex items-center justify-between h-14 px-4 border-b" style={{ borderColor: BD }}>
                    <Link to="/admin/dashboard" className="flex items-center gap-2">
                        <div
                            className="w-7 h-7 rounded-lg flex items-center justify-center text-white font-bold text-xs"
                            style={{ background: `linear-gradient(135deg, ${AC}, ${ACL})` }}
                        >
                            A
                        </div>
                        <span className="font-bold text-sm text-white">Admin Panel</span>
                    </Link>
                    <button
                        onClick={() => setSidebarOpen(false)}
                        className="lg:hidden p-1 rounded-lg text-gray-400 hover:text-white hover:bg-white/5"
                    >
                        <X className="w-4 h-4" />
                    </button>
                </div>

                {/* Nav */}
                <nav className="flex-1 overflow-y-auto py-2 px-2 space-y-5">
                    {sections.map(sec => (
                        <div key={sec.label}>
                            <h3
                                className="text-[10px] font-semibold uppercase tracking-wider mb-1 px-2"
                                style={{ color: MUTED }}
                            >
                                {sec.label}
                            </h3>
                            <ul className="space-y-0.5">
                                {sec.items.map(item => {
                                    const Icon = item.icon;
                                    const active = isActive(item.href);
                                    return (
                                        <li key={item.label + item.href}>
                                            <Link
                                                to={item.href}
                                                className={cn(
                                                    'flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200',
                                                    active ? 'text-white' : 'text-gray-400 hover:text-white hover:bg-white/5'
                                                )}
                                                style={active ? { background: 'rgba(59, 130, 246, 0.15)' } : {}}
                                            >
                                                <Icon
                                                    className="w-4 h-4"
                                                    style={{ color: active ? AC : MUTED }}
                                                />
                                                {item.label}
                                            </Link>
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>
                    ))}
                </nav>

                {/* Footer */}
                <div className="border-t p-2 space-y-0.5" style={{ borderColor: BD }}>
                    <Link
                        to="/admin/settings"
                        className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-medium text-gray-400 hover:text-white hover:bg-white/5 transition-all"
                    >
                        <User className="w-4 h-4" style={{ color: MUTED }} /> Profile
                    </Link>
                    {/* <button
                        onClick={handleLogout}
                        className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-medium w-full hover:bg-white/5 transition-all"
                        style={{ color: AC }}
                    >
                        <LogOut className="w-4 h-4" /> Sign Out
                    </button> */}
                </div>
            </aside>

            {/* ---------- Main ---------- */}
            <div className="flex-1 flex flex-col min-w-0">
                <header
                    className="sticky top-0 z-30 h-14 flex items-center justify-between px-4 sm:px-6 shrink-0 border-b"
                    style={{ background: HB, borderColor: BD, backdropFilter: 'blur(12px)' }}
                >
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => setSidebarOpen(true)}
                            className="lg:hidden p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/5"
                        >
                            <Menu className="w-5 h-5" />
                        </button>
                        <div>
                            <h1 className="text-base font-semibold text-white capitalize">
                                {location.pathname.split('/').pop()?.replace(/-/g, ' ') || 'Dashboard'}
                            </h1>
                            <p className="text-[11px]" style={{ color: 'rgba(255,255,255,0.4)' }}>
                                Welcome, {user?.firstName || 'Admin'}
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <Link
                            to="/home"
                            className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/5"
                            title="Storefront"
                        >
                            <Home className="w-4 h-4" />
                        </Link>
                        <button className="relative p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/5">
                            <Bell className="w-4 h-4" />
                            <span
                                className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full ring-2"
                                style={{ background: AC, borderColor: '#0f172a' }}
                            />
                        </button>
                        <div className="relative">
                            <button
                                onClick={() => setUserMenuOpen(!userMenuOpen)}
                                className="flex items-center gap-2 p-1 rounded-lg hover:bg-white/5"
                            >
                                <div
                                    className="w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-semibold"
                                    style={{ background: `linear-gradient(135deg, ${AC}, ${ACL})` }}
                                >
                                    {user?.firstName?.charAt(0)?.toUpperCase() || 'A'}
                                </div>
                                <ChevronDown className="w-3.5 h-3.5 text-gray-400 hidden sm:block" />
                            </button>
                            {userMenuOpen && (
                                <>
                                    <div
                                        className="fixed inset-0 z-10"
                                        onClick={() => setUserMenuOpen(false)}
                                    />
                                    <div
                                        className="absolute right-0 top-full mt-2 w-48 rounded-xl shadow-xl z-20 py-1.5 border"
                                        style={{ background: '#1e293b', borderColor: 'rgba(255,255,255,0.08)' }}
                                    >
                                        <div className="px-4 py-2.5 border-b" style={{ borderColor: BD }}>
                                            <p className="text-sm font-medium text-white">
                                                {user?.firstName} {user?.lastName}
                                            </p>
                                            <p className="text-xs text-gray-400">{user?.email}</p>
                                        </div>
                                        <Link
                                            to="/admin/settings"
                                            onClick={() => setUserMenuOpen(false)}
                                            className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-gray-300 hover:bg-white/5"
                                        >
                                            <Settings className="w-4 h-4" /> Settings
                                        </Link>
                                        <div className="border-t mt-1 pt-1" style={{ borderColor: BD }}>
                                            <button
                                                onClick={handleLogout}
                                                className="flex items-center gap-2.5 px-4 py-2.5 text-sm w-full hover:bg-white/5"
                                                style={{ color: AC }}
                                            >
                                                <LogOut className="w-4 h-4" /> Sign Out
                                            </button>
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </header>
                <main className="flex-1 p-4 sm:p-6 lg:p-8 bg-white text-gray-900">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}
