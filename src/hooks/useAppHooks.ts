import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import axios, { AxiosError } from 'axios'
import { useFormik } from 'formik'
import toast from 'react-hot-toast'
import type { User, FormErrors } from '@/types'
import {
  contactValidationSchema,
  ContactFormValues,
  validateLoginField,
  validateLoginForm,
  validateSignupField,
  validateSignupForm,
  LoginFormData,
  SignupFormData,
} from '@/validation'

const API_URL = '/api'

// Auth Hook
export function useAuth() {
  const location = useLocation()

  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false)
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const token = localStorage.getItem('myToken')
    const savedUser = localStorage.getItem('myUser')

    setIsLoggedIn(!!token)
    setUser(savedUser ? JSON.parse(savedUser) : null)
  }, [location])

  return { isLoggedIn, user }
}

// Contact Form Hook
export function useContactForm() {
  const formik = useFormik<ContactFormValues>({
    initialValues: {
      name: '',
      email: '',
      message: '',
    },
    validationSchema: contactValidationSchema,
    onSubmit: (values, { resetForm }) => {
      console.log('Contact form submitted:', values)
      toast.success('Thank you for your message!', { duration: 4000 })
      resetForm()
    },
  })

  return formik
}

// Login Form Hook
export function useLoginForm() {
  const navigate = useNavigate()

  const [formData, setFormData] = useState<LoginFormData>({ email: '', password: '' })
  const [errors, setErrors] = useState<FormErrors>({})
  const [mainError, setMainError] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (localStorage.getItem('myToken')) {
      navigate('/')
    }
  }, [navigate])

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })

    if (errors[name]) {
      setErrors({ ...errors, [name]: '' })
    }
  }

  function validateField(name: string, value: string): string {
    return validateLoginField(name, value)
  }

  function handleBlur(e: React.FocusEvent<HTMLInputElement>) {
    const { name, value } = e.target
    const error = validateField(name, value)
    setErrors({ ...errors, [name]: error })
  }

  function validateForm(): boolean {
    const newErrors = validateLoginForm(formData)
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>): Promise<void> {
    e.preventDefault()
    setMainError('')

    if (!validateForm()) return

    setLoading(true)
    try {
      const { data: users } = await axios.get(`${API_URL}/users`, {
        params: { email: formData.email, password: formData.password },
      })

      if (!users || users.length === 0) {
        throw new Error('Invalid credentials or user not found')
      }

      const user = users[0]
      const { password, ...userData } = user
      localStorage.setItem('myToken', `json-token-${Date.now()}`)
      localStorage.setItem('myUser', JSON.stringify(userData))
      navigate('/')
    } catch (err) {
      const error = err as AxiosError<{ message: string }>
      const message =
        error.response?.data?.message ||
        (error as Error).message ||
        'Invalid credentials or user not found'
      setMainError(message)
    } finally {
      setLoading(false)
    }
  }

  return {
    formData,
    errors,
    mainError,
    loading,
    handleChange,
    handleBlur,
    handleSubmit,
  }
}

// Signup Form Hook
export function useSignupForm() {
  const navigate = useNavigate()

  const [formData, setFormData] = useState<SignupFormData>({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  })
  const [errors, setErrors] = useState<FormErrors>({})
  const [mainError, setMainError] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (localStorage.getItem('myToken')) {
      navigate('/')
    }
  }, [navigate])

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })

    if (errors[name]) {
      setErrors({ ...errors, [name]: '' })
    }
  }

  function validateField(name: string, value: string): string {
    return validateSignupField(name, value)
  }

  function handleBlur(e: React.FocusEvent<HTMLInputElement>) {
    const { name, value } = e.target
    const error = validateField(name, value)
    setErrors({ ...errors, [name]: error })
  }

  function validateForm(): boolean {
    const newErrors = validateSignupForm(formData)
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>): Promise<void> {
    e.preventDefault()
    setMainError('')

    if (!validateForm()) return

    setLoading(true)
    try {
      await axios.post(`${API_URL}/users`, {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password,
        role: 'customer',
      })
      navigate('/login')
    } catch (err) {
      const error = err as AxiosError<{ message: string }>
      const message =
        error.response?.data?.message || 'Signup failed. Please try again.'
      setMainError(message)
    } finally {
      setLoading(false)
    }
  }

  return {
    formData,
    errors,
    mainError,
    loading,
    handleChange,
    handleBlur,
    handleSubmit,
  }
}
