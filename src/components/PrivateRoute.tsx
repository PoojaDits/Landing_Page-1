import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import {
  isLoggedIn,
  getUserRole,
  DASHBOARD_PATHS,
  ROLES,
} from '@/lib/role'
import type { PrivateRouteProps, RoleRouteProps } from '@/types'

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

export function CustomerRoute({ children }: RoleRouteProps): React.ReactNode {
  return (
    <PrivateRoute allowedRoles={[ROLES.CUSTOMER]}>
      {children}
    </PrivateRoute>
  )
}

export function AdminRoute({ children }: RoleRouteProps): React.ReactNode {
  return (
    <PrivateRoute allowedRoles={[ROLES.ADMIN, ROLES.SUPER_ADMIN]}>
      {children}
    </PrivateRoute>
  )
}

export function SuperAdminRoute({
  children,
}: RoleRouteProps): React.ReactNode {
  return (
    <PrivateRoute allowedRoles={[ROLES.SUPER_ADMIN]}>
      {children}
    </PrivateRoute>
  )
}
