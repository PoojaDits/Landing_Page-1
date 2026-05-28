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
import AllStores from '@/pages/dashboard/AllStores';
import PlaceholderPage from '@/pages/dashboard/PlaceholderPage';
import { Toaster } from 'react-hot-toast';
import {
  isLoggedIn,
  getDashboardPath,
  getStoredUser,
  clearAuth,
} from '@/lib/role';

const ProductsPage = ({ selectedCategory, setSelectedCategory, addToCart }) => {
  const { category } = useParams();

  React.useEffect(() => {
    setSelectedCategory(category || 'All');
  }, [category, setSelectedCategory]);

  const activeCategory = category || selectedCategory || 'All';

  return (
    <ProductGrid
      selectedCategory={activeCategory}
      setSelectedCategory={setSelectedCategory}
      addToCart={addToCart}
    />
  );
};

/** Send the user to their landing page (home for customer, dashboard for admins). */
function RoleRedirect() {
  return <Navigate to={isLoggedIn() ? getDashboardPath() : '/login'} replace />;
}

/** Public shop shell – Navbar + content + Footer (no sidebar). */
const PublicLayout = ({ totalItems, toggleCart, loggedIn, user, handleLogout }) => (
  <>
    <Navbar
      totalItems={totalItems}
      toggleCart={toggleCart}
      isLoggedIn={loggedIn}
      user={user}
      onLogout={handleLogout}
    />
    <Outlet />
    <Footer />
  </>
);

/** Home page (Hero + Categories) – shared by public AND customer layout. */
const HomePage = ({ selectedCategory, setSelectedCategory }) => (
  <>
    <Hero />
    <Categories selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />
  </>
);

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
  const toggleCart = () => setIsCartOpen(prev => !prev);

  return (
    <>
      <Routes>
        {/* ---------- AUTH ---------- */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* ---------- ROOT → login or landing page ---------- */}
        <Route path="/" element={<RoleRedirect />} />
        <Route path="/dashboard" element={<RoleRedirect />} />

        {/* ---------- PUBLIC SHOP (Navbar + Footer) ---------- */}
        <Route
          element={
            <PublicLayout
              totalItems={totalItems}
              toggleCart={toggleCart}
              loggedIn={loggedIn}
              user={user}
              handleLogout={handleLogout}
            />
          }
        >
          <Route path="/home" element={<HomePage selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />} />
          <Route path="/products" element={<ProductsPage selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} addToCart={addToCart} />} />
          <Route path="/products/:category" element={<ProductsPage selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} addToCart={addToCart} />} />
          <Route path="/product/:id" element={<ProductDetail addToCart={addToCart} />} />
          <Route path="/deals" element={<Deals />} />
          <Route path="/contact" element={<Contact />} />
        </Route>

        {/* ---------- CUSTOMER (sidebar layout) ---------- */}
        <Route
          path="/customer"
          element={
            <CustomerRoute>
              <CustomerLayout
                totalItems={totalItems}
                cartItems={cartItems}
                toggleCart={toggleCart}
                handleLogout={handleLogout}
              />
            </CustomerRoute>
          }
        >
          {/* Default landing for /customer → Home */}
          <Route index element={<Navigate to="/customer/home" replace />} />

          {/* Store pages rendered INSIDE the customer layout */}
          <Route path="home" element={<HomePage selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />} />
          <Route path="products" element={<ProductsPage selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} addToCart={addToCart} />} />
          <Route path="products/:category" element={<ProductsPage selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} addToCart={addToCart} />} />
          <Route path="product/:id" element={<ProductDetail addToCart={addToCart} />} />
          <Route path="deals" element={<Deals />} />
          <Route path="contact" element={<Contact />} />

          {/* Dashboard pages */}
          <Route path="dashboard" element={<CustomerDashboard />} />
          <Route path="orders" element={<PlaceholderPage title="My Orders" />} />
          <Route path="wishlist" element={<PlaceholderPage title="My Wishlist" />} />
          <Route path="tracking" element={<PlaceholderPage title="Track Order" />} />
          <Route path="addresses" element={<PlaceholderPage title="Addresses" />} />
          <Route path="payments" element={<PlaceholderPage title="Payment Methods" />} />
          <Route path="notifications" element={<PlaceholderPage title="Notifications" />} />
          <Route path="settings" element={<PlaceholderPage title="Account Settings" />} />
        </Route>

        {/* ---------- ADMIN ---------- */}
        <Route
          path="/admin"
          element={
            <AdminRoute>
              <AdminLayout handleLogout={handleLogout} />
            </AdminRoute>
          }
        >
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

        {/* ---------- SUPER ADMIN ---------- */}
        <Route
          path="/super-admin"
          element={
            <SuperAdminRoute>
              <SuperAdminLayout handleLogout={handleLogout} />
            </SuperAdminRoute>
          }
        >
          <Route index element={<Navigate to="/super-admin/dashboard" replace />} />
          <Route path="dashboard" element={<SuperAdminDashboard />} />
          <Route path="system" element={<PlaceholderPage title="System Health" />} />
          <Route path="analytics" element={<PlaceholderPage title="Platform Analytics" />} />
          <Route path="reports" element={<PlaceholderPage title="Global Reports" />} />
          <Route path="stores" element={<AllStores />} />
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

        {/* ---------- CATCH-ALL ---------- */}
        <Route
          path="*"
          element={
            isLoggedIn()
              ? <Navigate to={getDashboardPath()} replace />
              : <Navigate to="/login" replace />
          }
        />
      </Routes>

      {isCartOpen && (
        <Cart
          cartItems={cartItems}
          removeFromCart={removeFromCart}
          updateQuantity={updateQuantity}
          closeCart={() => setIsCartOpen(false)}
        />
      )}
      <Toaster position="top-right" />
    </>
  );
}
