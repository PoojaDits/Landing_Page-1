import { useQuery } from '@tanstack/react-query'
import { fetchProducts } from '@/lib/api'
import { useProductStore } from '@/store/useProductStore'
import type { Category } from '@/types'

export const useProducts = (categoryProp?: Category) => {
  const { selectedCategory, searchQuery, sortBy } = useProductStore()

  const activeCategory = categoryProp || selectedCategory

  const {
    data: products = [],
    isLoading,
    isFetching,
    error,
  } = useQuery({
    queryKey: ['products', activeCategory, searchQuery, sortBy],
    queryFn: () =>
      fetchProducts({
        category: activeCategory !== 'All' ? activeCategory : undefined,
        search: searchQuery || undefined,
        sortBy,
      }),
  })

  return {
    products,
    isLoading,
    isFetching,
    error,
    rawProducts: products,
  }
}
