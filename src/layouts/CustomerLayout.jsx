import { useState } from 'react';
import { Link, useLocation, Outlet } from 'react-router-dom';
import { getStoredUser } from '@/lib/role';
import { cn } from '@/lib/utils';
import {
    LayoutDashboard, ShoppingBag, Heart, MapPin, Settings, LogOut,
    Menu, X, Package, Bell, CreditCard, Home, Tag, Phone, User,
    ChevronDown,
} from 'lucide-react';

const BG = 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)';
const SB = 'rgba(26, 26, 46, 0.95)';
const HB = 'rgba(26, 26, 46, 0.9)';
const BD = 'rgba(255,255,255,0.06)';
const AC = '#e94560';
const ACL = '#f85c76';
const MUTED = 'rgba(255,255,255,0.3)';

export default function CustomerLayout({ totalItems = 0, toggleCart, handleLogout }) {
    const user = getStoredUser();
    const location = useLocation();
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [userMenuOpen, setUserMenuOpen] = useState(false);

    const isActive = (href, exact = false) =>
        exact ? location.pathname === href : location.pathname.startsWith(href);

    const sections = [
        {
            label: 'Store',
            items: [
                { icon: Home,        label: 'Home',     href: '/customer/home',     exact: true },
                { icon: ShoppingBag, label: 'Products', href: '/customer/products' },
                { icon: Tag,         label: 'Deals',    href: '/customer/deals' },
                { icon: Phone,       label: 'Contact',  href: '/customer/contact' },
            ],
        },
        {
            label: 'Dashboard',
            items: [
               // { icon: LayoutDashboard, label: 'Dashboard',   href: '/customer/dashboard', exact: true },
                { icon: ShoppingBag,     label: 'My Orders',   href: '/customer/orders' },
                { icon: Heart,           label: 'Wishlist',    href: '/customer/wishlist' },
                { icon: Package,         label: 'Track Order', href: '/customer/tracking' },
            ],
        },
        {
            label: 'Account',
            items: [
                { icon: MapPin,     label: 'Addresses',     href: '/customer/addresses' },
                { icon: CreditCard, label: 'Payments',      href: '/customer/payments' },
                { icon: Bell,       label: 'Notifications', href: '/customer/notifications' },
                { icon: Settings,   label: 'Settings',      href: '/customer/settings' },
            ],
        },
    ];

    return (
        <div className="min-h-screen flex" style={{ background: BG }}>
            {sidebarOpen && <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />}

           
            <aside className={cn(
                'fixed top-0 left-0 z-50 h-full w-60 flex flex-col shrink-0 transition-transform duration-300 lg:translate-x-0 lg:relative',
                sidebarOpen ? 'translate-x-0' : '-translate-x-full'
            )} style={{ background: SB, borderRight: `1px solid ${BD}` }}>
                <div className="flex items-center justify-between h-14 px-4 border-b" style={{ borderColor: BD }}>
                    <Link to="/customer/home" className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-lg flex items-center justify-center text-white font-bold text-xs"
                            style={{ background: `linear-gradient(135deg, ${AC}, ${ACL})` }}>S</div>
                        <span className="font-bold text-sm text-white">ShopDash</span>
                    </Link>
                    <button onClick={() => setSidebarOpen(false)} className="lg:hidden p-1 rounded-lg text-gray-400 hover:text-white hover:bg-white/5">
                        <X className="w-4 h-4" />
                    </button>
                </div>

                <nav className="flex-1 overflow-y-auto py-2 px-2 space-y-5">
                    {sections.map(sec => (
                        <div key={sec.label}>
                            <h3 className="text-[10px] font-semibold uppercase tracking-wider mb-1 px-2" style={{ color: MUTED }}>{sec.label}</h3>
                            <ul className="space-y-0.5">
                                {sec.items.map(item => {
                                    const Icon = item.icon;
                                    const active = isActive(item.href, item.exact);
                                    return (
                                        <li key={item.label + item.href}>
                                            <Link to={item.href} onClick={() => setSidebarOpen(false)} className={cn(
                                                'flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200',
                                                active ? 'text-white' : 'text-gray-400 hover:text-white hover:bg-white/5'
                                            )} style={active ? { background: 'rgba(233, 69, 96, 0.15)' } : {}}>
                                                <Icon className="w-4 h-4" style={{ color: active ? AC : MUTED }} />
                                                {item.label}
                                            </Link>
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>
                    ))}
                </nav>

                
                <div className="border-t p-2 space-y-0.5" style={{ borderColor: BD }}>
                    <Link to="/customer/settings" className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-medium text-gray-400 hover:text-white hover:bg-white/5 transition-all">
                        <User className="w-4 h-4" style={{ color: MUTED }} /> Profile
                    </Link>
                    {/* <button onClick={handleLogout} className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-medium w-full hover:bg-white/5 transition-all"
                        style={{ color: AC }}>
                        <LogOut className="w-4 h-4" /> Sign Out
                    </button> */}
                </div>
            </aside>

            
            <div className="flex-1 flex flex-col min-w-0" style={{ background: BG }}>
                <header className="sticky top-0 z-30 h-14 flex items-center justify-between px-4 sm:px-6 shrink-0 border-b"
                    style={{ background: HB, borderColor: BD, backdropFilter: 'blur(12px)' }}>
                    <div className="flex items-center gap-3">
                        <button onClick={() => setSidebarOpen(true)} className="lg:hidden p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/5">
                            <Menu className="w-5 h-5" />
                        </button>
                        <div>
                            <h1 className="text-base font-semibold text-white capitalize">
                                {location.pathname.split('/').pop()?.replace(/-/g, ' ') || 'Dashboard'}
                            </h1>
                            <p className="text-[11px]" style={{ color: 'rgba(255,255,255,0.4)' }}>Welcome, {user?.firstName || 'Customer'}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <Link to="/customer/home" className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/5" title="Home"><Home className="w-4 h-4" /></Link>
                        <button onClick={toggleCart} className="relative p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/5" title="Cart">
                            <ShoppingBag className="w-4 h-4" />
                            {totalItems > 0 && (
                                <span className="absolute -top-0.5 -right-0.5 min-w-[16px] h-4 px-1 rounded-full text-[10px] font-bold text-white flex items-center justify-center"
                                    style={{ background: AC }}>{totalItems}</span>
                            )}
                        </button>
                        <button className="relative p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/5">
                            <Bell className="w-4 h-4" />
                            <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full ring-2" style={{ background: AC, borderColor: '#1a1a2e' }} />
                        </button>
                        <div className="relative">
                            <button onClick={() => setUserMenuOpen(!userMenuOpen)} className="flex items-center gap-2 p-1 rounded-lg hover:bg-white/5">
                                <div className="w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-semibold"
                                    style={{ background: `linear-gradient(135deg, ${AC}, ${ACL})` }}>
                                    {user?.firstName?.charAt(0)?.toUpperCase() || 'C'}
                                </div>
                                <ChevronDown className="w-3.5 h-3.5 text-gray-400 hidden sm:block" />
                            </button>
                            {userMenuOpen && (
                                <>
                                    <div className="fixed inset-0 z-10" onClick={() => setUserMenuOpen(false)} />
                                    <div className="absolute right-0 top-full mt-2 w-48 rounded-xl shadow-xl z-20 py-1.5 border"
                                        style={{ background: '#16213e', borderColor: 'rgba(255,255,255,0.08)' }}>
                                        <div className="px-4 py-2.5 border-b" style={{ borderColor: BD }}>
                                            <p className="text-sm font-medium text-white">{user?.firstName} {user?.lastName}</p>
                                            <p className="text-xs text-gray-400">{user?.email}</p>
                                        </div>
                                        <Link to="/customer/settings" onClick={() => setUserMenuOpen(false)}
                                            className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-gray-300 hover:bg-white/5"><Settings className="w-4 h-4" /> Settings</Link>
                                        <div className="border-t mt-1 pt-1" style={{ borderColor: BD }}>
                                            <button onClick={handleLogout} className="flex items-center gap-2.5 px-4 py-2.5 text-sm w-full hover:bg-white/5"
                                                style={{ color: AC }}><LogOut className="w-4 h-4" /> Sign Out</button>
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </header>

                <main className="flex-1 text-gray-100 overflow-x-hidden"><Outlet /></main>
            </div>
        </div>
    );
}
