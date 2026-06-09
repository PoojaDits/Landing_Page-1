import { useMutation, useQueryClient } from '@tanstack/react-query'
import { loginUser, signupUser } from '@/lib/api'
import { useAuthStore } from '@/store/useAuthStore'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { getDashboardPath } from '@/lib/role'

export const useLogin = () => {
  const setAuth = useAuthStore((s) => s.setAuth)
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: loginUser,
    onSuccess: ({ user, token }) => {
      setAuth(user, token)
      // Invalidate products so fresh data loads for the new user session
      queryClient.invalidateQueries({ queryKey: ['products'] })
      toast.success('Welcome back!')
      navigate(getDashboardPath())
    },
    onError: (err: Error) => {
      toast.error(err.message || 'Invalid credentials')
    },
  })
}

export const useSignup = () => {
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: signupUser,
    onSuccess: () => {
      // Invalidate so new user data (if any) is fresh
      queryClient.invalidateQueries({ queryKey: ['products'] })
      toast.success('Account created! Please log in.')
      navigate('/login')
    },
    onError: (err: Error) => {
      toast.error(err.message || 'Signup failed')
    },
  })
}