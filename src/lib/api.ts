import axios from 'axios'

const API = axios.create({ baseURL: '/api' })

export const fetchProducts = async () => {
  const { data } = await API.get('/products')
  return data
}

export const loginUser = async (credentials: { email: string; password: string }) => {
  const { data: users } = await API.get('/users', { params: credentials })
  if (!users || users.length === 0) throw new Error('Invalid credentials')
  const user = users[0]
  const { password, ...userData } = user
  return { user: userData, token: `json-token-${Date.now()}` }
}

export const signupUser = async (payload: {
  firstName: string
  lastName: string
  email: string
  password: string
}) => {
  const { data } = await API.post('/users', { ...payload, role: 'customer' })
  return data
}