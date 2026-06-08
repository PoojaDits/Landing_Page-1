import { useState, useEffect, useRef, useCallback, useMemo } from 'react'
import { useProductStore } from '@/store/useProductStore';
import type { Product, Category } from '@/types'

const PAGE_SIZE = 6

export interface UseInfiniteProductsReturn {
  visibleProducts: Product[]
  allFiltered: Product[]
  currentPage: number
  totalPages: number
  hasMore: boolean
  isLoading: boolean
  sentinelRef: React.RefObject<HTMLDivElement | null>
  goToPage: (page: number) => void
  loadMore: () => void
}

export function useInfiniteProducts(categoryProp?: Category): UseInfiniteProductsReturn {
  const {
    products,
    selectedCategory,
    isLoading: isGlobalLoading,
    fetchProducts
  } = useProductStore()

  const [currentPage, setCurrentPage] = useState(1)
  const [visibleProducts, setVisibleProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const sentinelRef = useRef<HTMLDivElement>(null)

  // Use prop category if provided, otherwise fallback to global store
  const activeCategory = categoryProp || selectedCategory

  // Fetch all products from server once using the store
  useEffect(() => {
    fetchProducts()
  }, [fetchProducts])

  const allFiltered = useMemo(
    () =>
      activeCategory === 'All'
        ? products
        : products.filter((p) => p.category === activeCategory),
    [activeCategory, products]
  )

  const totalPages = Math.ceil(allFiltered.length / PAGE_SIZE)
  const hasMore = currentPage < totalPages

  useEffect(() => {
    setCurrentPage(1)
    setVisibleProducts(allFiltered.slice(0, PAGE_SIZE))
  }, [allFiltered])

  const loadMore = useCallback(() => {
    if (isLoading || !hasMore) return
    setIsLoading(true)
    setTimeout(() => {
      const nextPage = currentPage + 1
      setVisibleProducts(allFiltered.slice(0, nextPage * PAGE_SIZE))
      setCurrentPage(nextPage)
      setIsLoading(false)
    }, 500)
  }, [isLoading, hasMore, currentPage, allFiltered])

  const goToPage = useCallback(
    (page: number) => {
      if (page < 1 || page > totalPages) return
      setIsLoading(true)
      setTimeout(() => {
        setCurrentPage(page)
        setVisibleProducts(allFiltered.slice(0, page * PAGE_SIZE))
        setIsLoading(false)
        window.scrollTo({ top: 400, behavior: 'smooth' })
      }, 400)
    },
    [totalPages, allFiltered]
  )

  // Intersection observer for infinite scroll
  useEffect(() => {
    const sentinel = sentinelRef.current
    if (!sentinel) return
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !isLoading) {
          loadMore()
        }
      },
      { threshold: 0.1 }
    )
    observer.observe(sentinel)
    return () => observer.disconnect()
  }, [hasMore, isLoading, loadMore])

  return {
    visibleProducts,
    allFiltered,
    currentPage,
    totalPages,
    hasMore,
    isLoading: isGlobalLoading || isLoading,
    sentinelRef,
    goToPage,
    loadMore,
  }
}
