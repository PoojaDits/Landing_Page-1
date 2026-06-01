import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios, { AxiosError } from 'axios'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'
import {
  isLoggedIn,
  storeLogin,
  getUserRole,
  DASHBOARD_PATHS,
} from '@/lib/role'
import type { User, FormErrors } from '@/types'

const API_URL = '/api'

interface LoginFormData {
  email: string
  password: string
}

export default function Login(): React.ReactNode {
  const navigate = useNavigate()
  const [formData, setFormData] = useState<LoginFormData>({
    email: '',
    password: '',
  })
  const [errors, setErrors] = useState<FormErrors>({})
  const [mainError, setMainError] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (isLoggedIn())
      navigate(DASHBOARD_PATHS[getUserRole()] || '/', {
        replace: true,
      })
  }, [navigate])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }))
  }

  const validateField = (name: string, value: string): string => {
    if (name === 'email') {
      if (!value) return 'Email is required'
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
        return 'Enter a valid email'
    }
    if (name === 'password') {
      if (!value) return 'Password is required'
      if (value.length < 6)
        return 'Password must be at least 6 characters'
    }
    return ''
  }

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>): void => {
    const { name, value } = e.target
    setErrors((prev) => ({
      ...prev,
      [name]: validateField(name, value),
    }))
  }

  const validateForm = (): boolean => {
    const errs: FormErrors = {}
    const emailErr = validateField('email', formData.email)
    const passErr = validateField('password', formData.password)
    if (emailErr) errs.email = emailErr
    if (passErr) errs.password = passErr
    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault()
    setMainError('')
    if (!validateForm()) return
    setLoading(true)
    try {
      const { data: users } = await axios.get(`${API_URL}/users`, {
        params: { email: formData.email, password: formData.password },
      })

      if (users.length === 0) {
        throw new Error('Invalid credentials')
      }

      const user = users[0] as User
      const { password: _, ...userData } = user

      storeLogin(userData, `json-token-${Date.now()}`)
      navigate(DASHBOARD_PATHS[userData.role] || '/')
    } catch (err) {
      const error = err as AxiosError<{ message: string }>
      setMainError(
        error.response?.data?.message ||
          (error as Error).message ||
          'Invalid credentials'
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <div
      style={{
        background:
          'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
      }}
      className="min-h-[80vh] flex items-center justify-center py-12 px-4"
    >
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white">Welcome Back</h1>
          <p className="text-gray-400 mt-2">Sign in with JSON Server</p>
        </div>
        {mainError && (
          <div
            className="mb-6 p-4 rounded-xl text-sm"
            style={{
              background: 'rgba(233,69,96,0.1)',
              border: '1px solid rgba(233,69,96,0.2)',
              color: '#e94560',
            }}
          >
            {mainError}
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <Label htmlFor="email" className="text-gray-300">
              Email
            </Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="you@example.com"
              value={formData.email}
              onChange={handleChange}
              onBlur={handleBlur}
              className={cn(
                'h-12 bg-white/5 border-gray-700 text-white placeholder:text-gray-500 focus-visible:ring-[#e94560]',
                errors.email && 'border-[#e94560]'
              )}
            />
            {errors.email && (
              <p className="text-[#e94560] text-sm mt-1">{errors.email}</p>
            )}
          </div>
          <div>
            <Label htmlFor="password" className="text-gray-300">
              Password
            </Label>
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
              onBlur={handleBlur}
              className={cn(
                'h-12 bg-white/5 border-gray-700 text-white placeholder:text-gray-500 focus-visible:ring-[#e94560]',
                errors.password && 'border-[#e94560]'
              )}
            />
            {errors.password && (
              <p className="text-[#e94560] text-sm mt-1">
                {errors.password}
              </p>
            )}
          </div>
          <Button
            type="submit"
            className="w-full h-12 text-base font-semibold text-white border-0"
            disabled={loading}
            style={{
              background: 'linear-gradient(135deg, #e94560, #f85c76)',
              boxShadow: '0 4px 20px rgba(233,69,96,0.4)',
            }}
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </Button>
        </form>
        <div className="mt-6 text-center text-sm text-gray-400">
          Don't have an account?{' '}
          <Link to="/signup" className="font-medium" style={{ color: '#e94560' }}>
            Sign up
          </Link>
        </div>
      </div>
    </div>
  )
}
