import React from 'react'
import { useSignupForm } from '@/hooks/useAppHooks'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'
import { Link, useNavigate } from 'react-router-dom'
import { isLoggedIn, getDashboardPath } from '@/lib/role'
import { useEffect } from 'react'

export default function Signup(): React.ReactNode {
  const navigate = useNavigate()
  const { formData, errors, mainError, loading, handleChange, handleBlur, handleSubmit } = useSignupForm()

  useEffect(() => {
    if (isLoggedIn()) navigate(getDashboardPath(), { replace: true })
  }, [navigate])

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
          <h1 className="text-3xl font-bold text-white">Create Account</h1>
          <p className="text-gray-400 mt-2">Join ShopWave today</p>
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
            <Label htmlFor="firstName" className="text-gray-300">
              First Name
            </Label>
            <Input
              id="firstName"
              name="firstName"
              type="text"
              placeholder="John"

              value={formData.firstName || ''}
              onChange={handleChange}
              onBlur={handleBlur}
              className={cn(
                'h-12 bg-white/5 border-gray-700 text-white placeholder:text-gray-500 focus-visible:ring-[#e94560]',
                errors.firstName && 'border-[#e94560]'
              )}
            />
            {errors.firstName && (
              <p className="text-[#e94560] text-sm mt-1">{errors.firstName}</p>
            )}
          </div>

          <div>
            <Label htmlFor="lastName" className="text-gray-300">
              Last Name
            </Label>
            <Input
              id="lastName"
              name="lastName"
              type="text"
              placeholder="Doe"

              value={formData.lastName || ''}
              onChange={handleChange}
              onBlur={handleBlur}
              className={cn(
                'h-12 bg-white/5 border-gray-700 text-white placeholder:text-gray-500 focus-visible:ring-[#e94560]',
                errors.lastName && 'border-[#e94560]'
              )}
            />
            {errors.lastName && (
              <p className="text-[#e94560] text-sm mt-1">{errors.lastName}</p>
            )}
          </div>

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
              <p className="text-[#e94560] text-sm mt-1">{errors.password}</p>
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
            {loading ? 'Creating Account...' : 'Sign Up'}
          </Button>
        </form>
        <div className="mt-6 text-center text-sm text-gray-400">
          Already have an account?{' '}
          <Link to="/login" className="font-medium" style={{ color: '#e94560' }}>
            Sign in
          </Link>
        </div>
      </div>
    </div>
  )
}
