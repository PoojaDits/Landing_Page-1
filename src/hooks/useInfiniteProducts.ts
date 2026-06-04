import { useState, useEffect, useRef, useCallback, useMemo } from 'react'
import type { Product, Category } from '@/types'

const ALL_PRODUCTS: Product[] = [
  { id: 1,  name: 'Wireless Headphones',   category: 'Electronics',  price: 79.99,  originalPrice: 99.99,  rating: 4, reviews: 128, image: 'https://images.unsplash.com/photo-1613040809024-b4ef7ba99bc3?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', badge: 'Sale' },
  { id: 2,  name: 'Running Sneakers',       category: 'Footwear',     price: 59.99,                         rating: 5, reviews: 245, image: 'https://images.unsplash.com/photo-1560769629-975ec94e6a86?q=80&w=764&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', badge: 'New'  },
  { id: 3,  name: 'Smart Watch',            category: 'Electronics',  price: 149.99, originalPrice: 199.99, rating: 4, reviews: 87,  image: 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c21hcnQlMjB3YXRjaHxlbnwwfHwwfHx8MA%3D%3D', badge: 'Hot'  },
  { id: 4,  name: 'Leather Backpack',       category: 'Accessories',  price: 89.99,                         rating: 4, reviews: 63,  image: 'https://cdn.fynd.com/v2/falling-surf-7c8bb8/fyprod/wrkr/products/pictures/item/free/original/000000410539635001/mgBjy4PPH_t-410539635_0200_MODEL.jpg' },
  { id: 5,  name: 'Sunglasses',             category: 'Accessories',  price: 34.99,  originalPrice: 49.99,  rating: 3, reviews: 192, image: 'https://images.unsplash.com/photo-1508296695146-257a814070b4?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', badge: 'Sale' },
  { id: 6,  name: 'Mechanical Keyboard',    category: 'Electronics',  price: 119.99,                        rating: 5, reviews: 304, image: 'https://ezpctech.com.au/cdn/shop/files/3_8b6a95ee-5437-47d5-9670-84ffb8d58087.jpg?v=1762479556&width=1600', badge: 'New'  },
  { id: 7,  name: 'Coffee Maker',           category: 'Kitchen',      price: 49.99,  originalPrice: 69.99,  rating: 4, reviews: 411, image: 'https://images.unsplash.com/photo-1638202539979-5b90600aacb2?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', badge: 'Sale' },
  { id: 8,  name: 'Yoga Mat',              category: 'Sports',       price: 29.99,                         rating: 5, reviews: 155, image: 'https://images.unsplash.com/photo-1637157216470-d92cd2edb2e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8eW9nYSUyMG1hdHxlbnwwfHwwfHx8MA%3D%3D' },
  { id: 9,  name: 'Bluetooth Speaker',      category: 'Electronics',  price: 59.99,  originalPrice: 79.99,  rating: 4, reviews: 220, image: 'https://plus.unsplash.com/premium_photo-1677093905921-617951e10e90?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fGJsdWV0b290aCUyMHNwZWFrZXJ8ZW58MHx8MHx8fDA%3D', badge: 'Sale' },
  { id: 10, name: 'Trail Running Shoes',    category: 'Footwear',     price: 89.99,                         rating: 5, reviews: 98,  image: 'https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?q=80&w=1025&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', badge: 'New'  },
  { id: 11, name: 'Laptop Stand',           category: 'Electronics',  price: 39.99,                         rating: 4, reviews: 310, image: 'https://plus.unsplash.com/premium_photo-1683736986821-e4662912a70d?q=80&w=1029&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
  { id: 12, name: 'Leather Wallet',         category: 'Accessories',  price: 24.99,  originalPrice: 34.99,  rating: 4, reviews: 540, image: 'https://images.unsplash.com/photo-1614330315526-166f2d71e544?q=80&w=688&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', badge: 'Sale' },
  { id: 13, name: 'Air Fryer',             category: 'Kitchen',      price: 69.99,  originalPrice: 99.99, rating: 5, reviews: 733, image: 'https://plus.unsplash.com/premium_photo-1711051351678-658b273f71d4?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', badge: 'Hot'  },
  { id: 14, name: 'Resistance Bands Set',   category: 'Sports',       price: 19.99,                         rating: 4, reviews: 287, image: 'https://www.gaiam.com/cdn/shop/products/05-63579_RESTORE-3IN1-RESISTANCE-BAND-KIT_A.jpg?v=1574378915&width=400' },
  { id: 15, name: 'Noise-Cancel Earbuds',   category: 'Electronics',  price: 129.99, originalPrice: 159.99, rating: 5, reviews: 402, image: 'https://images.unsplash.com/photo-1624258919367-5dc28f5dc293?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', badge: 'Hot'  },
  { id: 16, name: 'Canvas Sneakers',        category: 'Footwear',     price: 44.99,                         rating: 4, reviews: 178, image: 'https://images.unsplash.com/photo-1641997465126-c73cc4070337?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
  { id: 17, name: 'Watch Band',            category: 'Accessories',  price: 14.99,                         rating: 3, reviews: 89,  image: 'https://images.unsplash.com/photo-1555024502-f4472a2f0321?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
  { id: 18, name: 'Blender',              category: 'Kitchen',      price: 54.99,  originalPrice: 74.99,  rating: 4, reviews: 321, image: 'https://plus.unsplash.com/premium_photo-1718043036199-d98bef36af46?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', badge: 'Sale' },
  { id: 19, name: 'Dumbbell Set',          category: 'Sports',       price: 79.99,                         rating: 5, reviews: 195, image: 'https://plus.unsplash.com/premium_photo-1671028546491-f70b21a32cc2?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', badge: 'New'  },
  { id: 20, name: 'USB-C Hub',            category: 'Electronics',  price: 34.99,  originalPrice: 44.99,  rating: 4, reviews: 567, image: 'https://plus.unsplash.com/premium_photo-1761043248662-42f371ad31b4?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', badge: 'Sale' },
  { id: 21, name: 'Hiking Boots',          category: 'Footwear',     price: 109.99,                        rating: 5, reviews: 143, image: 'https://meindlusa.com/cdn/shop/files/EuroLightHiker_Hero_2048x.png?v=1779894332', badge: 'New'  },
  { id: 22, name: 'Crossbody Bag',         category: 'Accessories',  price: 49.99,  originalPrice: 64.99,  rating: 4, reviews: 232, image: 'data:image/jpeg;base64,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', badge: 'Sale' },
  { id: 23, name: 'Instant Pot',          category: 'Kitchen',      price: 89.99,  originalPrice: 119.99, rating: 5, reviews: 988, image: 'https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcQYjpsRa4YOfxgr9qAKRtkR3X7JsuvH6jj2FkD73ia4mldMKYffl36bT9MRqaTU5lsVLyOQ6SelRX0rjJJQMiX50u8spTiIq9PpazR6r7QGbtV0oYGpkIKg8nakHxfhfwT9BU4FexXUdg&usqp=CAc', badge: 'Hot'  },
  { id: 24, name: 'Jump Rope',            category: 'Sports',       price: 12.99,                         rating: 4, reviews: 412, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTvvfDmQyjFXSWH1uw0zzhy9IhQoC-LcjCfig&s' },
  { id: 25, name: 'Classic T-Shirt',      category: 'Clothes',  price: 19.99,                         rating: 4, reviews: 210, image: 'https://plus.unsplash.com/premium_photo-1718913936342-eaafff98834b?q=80&w=1472&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
  { id: 26, name: 'Denim Jacket',         category: 'Clothes',  price: 79.99,                         rating: 5, reviews: 142, image: 'https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcSnTGEkmBpM90ys-4IfZR1-avllx-Ijt2OQpo2jLXKtPSrUP-iRkIrAXzaTiYkzX5gY_CB4XN4273oeVuxVi7QC0RxaI93jFlqFY85jSNmutGPLb9kuKL5Csw&usqp=CAc' },
  { id: 27, name: 'Eau de Parfum',        category: 'Perfumes',  price: 59.99,                         rating: 5, reviews: 321, image: 'https://images.unsplash.com/photo-1613521140785-e85e427f8002?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', badge: 'Hot' },
  { id: 28, name: 'Leather Handbag',      category: 'Bags',  price: 129.99,                        rating: 5, reviews: 98,  image: 'https://images.unsplash.com/photo-1682745230951-8a5aa9a474a0?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8aGFuZGJhZ3xlbnwwfHwwfHx8MA%3D%3D' },
  { id: 29, name: 'Makeup Kit',           category: 'Makeup',  price: 39.99,                         rating: 4, reviews: 412, image: 'https://sc01.alicdn.com/kf/H19a8237076aa42669df78615d455f0daU.jpg' },
  { id: 30, name: 'Clutch Purse',         category: 'Bags',  price: 45.99,                         rating: 4, reviews: 88,  image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRq3efxqkHkJr9Qb3b_cej4gh1f4sMSfTH0pg&s' },
]

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
    isLoading,
    sentinelRef,
    goToPage,
    loadMore,
  }
}
