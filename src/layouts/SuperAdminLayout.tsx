import React from 'react'
import { Outlet } from 'react-router-dom'
import DashboardLayout from './DashboardLayout'
import { FaShieldAlt, FaLayerGroup, FaStore, FaUsers } from 'react-icons/fa'

interface SuperAdminLayoutProps {
  handleLogout: () => void
}

const SuperAdminLayout: React.FC<SuperAdminLayoutProps> = ({ handleLogout }) => {
  const links = [
    { label: 'Dashboard', path: '/super-admin/dashboard', icon: <FaShieldAlt /> },
    { label: 'Stores', path: '/super-admin/stores', icon: <FaStore /> },
    { label: 'Users', path: '/super-admin/admins', icon: <FaUsers /> },
    { label: 'Reports', path: '/super-admin/reports', icon: <FaLayerGroup /> },
  ]

  return (
    <DashboardLayout title="Super Admin" links={links} handleLogout={handleLogout}>
      <Outlet />
    </DashboardLayout>
  )
}

export default SuperAdminLayout
