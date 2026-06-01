

import type { Role } from './common'

export interface User {
  id: string
  email: string
  name?: string
  firstName?: string
  lastName?: string
  password?: string
  role: Role
  createdAt?: string
  updatedAt?: string
}

export interface AuthResponse {
  user: User
  token: string
}

export interface FormErrors {
  [key: string]: string
}
