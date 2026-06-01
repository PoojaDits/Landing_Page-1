import React, { useState, useEffect, ReactNode } from 'react'
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
import { Toaster } from 'react-hot-toast'
import {
  isLoggedIn,
  getDashboardPath,
  getStoredUser,
  clearAuth,
  isImpersonating,
  getImpersonator,
  stopImpersonation,
} from '@/lib/role'
import type { Category, CartProduct, User } from '@/types'

interface ProductsPageProps {
  selectedCategory?: Category
  setSelectedCategory: (category: Category) => void
  addToCart: (product: CartProduct) => void
}

const ProductsPage: React.FC<ProductsPageProps> = ({
  selectedCategory,
  setSelectedCategory,
  addToCart,
}) => {
  const { category } = useParams<{ category?: string }>()

  useEffect(() => {
    setSelectedCategory((category || 'All') as Category)
  }, [category, setSelectedCategory])

  const activeCategory =
    ((category || selectedCategory || 'All') as Category) || 'All'

  return (
    <ProductGrid
      selectedCategory={activeCategory}
      setSelectedCategory={setSelectedCategory}
      addToCart={addToCart}
    />
  )
}

/** Send the user to their landing page (home for customer, dashboard for admins). */
function RoleRedirect(): ReactNode {
  return (
    <Navigate
      to={isLoggedIn() ? getDashboardPath() : '/login'}
      replace
    />
  )
}

interface PublicLayoutProps {
  totalItems: number
  toggleCart: () => void
  loggedIn: boolean
  user: User | null
}

/** Public shop shell – Navbar + content + Footer (no sidebar). */
const PublicLayout: React.FC<PublicLayoutProps> = ({
  totalItems,
  toggleCart,
  loggedIn,
  user,
}) => (
  <>
    <Navbar
      totalItems={totalItems}
      toggleCart={toggleCart}
      isLoggedIn={loggedIn}
      user={user}
    />
    <Outlet />
    <Footer />
  </>
)

interface HomePageProps {
  selectedCategory?: Category
  setSelectedCategory: (category: Category) => void
}

const HomePage: React.FC<HomePageProps> = ({
  setSelectedCategory,
}) => (
  <>
    <Hero />
    <Categories
      setSelectedCategory={setSelectedCategory}
    />
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
  const [cartItems, setCartItems] = useState<CartProduct[]>([])
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<Category>('All')
  const location = useLocation()
  const [user, setUser] = useState<User | null>(getStoredUser())
  const [loggedIn, setLoggedIn] = useState(isLoggedIn())

  useEffect(() => {
    setLoggedIn(isLoggedIn())
    setUser(getStoredUser())
  }, [location])

  const addToCart = (product: CartProduct): void => {
    setCartItems((prev) => {
      const exists = prev.find((i) => i.id === product.id)
      if (exists)
        return prev.map((i) =>
          i.id === product.id
            ? { ...i, quantity: i.quantity + 1 }
            : i
        )
      return [...prev, { ...product, quantity: 1 }]
    })
  }

  const removeFromCart = (id: number): void =>
    setCartItems((prev) => prev.filter((i) => i.id !== id))

  const updateQuantity = (id: number, qty: number): void => {
    if (qty < 1) {
      removeFromCart(id)
      return
    }
    setCartItems((prev) =>
      prev.map((i) => (i.id === id ? { ...i, quantity: qty } : i))
    )
  }

  const totalItems = cartItems.reduce((s, i) => s + i.quantity, 0)

  const handleLogout = (): void => {
    clearAuth()
    setLoggedIn(false)
    setUser(null)
  }

  const toggleCart = (): void => setIsCartOpen((prev) => !prev)

  return (
    <>
      <ImpersonationBanner />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        <Route path="/" element={<RoleRedirect />} />
        <Route path="/dashboard" element={<RoleRedirect />} />

        <Route
          element={
            <PublicLayout
              totalItems={totalItems}
              toggleCart={toggleCart}
              loggedIn={loggedIn}
              user={user}
            />
          }
        >
          <Route
            path="/home"
            element={
              <HomePage
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
              />
            }
          />
          <Route
            path="/products"
            element={
              <ProductsPage
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
                addToCart={addToCart}
              />
            }
          />
          <Route
            path="/products/:category"
            element={
              <ProductsPage
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
                addToCart={addToCart}
              />
            }
          />
          <Route
            path="/product/:id"
            element={<ProductDetail />}
          />
          <Route path="/deals" element={<Deals />} />
          <Route path="/contact" element={<Contact />} />
        </Route>

        <Route
          path="/customer"
          element={
            <CustomerRoute>
              <CustomerLayout
                totalItems={totalItems}
                toggleCart={toggleCart}
                handleLogout={handleLogout}
              />
            </CustomerRoute>
          }
        >
          <Route index element={<Navigate to="/customer/home" replace />} />

          <Route
            path="home"
            element={
              <HomePage
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
              />
            }
          />
          <Route
            path="products"
            element={
              <ProductsPage
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
                addToCart={addToCart}
              />
            }
          />
          <Route
            path="products/:category"
            element={
              <ProductsPage
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
                addToCart={addToCart}
              />
            }
          />
          <Route
            path="product/:id"
            element={<ProductDetail />}
          />
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
          closeCart={() => setIsCartOpen(false)}
        />
      )}
      <Toaster position="top-right" />
    </>
  )
}
