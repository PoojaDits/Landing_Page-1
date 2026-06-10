import axios from 'axios'
import type { Product, Role } from '@/types'
import { gqlClient, setGraphQLAuthToken } from '@/lib/graphql/client'
import {
  LOGIN,
  GET_PROFILE,
  SIGNUP,
} from '@/lib/graphql/queries'

export interface ProductsQueryParams {
  page?: number
  limit?: number
  category?: string
  search?: string
  sortBy?: 'price-asc' | 'price-desc' | 'rating' | 'none'
}

export interface PaginatedProductsResponse {
  products: Product[]
  total: number
  page: number
  limit: number
  hasMore: boolean
  nextPage?: number
}

const API_URL = 'http://localhost:3001'

export const fetchProducts = async (
  params: Omit<ProductsQueryParams, 'page' | 'limit'> = {}
): Promise<Product[]> => {
  const query = new URLSearchParams()
  if (params.category && params.category !== 'All') {
    query.append('category', params.category)
  }
  if (params.search) {
    query.append('q', params.search)
  }
  if (params.sortBy && params.sortBy !== 'none') {
    if (params.sortBy === 'price-asc') {
      query.append('_sort', 'price')
      query.append('_order', 'asc')
    } else if (params.sortBy === 'price-desc') {
      query.append('_sort', 'price')
      query.append('_order', 'desc')
    } else if (params.sortBy === 'rating') {
      query.append('_sort', 'rating')
      query.append('_order', 'desc')
    }
  }

  const { data } = await axios.get<Product[]>(`${API_URL}/products?${query.toString()}`)
  return data
}

export const fetchPaginatedProducts = async (
  params: ProductsQueryParams = {}
): Promise<PaginatedProductsResponse> => {
  const page = params.page || 1
  const limit = params.limit || 6

  const query = new URLSearchParams()
  query.append('_page', page.toString())
  query.append('_limit', limit.toString())
  
  if (params.category && params.category !== 'All') {
    query.append('category', params.category)
  }
  if (params.search) {
    query.append('q', params.search)
  }
  if (params.sortBy && params.sortBy !== 'none') {
    if (params.sortBy === 'price-asc') {
      query.append('_sort', 'price')
      query.append('_order', 'asc')
    } else if (params.sortBy === 'price-desc') {
      query.append('_sort', 'price')
      query.append('_order', 'desc')
    } else if (params.sortBy === 'rating') {
      query.append('_sort', 'rating')
      query.append('_order', 'desc')
    }
  }

  const response = await axios.get<Product[]>(`${API_URL}/products?${query.toString()}`)
  const products = response.data
  
  const totalCountStr = response.headers['x-total-count']
  let total = totalCountStr ? parseInt(totalCountStr, 10) : products.length
  
  if (!totalCountStr && products.length > 0 && products.length === limit) {
     total = page * limit + 1
  }

  const hasMore = (page * limit) < total
  const nextPage = hasMore ? page + 1 : undefined

  return {
    products,
    total,
    page,
    limit,
    hasMore,
    nextPage,
  }
}


interface GqlLoginResponse {
  login: { access_token: string; refresh_token?: string }
}

interface GqlProfileResponse {
  myProfile: { id: string; name: string; email: string; role: string; avatar?: string }
}

export const loginUser = async (credentials: { email: string; password: string }) => {
  const isDemoUser = ['johndoe@example.com', 'alice@example.com', 'bob@example.com'].includes(credentials.email)

  if (isDemoUser && credentials.password === 'Happyme31@') {
    const roleMap: Record<string, string> = {
      'johndoe@example.com': 'super_admin',
      'alice@example.com': 'admin',
      'bob@example.com': 'customer'
    }
    const role = roleMap[credentials.email] as Role
    const localPart = credentials.email.split('@')[0]
    
    const fakeToken = `fake_token_${localPart}`
    setGraphQLAuthToken(fakeToken)
    
    return {
      user: {
        id: `demo_${localPart}`,
        name: localPart,
        firstName: localPart,
        lastName: 'Demo',
        email: credentials.email,
        role: role,
      },
      token: fakeToken,
    }
  }

  const loginData = await gqlClient.request<GqlLoginResponse>(LOGIN, credentials)
  const token = loginData.login.access_token
  if (!token) throw new Error('Invalid credentials')

  setGraphQLAuthToken(token)

  try {
    const profileData = await gqlClient.request<GqlProfileResponse>(GET_PROFILE)
    const p = profileData.myProfile
    return {
      user: {
        id: String(p.id),
        name: p.name,
        firstName: p.name?.split(' ')[0] ?? p.name,
        lastName: p.name?.split(' ').slice(1).join(' ') ?? '',
        email: p.email,
        role: (p.role as Role) ?? 'customer',
      },
      token,
    }
  } catch {
    const localPart = credentials.email.split('@')[0]
    return {
      user: {
        id: 'me',
        name: localPart,
        firstName: localPart,
        lastName: '',
        email: credentials.email,
        role: 'customer' as Role,
      },
      token,
    }
  }
}

export const signupUser = async (payload: {
  firstName: string
  lastName: string
  email: string
  password: string
}) => {
  const data = await gqlClient.request<{ addUser: { id: string; name: string; email: string; role: string } }>(
    SIGNUP,
    {
      name: `${payload.firstName} ${payload.lastName}`.trim(),
      email: payload.email,
      password: payload.password,
      avatar: 'https://i.imgur.com/LDOO4Qs.jpg',
    }
  )
  return data.addUser
}
