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
    searchQuery,
    sortBy,
    isLoading: isGlobalLoading,
    fetchProducts
  } = useProductStore()

  const [currentPage, setCurrentPage] = useState(1)
  const [visibleProducts, setVisibleProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const sentinelRef = useRef<HTMLDivElement>(null)

  const activeCategory = categoryProp || selectedCategory

  useEffect(() => {
    fetchProducts()
  }, [fetchProducts])

  const allFiltered = useMemo(() => {
    let result = [...products];

    // 1. Filter by Category
    if (activeCategory !== 'All') {
      result = result.filter((p) => p.category === activeCategory);
    }

    // 2. Filter by Search Query
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter((p) =>
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q)
      );
    }

    // 3. Sort
    if (sortBy !== 'none') {
      result.sort((a, b) => {
        if (sortBy === 'price-asc') return a.price - b.price;
        if (sortBy === 'price-desc') return b.price - a.price;
        if (sortBy === 'rating') return b.rating - a.rating;
        return 0;
      });
    }

    return result;
  }, [activeCategory, products, searchQuery, sortBy]);

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
