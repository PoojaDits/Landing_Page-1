import axios from 'axios'
import type { Product } from '@/types'

const API = axios.create({ baseURL: '/api' })

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

export const fetchProducts = async (params: Omit<ProductsQueryParams, 'page' | 'limit'> = {}): Promise<Product[]> => {
  const queryParams: Record<string, any> = {}

  if (params.category && params.category !== 'All') {
    queryParams.category = params.category
  }
  if (params.search) {
    queryParams.name_like = params.search
  }
  if (params.sortBy && params.sortBy !== 'none') {
    if (params.sortBy === 'price-asc') {
      queryParams._sort = 'price'
      queryParams._order = 'asc'
    } else if (params.sortBy === 'price-desc') {
      queryParams._sort = 'price'
      queryParams._order = 'desc'
    } else if (params.sortBy === 'rating') {
      queryParams._sort = 'rating'
      queryParams._order = 'desc'
    }
  }

  const { data } = await API.get('/products', { params: queryParams })
  return data
}

export const fetchPaginatedProducts = async (params: ProductsQueryParams = {}): Promise<PaginatedProductsResponse> => {
  const page = params.page || 1
  const limit = params.limit || 6

  const queryParams: Record<string, any> = {
    _page: page,
    _limit: limit,
  }

  if (params.category && params.category !== 'All') {
    queryParams.category = params.category
  }
  if (params.search) {
    queryParams.name_like = params.search
  }
  if (params.sortBy && params.sortBy !== 'none') {
    if (params.sortBy === 'price-asc') {
      queryParams._sort = 'price'
      queryParams._order = 'asc'
    } else if (params.sortBy === 'price-desc') {
      queryParams._sort = 'price'
      queryParams._order = 'desc'
    } else if (params.sortBy === 'rating') {
      queryParams._sort = 'rating'
      queryParams._order = 'desc'
    }
  }

  const response = await API.get('/products', { params: queryParams })
  const products: Product[] = response.data
  // json-server returns X-Total-Count header for paginated requests
  const totalHeader = response.headers['x-total-count'] || response.headers['X-Total-Count']
  const total = parseInt(totalHeader || products.length.toString(), 10)

  const hasMore = page * limit < total
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