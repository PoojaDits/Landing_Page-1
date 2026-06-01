import React from 'react'
import { Outlet } from 'react-router-dom'
import DashboardLayout from './DashboardLayout'
import { FaTachometerAlt, FaChartLine, FaBoxes, FaUsers } from 'react-icons/fa'

interface AdminLayoutProps {
  handleLogout: () => void
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ handleLogout }) => {
  const links = [
    { label: 'Dashboard', path: '/admin/dashboard', icon: <FaTachometerAlt /> },
    { label: 'Analytics', path: '/admin/analytics', icon: <FaChartLine /> },
    { label: 'Products', path: '/admin/products', icon: <FaBoxes /> },
    { label: 'Users', path: '/admin/users', icon: <FaUsers /> },
  ]

  return (
    <DashboardLayout title="Admin Dashboard" links={links} handleLogout={handleLogout}>
      <Outlet />
    </DashboardLayout>
  )
}

export default AdminLayout
