import type { User, Role } from '@/types'

export const ROLES = {
  CUSTOMER: 'customer' as const,
  ADMIN: 'admin' as const,
  SUPER_ADMIN: 'super_admin' as const,
} as const

export const ROLE_LABELS: Record<Role, string> = {
  [ROLES.CUSTOMER]: 'Customer',
  [ROLES.ADMIN]: 'Admin',
  [ROLES.SUPER_ADMIN]: 'Super Admin',
} as const

export const DASHBOARD_PATHS: Record<Role, string> = {
  [ROLES.CUSTOMER]: '/customer/home',
  [ROLES.ADMIN]: '/admin/dashboard',
  [ROLES.SUPER_ADMIN]: '/super-admin/dashboard',
} as const

export function getStoredUser(): User | null {
  try {
    const user = localStorage.getItem('myUser')
    return user ? JSON.parse(user) : null
  } catch {
    return null
  }
}

export function getUserRole(): Role {
  const user = getStoredUser()
  return (user?.role || ROLES.CUSTOMER) as Role
}

export function isLoggedIn(): boolean {
  return !!localStorage.getItem('myToken') && !!getStoredUser()
}

export function storeLogin(
  userData: User,
  token: string,
  preserveImpersonator = false,
): void {
  localStorage.setItem('myToken', token)
  localStorage.setItem('myUser', JSON.stringify(userData))
  if (!preserveImpersonator) {
    localStorage.removeItem('impersonator')
  }
}

export function clearAuth(): void {
  localStorage.removeItem('myToken')
  localStorage.removeItem('myUser')
  localStorage.removeItem('impersonator')
}

export function hasRole(...roles: Role[]): boolean {
  return roles.includes(getUserRole())
}

export function getDashboardPath(): string {
  return DASHBOARD_PATHS[getUserRole()] || '/'
}

export function startImpersonation(targetUser: User): void {
  const currentUser = getStoredUser()
  if (!currentUser || currentUser.role !== ROLES.SUPER_ADMIN) {
    throw new Error('Only Super Admin can impersonate')
  }

  localStorage.setItem('impersonator', JSON.stringify(currentUser))
  storeLogin(targetUser, `impersonate-token-${Date.now()}`, true)
}

export function stopImpersonation(): boolean {
  const original = localStorage.getItem('impersonator')
  if (original) {
    const admin = JSON.parse(original) as User
    localStorage.removeItem('impersonator')
    storeLogin(admin, `restored-token-${Date.now()}`)
    return true
  }
  return false
}

export function isImpersonating(): boolean {
  return !!localStorage.getItem('impersonator')
}

export function getImpersonator(): User | null {
  try {
    const impersonator = localStorage.getItem('impersonator')
    return impersonator ? JSON.parse(impersonator) : null
  } catch {
    return null
  }
}
