import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAuthStore } from '@/store/authStore'

export function RoleGuard({ allowedRoles = [], children }) {
  const { user, isAuthenticated } = useAuthStore()

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  if (allowedRoles.length > 0 && !allowedRoles.includes(user?.role)) {
    return <Navigate to="/unauthorized" replace />
  }

  return children
}

export function PermissionGate({ permission, children, fallback = null }) {
  const { user } = useAuthStore()

  const hasPermission =
    user?.permissions?.includes('*') ||
    (permission && user?.permissions?.includes(permission))

  if (!hasPermission) return fallback

  return children
}
