import type { Product, Role } from '@/types'
import { gqlClient, setGraphQLAuthToken } from '@/lib/graphql/client'
import {
  GET_PRODUCTS,
  GET_CATEGORIES,
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

interface GqlCategory {
  id: string
  name: string
}

interface GqlProduct {
  id: string
  title: string
  price: number
  description?: string
  images?: string[]
  category?: GqlCategory
}

let categoryMapCache: Record<string, number> | null = null

const getCategoryMap = async (): Promise<Record<string, number>> => {
  if (categoryMapCache) return categoryMapCache
  const data = await gqlClient.request<{ categories: GqlCategory[] }>(GET_CATEGORIES)
  const map: Record<string, number> = {}
  for (const c of data.categories) {
    map[c.name.toLowerCase()] = Number(c.id)
  }
  categoryMapCache = map
  return map
}

export const fetchCategories = async (): Promise<GqlCategory[]> => {
  const data = await gqlClient.request<{ categories: GqlCategory[] }>(GET_CATEGORIES)
  return data.categories
}


const mapProduct = (p: GqlProduct): Product => {
  const numericId = Number(p.id)
  const firstImage = Array.isArray(p.images) && p.images.length > 0 ? p.images[0] : undefined

  return {
    id: numericId,
    name: p.title,
    category: p.category?.name ?? 'Other',
    price: p.price,
    rating: ((numericId % 2) + 3), // 3 or 4
    reviews: 50 + (numericId % 150),
    image: cleanImageUrl(firstImage),
    description: p.description,
  }
}

const cleanImageUrl = (url?: string): string | undefined => {
  if (!url) return undefined
  return url.replace(/^\["?|"?\]$/g, '').replace(/^"|"$/g, '')
}

const applySort = (products: Product[], sortBy?: ProductsQueryParams['sortBy']): Product[] => {
  if (!sortBy || sortBy === 'none') return products
  const sorted = [...products]
  if (sortBy === 'price-asc') sorted.sort((a, b) => a.price - b.price)
  else if (sortBy === 'price-desc') sorted.sort((a, b) => b.price - a.price)
  else if (sortBy === 'rating') sorted.sort((a, b) => b.rating - a.rating)
  return sorted
}


export const fetchProducts = async (
  params: Omit<ProductsQueryParams, 'page' | 'limit'> = {}
): Promise<Product[]> => {
  const variables: Record<string, unknown> = {
    limit: 50,
    offset: 0,
    title: params.search || undefined,
  }

  if (params.category && params.category !== 'All') {
    const map = await getCategoryMap()
    const categoryId = map[params.category.toLowerCase()]
    if (categoryId) variables.categoryId = categoryId
  }

  const data = await gqlClient.request<{ products: GqlProduct[] }>(GET_PRODUCTS, variables)
  const products = data.products.map(mapProduct)
  return applySort(products, params.sortBy)
}

export const fetchPaginatedProducts = async (
  params: ProductsQueryParams = {}
): Promise<PaginatedProductsResponse> => {
  const page = params.page || 1
  const limit = params.limit || 6
  const offset = (page - 1) * limit

  const variables: Record<string, unknown> = {
    limit: limit + 1,
    offset,
    title: params.search || undefined,
  }

  if (params.category && params.category !== 'All') {
    const map = await getCategoryMap()
    const categoryId = map[params.category.toLowerCase()]
    if (categoryId) variables.categoryId = categoryId
  }

  const data = await gqlClient.request<{ products: GqlProduct[] }>(GET_PRODUCTS, variables)
  const raw = data.products

  const hasMore = raw.length > limit
  const pageItems = hasMore ? raw.slice(0, limit) : raw
  const products = applySort(pageItems.map(mapProduct), params.sortBy)

  const total = offset + products.length + (hasMore ? 1 : 0)
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
