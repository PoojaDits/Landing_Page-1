import type { FormErrors } from '@/types'

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export interface LoginFormData {
  email: string
  password: string
}

export interface SignupFormData {
  firstName: string
  lastName: string
  email: string
  password: string
}

export function validateLoginField(name: string, value: string): string {
  if (name === 'email') {
    if (!value) return 'Email is required'
    if (!emailRegex.test(value)) return 'Enter a valid email'
  }
  if (name === 'password') {
    if (!value) return 'Password is required'
    if (value.length < 6) return 'Password must be at least 6 characters'
  }
  return ''
}

export function validateLoginForm(formData: LoginFormData): FormErrors {
  const newErrors: FormErrors = {}

  if (!formData.email) newErrors.email = 'Email is required'
  else if (!emailRegex.test(formData.email))
    newErrors.email = 'Enter a valid email'

  if (!formData.password) newErrors.password = 'Password is required'
  else if (formData.password.length < 6)
    newErrors.password = 'Password must be at least 6 characters'

  return newErrors
}

export function validateSignupField(name: string, value: string): string {
  if (name === 'firstName') {
    if (!value.trim()) return 'First Name is required'
    if (!/^[A-Za-z ]+$/.test(value)) return 'Only letters and spaces allowed'
  }
  if (name === 'lastName') {
    if (!value.trim()) return 'Last Name is required'
    if (!/^[A-Za-z ]+$/.test(value)) return 'Only letters and spaces allowed'
  }
  if (name === 'email') {
    if (!value) return 'Email is required'
    if (!emailRegex.test(value)) return 'Enter a valid email'
  }
  if (name === 'password') {
    if (!value) return 'Password is required'
    if (value.length < 6) return 'Password must be at least 6 characters'
  }
  return ''
}

export function validateSignupForm(
  formData: SignupFormData,
): FormErrors {
  const newErrors: FormErrors = {}

  if (!formData.firstName.trim()) newErrors.firstName = 'First Name is required'
  else if (!/^[A-Za-z ]+$/.test(formData.firstName))
    newErrors.firstName = 'Only letters and spaces allowed'

  if (!formData.lastName.trim()) newErrors.lastName = 'Last Name is required'
  else if (!/^[A-Za-z ]+$/.test(formData.lastName))
    newErrors.lastName = 'Only letters and spaces allowed'

  if (!formData.email) newErrors.email = 'Email is required'
  else if (!emailRegex.test(formData.email))
    newErrors.email = 'Enter a valid email'

  if (!formData.password) newErrors.password = 'Password is required'
  else if (formData.password.length < 6)
    newErrors.password = 'Password must be at least 6 characters'

  return newErrors
}
