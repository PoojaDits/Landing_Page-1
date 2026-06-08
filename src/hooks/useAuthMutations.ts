import { useMutation } from '@tanstack/react-query'
import { loginUser, signupUser } from '@/lib/api'
import { useAuthStore } from '@/store/useAuthStore'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { getDashboardPath } from '@/lib/role'

export const useLogin = () => {
  const setAuth = useAuthStore((s) => s.setAuth)
  const navigate = useNavigate()

  return useMutation({
    mutationFn: loginUser,
    onSuccess: ({ user, token }) => {
      setAuth(user, token)
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

  return useMutation({
    mutationFn: signupUser,
    onSuccess: () => {
      toast.success('Account created! Please log in.')
      navigate('/login')
    },
    onError: (err: Error) => {
      toast.error(err.message || 'Signup failed')
    },
  })
}