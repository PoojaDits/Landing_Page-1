import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import {
  isLoggedIn,
  getUserRole,
  DASHBOARD_PATHS,
  ROLES,
} from '@/lib/role'
import type { Role } from '@/types'

interface PrivateRouteProps {
  children: React.ReactNode
  allowedRoles?: Role[]
}

export default function PrivateRoute({
  children,
  allowedRoles,
}: PrivateRouteProps): React.ReactNode {
  const location = useLocation()

  if (!isLoggedIn()) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  if (allowedRoles && allowedRoles.length > 0) {
    const userRole = getUserRole()
    if (!allowedRoles.includes(userRole)) {
      return (
        <Navigate
          to={DASHBOARD_PATHS[userRole] || '/login'}
          replace
        />
      )
    }
  }

  return children
}

interface CustomerRouteProps {
  children: React.ReactNode
}

export function CustomerRoute({ children }: CustomerRouteProps): React.ReactNode {
  return (
    <PrivateRoute allowedRoles={[ROLES.CUSTOMER]}>
      {children}
    </PrivateRoute>
  )
}

interface AdminRouteProps {
  children: React.ReactNode
}

export function AdminRoute({ children }: AdminRouteProps): React.ReactNode {
  return (
    <PrivateRoute allowedRoles={[ROLES.ADMIN, ROLES.SUPER_ADMIN]}>
      {children}
    </PrivateRoute>
  )
}

interface SuperAdminRouteProps {
  children: React.ReactNode
}

export function SuperAdminRoute({
  children,
}: SuperAdminRouteProps): React.ReactNode {
  return (
    <PrivateRoute allowedRoles={[ROLES.SUPER_ADMIN]}>
      {children}
    </PrivateRoute>
  )
}
