import React, { useState } from 'react';
import { Routes, Route, useParams, useLocation, Navigate, Outlet } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Categories from '@/components/Categories';
import ProductGrid from '@/components/ProductGrid';
import Cart from '@/components/Cart';
import Footer from '@/components/Footer';
import { Deals } from '@/components/Deals';
import Login from '@/pages/Login';
import Signup from '@/pages/Signup';
import Contact from '@/pages/Contact';
import ProductDetail from '@/pages/ProductDetail';
import { CustomerRoute, AdminRoute, SuperAdminRoute } from '@/components/PrivateRoute';
import CustomerLayout from '@/layouts/CustomerLayout';
import AdminLayout from '@/layouts/AdminLayout';
import SuperAdminLayout from '@/layouts/SuperAdminLayout';
import CustomerDashboard from '@/pages/dashboard/CustomerDashboard';
import AdminDashboard from '@/pages/dashboard/AdminDashboard';
import SuperAdminDashboard from '@/pages/dashboard/SuperAdminDashboard';
import PlaceholderPage from '@/pages/dashboard/PlaceholderPage';
import { Toaster } from 'react-hot-toast';
import { isLoggedIn, getDashboardPath, getStoredUser, clearAuth, getUserRole } from '@/lib/role';

const ProductsPage = ({ selectedCategory, setSelectedCategory, addToCart }) => {
  const { category } = useParams();
  React.useEffect(() => { setSelectedCategory(category || 'All'); }, [category, setSelectedCategory]);
  return <ProductGrid category={category || selectedCategory || 'All'} addToCart={addToCart} />;
};

function RoleRedirect() {
  return <Navigate to={isLoggedIn() ? getDashboardPath() : '/login'} replace />;
}

const PublicLayout = ({ totalItems, toggleCart, loggedIn, user, handleLogout }) => (
  <>
    <Navbar totalItems={totalItems} toggleCart={toggleCart} isLoggedIn={loggedIn} user={user} onLogout={handleLogout} />
    <Outlet />
    <Footer />
  </>
);

const DynamicLayout = ({ loggedIn, user, totalItems, toggleCart, handleLogout, cartItems }) => {
  if (!loggedIn) {
    return <Navigate to="/login" replace />;
  }
  const role = user?.role || getUserRole();
  if (role === 'super-admin') return <SuperAdminLayout handleLogout={handleLogout} />;
  if (role === 'admin') return <AdminLayout handleLogout={handleLogout} />;
  return <CustomerLayout totalItems={totalItems} cartItems={cartItems} toggleCart={toggleCart} handleLogout={handleLogout} />;
};

export default function App() {
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const location = useLocation();
  const [user, setUser] = useState(getStoredUser);
  const [loggedIn, setLoggedIn] = useState(isLoggedIn);

  React.useEffect(() => {
    setLoggedIn(isLoggedIn());
    setUser(getStoredUser());
  }, [location]);

  const isDashboard = location.pathname.startsWith('/customer/') ||
    location.pathname.startsWith('/admin/') || location.pathname.startsWith('/super-admin/');

  const addToCart = (product) => {
    setCartItems(prev => {
      const exists = prev.find(i => i.id === product.id);
      if (exists) return prev.map(i => i.id === product.id ? { ...i, quantity: i.quantity + 1 } : i);
      return [...prev, { ...product, quantity: 1 }];
    });
  };
  const removeFromCart = (id) => setCartItems(prev => prev.filter(i => i.id !== id));
  const updateQuantity = (id, qty) => {
    if (qty < 1) { removeFromCart(id); return; }
    setCartItems(prev => prev.map(i => i.id === id ? { ...i, quantity: qty } : i));
  };
  const totalItems = cartItems.reduce((s, i) => s + i.quantity, 0);
  const handleLogout = () => { clearAuth(); setLoggedIn(false); setUser(null); };

  return (
    <>
      <Routes>
        <Route element={<DynamicLayout loggedIn={loggedIn} user={user} totalItems={totalItems} cartItems={cartItems} toggleCart={() => setIsCartOpen(prev => !prev)} handleLogout={handleLogout} />}>
          <Route path="/" element={<><Hero /><Categories selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} /></>} />
          <Route path="/products" element={<ProductsPage selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} addToCart={addToCart} />} />
          <Route path="/products/:category" element={<ProductsPage selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} addToCart={addToCart} />} />
          <Route path="/product/:id" element={<ProductDetail addToCart={addToCart} />} />
          <Route path="/deals" element={<Deals />} />
          <Route path="/contact" element={<Contact />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<RoleRedirect />} />

        {/* Customer */}
        <Route path="/customer" element={<CustomerRoute><CustomerLayout totalItems={totalItems} cartItems={cartItems} toggleCart={() => setIsCartOpen(prev => !prev)} handleLogout={handleLogout} /></CustomerRoute>}>
          <Route index element={<Navigate to="/customer/dashboard" replace />} />
          <Route path="dashboard" element={<CustomerDashboard />} />
          <Route path="orders" element={<PlaceholderPage title="My Orders" />} />
          <Route path="wishlist" element={<PlaceholderPage title="My Wishlist" />} />
          <Route path="tracking" element={<PlaceholderPage title="Track Order" />} />
          <Route path="addresses" element={<PlaceholderPage title="Addresses" />} />
          <Route path="payments" element={<PlaceholderPage title="Payment Methods" />} />
          <Route path="notifications" element={<PlaceholderPage title="Notifications" />} />
          <Route path="settings" element={<PlaceholderPage title="Account Settings" />} />
        </Route>

        {/* Admin */}
        <Route path="/admin" element={<AdminRoute><AdminLayout handleLogout={handleLogout} /></AdminRoute>}>
          <Route index element={<Navigate to="/admin/dashboard" replace />} />
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="analytics" element={<PlaceholderPage title="Analytics" />} />
          <Route path="reports" element={<PlaceholderPage title="Sales Reports" />} />
          <Route path="products" element={<PlaceholderPage title="Product Management" />} />
          <Route path="products/new" element={<PlaceholderPage title="Add Product" />} />
          <Route path="categories" element={<PlaceholderPage title="Categories" />} />
          <Route path="orders" element={<PlaceholderPage title="Orders" />} />
          <Route path="shipping" element={<PlaceholderPage title="Shipping" />} />
          <Route path="reviews" element={<PlaceholderPage title="Reviews" />} />
          <Route path="messages" element={<PlaceholderPage title="Messages" />} />
          <Route path="customers" element={<PlaceholderPage title="Customers" />} />
          <Route path="settings" element={<PlaceholderPage title="Store Settings" />} />
        </Route>

        {/* Super Admin */}
        <Route path="/super-admin" element={<SuperAdminRoute><SuperAdminLayout handleLogout={handleLogout} /></SuperAdminRoute>}>
          <Route index element={<Navigate to="/super-admin/dashboard" replace />} />
          <Route path="dashboard" element={<SuperAdminDashboard />} />
          <Route path="system" element={<PlaceholderPage title="System Health" />} />
          <Route path="analytics" element={<PlaceholderPage title="Platform Analytics" />} />
          <Route path="reports" element={<PlaceholderPage title="Global Reports" />} />
          <Route path="stores" element={<PlaceholderPage title="All Stores" />} />
          <Route path="stores/new" element={<PlaceholderPage title="Add Store" />} />
          <Route path="users" element={<PlaceholderPage title="All Users" />} />
          <Route path="admins" element={<PlaceholderPage title="Admins" />} />
          <Route path="admins/new" element={<PlaceholderPage title="Add Admin" />} />
          <Route path="roles" element={<PlaceholderPage title="Roles & Permissions" />} />
          <Route path="products" element={<PlaceholderPage title="All Products" />} />
          <Route path="orders" element={<PlaceholderPage title="All Orders" />} />
          <Route path="transactions" element={<PlaceholderPage title="Transactions" />} />
          <Route path="logistics" element={<PlaceholderPage title="Logistics" />} />
          <Route path="config" element={<PlaceholderPage title="Site Config" />} />
          <Route path="database" element={<PlaceholderPage title="Database" />} />
          <Route path="api" element={<PlaceholderPage title="API Management" />} />
          <Route path="audit" element={<PlaceholderPage title="Audit Logs" />} />
          <Route path="settings" element={<PlaceholderPage title="Global Settings" />} />
        </Route>

        <Route path="*" element={<div className="min-h-[60vh] flex items-center justify-center"><div className="text-center"><h1 className="text-6xl font-bold text-gray-300">404</h1><h2 className="text-xl font-semibold text-gray-700 mt-4">Page Not Found</h2></div></div>} />
      </Routes>
      {isCartOpen && <Cart cartItems={cartItems} removeFromCart={removeFromCart} updateQuantity={updateQuantity} closeCart={() => setIsCartOpen(false)} />}
      <Toaster position="top-right" />
    </>
  );
}