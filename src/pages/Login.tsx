import React, { useState, useEffect } from 'react'
import { useLogin } from '@/hooks/useAuthMutations'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'
import { Link, useNavigate } from 'react-router-dom'
import { isLoggedIn, getDashboardPath } from '@/lib/role'

export default function Login(): React.ReactNode {
  const [formData, setFormData] = useState({ email: '', password: '' })
  const { mutate, isPending, error } = useLogin()
  const navigate = useNavigate()

  useEffect(() => {
    if (isLoggedIn()) {
      navigate(getDashboardPath(), { replace: true })
    }
  }, [navigate])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    mutate(formData)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
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
          <p className="text-gray-400 mt-2">Sign in to your ShopWave account</p>
        </div>

        {error && (
          <div
            className="mb-6 p-4 rounded-xl text-sm"
            style={{
              background: 'rgba(233,69,96,0.1)',
              border: '1px solid rgba(233,69,96,0.2)',
              color: '#e94560',
            }}
          >
            {error.message}
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
              className={cn(
                'h-12 bg-white/5 border-gray-700 text-white placeholder:text-gray-500 focus-visible:ring-[#e94560]'
              )}
            />
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
              className={cn(
                'h-12 bg-white/5 border-gray-700 text-white placeholder:text-gray-500 focus-visible:ring-[#e94560]'
              )}
            />
          </div>

          <Button
            type="submit"
            className="w-full h-12 text-base font-semibold text-white border-0"
            disabled={isPending}
            style={{
              background: 'linear-gradient(135deg, #e94560, #f85c76)',
              boxShadow: '0 4px 20px rgba(233,69,96,0.4)',
            }}
          >
            {isPending ? 'Signing in...' : 'Sign In'}
          </Button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-400">
          Don't have an account?{' '}
          <Link to="/signup" className="font-medium" style={{ color: '#e94560' }}>
            Sign up
          </Link>
        </div>

        <div className="mt-4 text-center text-xs text-gray-500">
          Demo credentials: johndoe@example.com / Happyme31@ (Super Admin)
          <br />
          alice@example.com / Happyme31@ (Admin) • bob@example.com / Happyme31@ (Customer)
        </div>
      </div>
    </div>
  )
}
