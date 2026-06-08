import React, { useEffect, ReactNode } from 'react'
import {
  Routes,
  Route,
  useParams,
  useLocation,
  Navigate,
  Outlet,
  useNavigate,
} from 'react-router-dom'
import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import Categories from '@/components/Categories'
import ProductGrid from '@/components/ProductGrid'
import Cart from '@/components/Cart'
import Footer from '@/components/Footer'
import { Deals } from '@/components/Deals'
import Login from '@/pages/Login'
import Signup from '@/pages/Signup'
import Contact from '@/pages/Contact'
import ProductDetail from '@/pages/ProductDetail'
import {
  CustomerRoute,
  AdminRoute,
  SuperAdminRoute,
} from '@/components/PrivateRoute'
import CustomerLayout from '@/layouts/CustomerLayout'
import AdminLayout from '@/layouts/AdminLayout'
import SuperAdminLayout from '@/layouts/SuperAdminLayout'
import CustomerDashboard from '@/pages/dashboard/CustomerDashboard'
import AdminDashboard from '@/pages/dashboard/AdminDashboard'
import SuperAdminDashboard from '@/pages/dashboard/SuperAdminDashboard'
import AllStores from '@/pages/dashboard/AllStores'
import StoreDetails from '@/pages/dashboard/StoreDetails'
import AllUsers from '@/pages/dashboard/Users'
import PlaceholderPage from '@/pages/dashboard/PlaceholderPage'
import ProductsManagement from '@/pages/dashboard/ProductsManagement'
import AddProduct from '@/pages/dashboard/AddProduct'
import { Toaster } from 'react-hot-toast'
import {
  isLoggedIn,
  getDashboardPath,
  isImpersonating,
  getImpersonator,
  stopImpersonation,
} from '@/lib/role'
import { useCartStore } from '@/store/useCartStore'
import { useAuthStore } from '@/store/useAuthStore'
import { useProductStore } from '@/store/useProductStore'
import type { Category } from '@/types'

const ProductsPage: React.FC = () => {
  const { category } = useParams<{ category?: string }>()
  const setCategory = useProductStore((state) => state.setCategory)

  useEffect(() => {
    setCategory((category || 'All') as Category)
  }, [category, setCategory])

  return (
    <ProductGrid />
  )
}

function RoleRedirect(): ReactNode {
  return (
    <Navigate
      to={isLoggedIn() ? getDashboardPath() : '/login'}
      replace
    />
  )
}

const PublicLayout: React.FC = () => {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  )
}

const HomePage: React.FC = () => (
  <>
    <Hero />
    <Categories />
  </>
)

const ImpersonationBanner: React.FC = () => {
  const navigate = useNavigate()
  if (!isImpersonating()) return null
  const admin = getImpersonator()
  const handleStop = (): void => {
    stopImpersonation()
    navigate('/super-admin/dashboard', { replace: true })
  }
  return (
    <div className="bg-amber-500 text-black text-sm font-medium px-4 py-2 flex items-center justify-between sticky top-0 z-[100]">
      <span>
        🔒 You are impersonating as <strong>{admin?.name}</strong>. Actions are logged.
      </span>
      <button
        onClick={handleStop}
        className="bg-black text-white px-3 py-1 rounded-md text-xs font-bold hover:bg-gray-800"
      >
        Stop Impersonating
      </button>
    </div>
  )
}

export default function App(): ReactNode {
  const location = useLocation()
  const isCartOpen = useCartStore((state) => state.isCartOpen)
  const cartItems = useCartStore((state) => state.cartItems)
  const removeFromCart = useCartStore((state) => state.removeFromCart)
  const updateQuantity = useCartStore((state) => state.updateQuantity)
  const closeCart = useCartStore((state) => state.closeCart)
  const clearAuth = useAuthStore((state) => state.clearAuth)

  useEffect(() => {
    // Force auth check on route change if needed
    // The useAuthStore persist middleware handles the initial load
  }, [location])

  const handleLogout = (): void => {
    clearAuth()
  }

  return (
    <>
      <ImpersonationBanner />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        <Route path="/" element={<RoleRedirect />} />
        <Route path="/dashboard" element={<RoleRedirect />} />

        <Route element={<PublicLayout />}>
          <Route path="/home" element={<HomePage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/products/:category" element={<ProductsPage />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/deals" element={<Deals />} />
          <Route path="/contact" element={<Contact />} />
        </Route>

        <Route
          path="/customer"
          element={
            <CustomerRoute>
              <CustomerLayout
                handleLogout={handleLogout}
              />
            </CustomerRoute>
          }
        >
          <Route index element={<Navigate to="/customer/home" replace />} />
          <Route path="home" element={<HomePage />} />
          <Route path="products" element={<ProductsPage />} />
          <Route path="products/:category" element={<ProductsPage />} />
          <Route path="product/:id" element={<ProductDetail />} />
          <Route path="deals" element={<Deals />} />
          <Route path="contact" element={<Contact />} />
          <Route path="dashboard" element={<CustomerDashboard />} />
          <Route path="orders" element={<PlaceholderPage title="My Orders" />} />
          <Route path="wishlist" element={<PlaceholderPage title="My Wishlist" />} />
          <Route path="tracking" element={<PlaceholderPage title="Track Order" />} />
          <Route path="addresses" element={<PlaceholderPage title="Addresses" />} />
          <Route path="payments" element={<PlaceholderPage title="Payment Methods" />} />
          <Route path="notifications" element={<PlaceholderPage title="Notifications" />} />
          <Route path="settings" element={<PlaceholderPage title="Account Settings" />} />
        </Route>

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
          <Route path="products" element={<ProductsManagement />} />
          <Route path="products/new" element={<AddProduct />} />
          <Route path="categories" element={<PlaceholderPage title="Categories" />} />
          <Route path="orders" element={<PlaceholderPage title="Orders" />} />
          <Route path="shipping" element={<PlaceholderPage title="Shipping" />} />
          <Route path="reviews" element={<PlaceholderPage title="Reviews" />} />
          <Route path="messages" element={<PlaceholderPage title="Messages" />} />
          <Route path="customers" element={<PlaceholderPage title="Customers" />} />
          <Route path="settings" element={<PlaceholderPage title="Store Settings" />} />
        </Route>

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
          <Route path="stores/:storeId" element={<StoreDetails />} />
          <Route path="users" element={<AllUsers />} />
          <Route path="admins" element={<AllUsers />} />
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

        <Route
          path="*"
          element={
            isLoggedIn() ? (
              <Navigate to={getDashboardPath()} replace />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
      </Routes>

      {isCartOpen && (
        <Cart
          cartItems={cartItems}
          removeFromCart={removeFromCart}
          updateQuantity={updateQuantity}
          closeCart={closeCart}
        />
      )}
      <Toaster position="top-right" />
    </>
  )
}
