import { useState, useEffect, useRef, useCallback, useMemo } from 'react'
import type { Product, Category } from '@/types'

const ALL_PRODUCTS: Product[] = [
  { id: 1,  name: 'Wireless Headphones',   category: 'Electronics',  price: 79.99,  originalPrice: 99.99,  rating: 4, reviews: 128, emoji: '🎧', badge: 'Sale' },
  { id: 2,  name: 'Running Sneakers',       category: 'Footwear',     price: 59.99,                         rating: 5, reviews: 245, emoji: '👟', badge: 'New'  },
  { id: 3,  name: 'Smart Watch',            category: 'Electronics',  price: 149.99, originalPrice: 199.99, rating: 4, reviews: 87,  emoji: '⌚', badge: 'Hot'  },
  { id: 4,  name: 'Leather Backpack',       category: 'Accessories',  price: 89.99,                         rating: 4, reviews: 63,  emoji: '🎒' },
  { id: 5,  name: 'Sunglasses',             category: 'Accessories',  price: 34.99,  originalPrice: 49.99,  rating: 3, reviews: 192, emoji: '🕶️', badge: 'Sale' },
  { id: 6,  name: 'Mechanical Keyboard',    category: 'Electronics',  price: 119.99,                        rating: 5, reviews: 304, emoji: '⌨️', badge: 'New'  },
  { id: 7,  name: 'Coffee Maker',           category: 'Kitchen',      price: 49.99,  originalPrice: 69.99,  rating: 4, reviews: 411, emoji: '☕', badge: 'Sale' },
  { id: 8,  name: 'Yoga Mat',              category: 'Sports',       price: 29.99,                         rating: 5, reviews: 155, emoji: '🧘' },
  { id: 9,  name: 'Bluetooth Speaker',      category: 'Electronics',  price: 59.99,  originalPrice: 79.99,  rating: 4, reviews: 220, emoji: '🔊', badge: 'Sale' },
  { id: 10, name: 'Trail Running Shoes',    category: 'Footwear',     price: 89.99,                         rating: 5, reviews: 98,  emoji: '🥾', badge: 'New'  },
  { id: 11, name: 'Laptop Stand',           category: 'Electronics',  price: 39.99,                         rating: 4, reviews: 310, emoji: '💻' },
  { id: 12, name: 'Leather Wallet',         category: 'Accessories',  price: 24.99,  originalPrice: 34.99,  rating: 4, reviews: 540, emoji: '👛', badge: 'Sale' },
  { id: 13, name: 'Air Fryer',             category: 'Kitchen',      price: 69.99,  originalPrice: 99.99,  rating: 5, reviews: 733, emoji: '🍳', badge: 'Hot'  },
  { id: 14, name: 'Resistance Bands Set',   category: 'Sports',       price: 19.99,                         rating: 4, reviews: 287, emoji: '🏋️' },
  { id: 15, name: 'Noise-Cancel Earbuds',   category: 'Electronics',  price: 129.99, originalPrice: 159.99, rating: 5, reviews: 402, emoji: '🎵', badge: 'Hot'  },
  { id: 16, name: 'Canvas Sneakers',        category: 'Footwear',     price: 44.99,                         rating: 4, reviews: 178, emoji: '👞' },
  { id: 17, name: 'Watch Band',            category: 'Accessories',  price: 14.99,                         rating: 3, reviews: 89,  emoji: '⌚' },
  { id: 18, name: 'Blender',              category: 'Kitchen',      price: 54.99,  originalPrice: 74.99,  rating: 4, reviews: 321, emoji: '🥤', badge: 'Sale' },
  { id: 19, name: 'Dumbbell Set',          category: 'Sports',       price: 79.99,                         rating: 5, reviews: 195, emoji: '🏋️', badge: 'New'  },
  { id: 20, name: 'USB-C Hub',            category: 'Electronics',  price: 34.99,  originalPrice: 44.99,  rating: 4, reviews: 567, emoji: '🔌', badge: 'Sale' },
  { id: 21, name: 'Hiking Boots',          category: 'Footwear',     price: 109.99,                        rating: 5, reviews: 143, emoji: '🥾', badge: 'New'  },
  { id: 22, name: 'Crossbody Bag',         category: 'Accessories',  price: 49.99,  originalPrice: 64.99,  rating: 4, reviews: 232, emoji: '👜', badge: 'Sale' },
  { id: 23, name: 'Instant Pot',          category: 'Kitchen',      price: 89.99,  originalPrice: 119.99, rating: 5, reviews: 988, emoji: '🥘', badge: 'Hot'  },
  { id: 24, name: 'Jump Rope',            category: 'Sports',       price: 12.99,                         rating: 4, reviews: 412, emoji: '🪢' },
]

const PAGE_SIZE = 6

export interface UseInfiniteProductsReturn {
  visibleProducts: Product[]
  allFiltered: Product[]
  currentPage: number
  totalPages: number
  hasMore: boolean
  isLoading: boolean
  sentinelRef: React.RefObject<HTMLDivElement>
  goToPage: (page: number) => void
  loadMore: () => void
}

export function useInfiniteProducts(category: Category): UseInfiniteProductsReturn {
  const [currentPage, setCurrentPage] = useState(1)
  const [visibleProducts, setVisibleProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const sentinelRef = useRef<HTMLDivElement>(null)

  const allFiltered = useMemo(
    () =>
      category === 'All'
        ? ALL_PRODUCTS
        : ALL_PRODUCTS.filter((p) => p.category === category),
    [category]
  )

  const totalPages = Math.ceil(allFiltered.length / PAGE_SIZE)
  const hasMore = currentPage < totalPages

  // Reset when category changes
  useEffect(() => {
    setCurrentPage(1)
    setVisibleProducts(allFiltered.slice(0, PAGE_SIZE))
  }, [allFiltered])

  // Simulate async load for lazy loading effect
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

  // Infinite scroll via IntersectionObserver
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
    isLoading,
    sentinelRef,
    goToPage,
    loadMore,
  }
}
