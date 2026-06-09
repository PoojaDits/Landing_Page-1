import { useRef, useEffect, useCallback } from 'react'
import { useInfiniteQuery } from '@tanstack/react-query'
import { useProductStore } from '@/store/useProductStore'
import { fetchPaginatedProducts } from '@/lib/api'
import type { Product, Category } from '@/types'

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
  isFetchingNextPage?: boolean
}

export function useInfiniteProducts(categoryProp?: Category): UseInfiniteProductsReturn {
  const {
    selectedCategory,
    searchQuery,
    sortBy,
  } = useProductStore()

  const activeCategory = categoryProp || selectedCategory

  // Different chunk sizes:
  // - "All": 12 per page (used with numbered pagination, strict per-page view)
  // - Specific categories: 6 per load for infinite scroll (first 6, then +6 on scroll)
  const isAll = activeCategory === 'All'
  const chunkSize = isAll ? 12 : 6

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isLoading,
    isFetching,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ['products', activeCategory, searchQuery, sortBy],
    queryFn: ({ pageParam = 1 }) =>
      fetchPaginatedProducts({
        page: pageParam,
        limit: chunkSize,
        category: activeCategory !== 'All' ? activeCategory : undefined,
        search: searchQuery || undefined,
        sortBy,
      }),
    getNextPageParam: (lastPage) => lastPage.nextPage,
    initialPageParam: 1,
  })

  const pages = data?.pages || []
  const visibleProducts = pages.flatMap((p) => p.products)
  const total = pages.length > 0 ? pages[0].total : 0
  const totalPages = Math.ceil(total / chunkSize)
  const currentPage = pages.length
  const hasMore = !!hasNextPage

  // allFiltered kept for backward compatibility in ProductGrid (only .length and length===0 used)
  // We use a length-correct dummy array (no full data fetched on client)
  const allFiltered = Array.from({ length: total }, () => ({ id: 0 } as Product))

  const sentinelRef = useRef<HTMLDivElement>(null)

  const loadMore = useCallback(() => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage()
    }
  }, [hasNextPage, isFetchingNextPage, fetchNextPage])

  const goToPage = useCallback(
    async (page: number) => {
      if (page < 1 || page > totalPages || isFetchingNextPage) return

      const currentLoaded = pages.length
      if (page <= currentLoaded) {
        window.scrollTo({ top: 300, behavior: 'smooth' })
        return
      }

      // Load additional pages to reach the target page (cumulative visible like before)
      let pagesNeeded = page - currentLoaded
      while (pagesNeeded > 0) {
        await fetchNextPage()
        pagesNeeded--
      }
      window.scrollTo({ top: 300, behavior: 'smooth' })
    },
    [totalPages, isFetchingNextPage, pages.length, fetchNextPage]
  )

  // Intersection Observer for infinite scroll (real-time style)
  useEffect(() => {
    const sentinel = sentinelRef.current
    if (!sentinel) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage()
        }
      },
      { threshold: 0.1, rootMargin: '100px' }
    )

    observer.observe(sentinel)
    return () => observer.disconnect()
  }, [hasNextPage, isFetchingNextPage, fetchNextPage])

  return {
    visibleProducts,
    allFiltered,
    currentPage,
    totalPages,
    hasMore,
    isLoading,
    isFetching: isFetching || isFetchingNextPage,
    sentinelRef,
    goToPage,
    loadMore,
    isFetchingNextPage,
  }
}
