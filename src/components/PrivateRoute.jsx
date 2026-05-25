import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { isLoggedIn, getUserRole, DASHBOARD_PATHS } from '@/lib/role';

export default function PrivateRoute({ children, allowedRoles }) {
  const location = useLocation();

  if (!isLoggedIn()) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (allowedRoles && allowedRoles.length > 0) {
    const userRole = getUserRole();
    if (!allowedRoles.includes(userRole)) {
      return <Navigate to={DASHBOARD_PATHS[userRole] || '/'} replace />;
    }
  }

  return children;
}

export function CustomerRoute({ children }) {
  return <PrivateRoute allowedRoles={['customer']}>{children}</PrivateRoute>;
}

export function AdminRoute({ children }) {
  return <PrivateRoute allowedRoles={['admin', 'super_admin']}>{children}</PrivateRoute>;
}

export function SuperAdminRoute({ children }) {
  return <PrivateRoute allowedRoles={['super_admin']}>{children}</PrivateRoute>;
}