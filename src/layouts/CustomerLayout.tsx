import React from 'react'
import { Outlet } from 'react-router-dom'
import DashboardLayout from './DashboardLayout'
import { FaHome, FaShoppingBag, FaTags, FaUserCircle, FaTachometerAlt } from 'react-icons/fa'

interface CustomerLayoutProps {
  totalItems?: number
  toggleCart?: () => void
  handleLogout: () => void
}

const CustomerLayout: React.FC<CustomerLayoutProps> = ({ handleLogout }) => {
  const links = [
    { label: 'Home', path: '/customer/home', icon: <FaHome /> },
    { label: 'Dashboard', path: '/customer/dashboard', icon: <FaTachometerAlt /> },
    { label: 'Products', path: '/customer/products', icon: <FaShoppingBag /> },
    { label: 'Deals', path: '/customer/deals', icon: <FaTags /> },
    { label: 'Profile', path: '/customer/profile', icon: <FaUserCircle /> },
  ]

  return (
    <DashboardLayout title="Customer Dashboard" links={links} handleLogout={handleLogout}>
      <Outlet />
    </DashboardLayout>
  )
}

export default CustomerLayout
