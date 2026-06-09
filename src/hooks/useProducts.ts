import { useQuery } from '@tanstack/react-query'
import { fetchProducts } from '@/lib/api'
import { useProductStore } from '@/store/useProductStore'
import { useMemo } from 'react'
import type { Product, Category } from '@/types'

export const useProducts = (categoryProp?: Category) => {
  const { selectedCategory, searchQuery, sortBy } = useProductStore()

  const activeCategory = categoryProp || selectedCategory

  const {
    data: products = [],
    isLoading,
    isFetching,
    error,
  } = useQuery({
    queryKey: ['products'],
    queryFn: fetchProducts,
    // These are now inherited from the global QueryClient, but can be overridden per query
  })

  const filteredProducts = useMemo(() => {
    let result = [...products]

    if (activeCategory !== 'All') {
      result = result.filter((p: Product) => p.category === activeCategory)
    }

    if (searchQuery) {
      const q = searchQuery.toLowerCase()
      result = result.filter((p: Product) =>
        p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q)
      )
    }

    if (sortBy !== 'none') {
      result.sort((a: Product, b: Product) => {
        if (sortBy === 'price-asc') return a.price - b.price
        if (sortBy === 'price-desc') return b.price - a.price
        if (sortBy === 'rating') return b.rating - a.rating
        return 0
      })
    }

    return result
  }, [products, activeCategory, searchQuery, sortBy])

  return {
    products: filteredProducts,
    isLoading,
    isFetching,
    error,
    rawProducts: products, // in case you need unfiltered data
  }
}