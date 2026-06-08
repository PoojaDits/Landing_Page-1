import type { ReactNode } from 'react'
import type { Product, CartProduct, Category } from './product'

export interface SocialLink {
  icon: ReactNode
  href: string
}

export interface FooterLink {
  label: string
  to: string
}

export interface PrivateRouteProps {
  children: ReactNode
  allowedRoles?: string[]
}

export interface RoleRouteProps {
  children: ReactNode
}

export interface ProductCardProps {
  product: Product
  addToCart?: (product: CartProduct) => void
}

export interface ProductGridProps {
  selectedCategory?: Category
  setSelectedCategory?: (category: Category) => void
  addToCart?: (product: CartProduct) => void
}
