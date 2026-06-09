import { useState, useEffect, useRef, useCallback, useMemo } from 'react'
import { useProductStore } from '@/store/useProductStore'
import { useQuery } from '@tanstack/react-query'
import { fetchProducts } from '@/lib/api'
import type { Product, Category } from '@/types'

const PAGE_SIZE = 6

export interface UseInfiniteProductsReturn {
  visibleProducts: Product[]
  allFiltered: Product[]
  currentPage: number
  totalPages: number
  hasMore: boolean
  isLoading: boolean
  isFetching: boolean
  sentinelRef: React.RefObject<HTMLDivElement | null>
  goToPage: (page: number) => void
  loadMore: () => void
}

export function useInfiniteProducts(categoryProp?: Category): UseInfiniteProductsReturn {
  const {
    selectedCategory,
    searchQuery,
    sortBy,
  } = useProductStore()

  // Single source of truth for products via React Query
  const {
    data: products = [],
    isLoading: isGlobalLoading,
    isFetching: isGlobalFetching,
    error
  } = useQuery({
    queryKey: ['products'],
    queryFn: fetchProducts,
  })

  const [currentPage, setCurrentPage] = useState(1)
  const [isPageChanging, setIsPageChanging] = useState(false)
  const sentinelRef = useRef<HTMLDivElement>(null)

  const activeCategory = categoryProp || selectedCategory

  // Client-side filtering + sorting (fast for small datasets)
  const allFiltered = useMemo(() => {
    let result = [...products]

    if (activeCategory !== 'All') {
      result = result.filter((p) => p.category === activeCategory)
    }

    if (searchQuery) {
      const q = searchQuery.toLowerCase()
      result = result.filter((p) =>
        p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q)
      )
    }

    if (sortBy !== 'none') {
      result.sort((a, b) => {
        if (sortBy === 'price-asc') return a.price - b.price
        if (sortBy === 'price-desc') return b.price - a.price
        if (sortBy === 'rating') return b.rating - a.rating
        return 0
      })
    }

    return result
  }, [products, activeCategory, searchQuery, sortBy])

  const totalPages = Math.ceil(allFiltered.length / PAGE_SIZE)
  const hasMore = currentPage < totalPages

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1)
  }, [allFiltered])

  const visibleProducts = useMemo(() => {
    return allFiltered.slice(0, currentPage * PAGE_SIZE)
  }, [allFiltered, currentPage])

  const loadMore = useCallback(() => {
    if (isPageChanging || !hasMore) return
    setIsPageChanging(true)

    // Small natural delay for UX (feels responsive, not fake loading)
    requestAnimationFrame(() => {
      setCurrentPage((prev) => prev + 1)
      setIsPageChanging(false)
    })
  }, [isPageChanging, hasMore])

  const goToPage = useCallback((page: number) => {
    if (page < 1 || page > totalPages || isPageChanging) return

    setIsPageChanging(true)

    requestAnimationFrame(() => {
      setCurrentPage(page)
      setIsPageChanging(false)
      window.scrollTo({ top: 300, behavior: 'smooth' })
    })
  }, [totalPages, isPageChanging])

  // Intersection Observer for infinite scroll
  useEffect(() => {
    const sentinel = sentinelRef.current
    if (!sentinel) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !isPageChanging) {
          loadMore()
        }
      },
      { threshold: 0.1, rootMargin: '100px' }
    )

    observer.observe(sentinel)
    return () => observer.disconnect()
  }, [hasMore, isPageChanging, loadMore])

  return {
    visibleProducts,
    allFiltered,
    currentPage,
    totalPages,
    hasMore,
    isLoading: isGlobalLoading,
    isFetching: isGlobalFetching || isPageChanging,
    sentinelRef,
    goToPage,
    loadMore,
  }
}
