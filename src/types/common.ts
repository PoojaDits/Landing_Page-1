
export type Role = 'customer' | 'admin' | 'super_admin'

export interface RoleConfig {
  [key: string]: string
}

export interface DashboardPathConfig {
  [key: string]: string
}

export interface ApiErrorResponse {
  message: string
  code?: string
  status?: number
}

export interface PaginationParams {
  page: number
  limit: number
}

export interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: ApiErrorResponse
}
