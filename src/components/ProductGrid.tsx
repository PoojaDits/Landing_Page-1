import React, { useEffect, useRef, useState } from 'react'
import { useNavigate, useLocation, useParams } from 'react-router-dom'
import ProductCard from './ProductCard'
import type { Category, CartProduct } from '@/types'
import { useInfiniteProducts } from '@/hooks/useInfiniteProducts'

const categories: Category[] = [
  'All',
  'Electronics',
  'Footwear',
  'Accessories',
  'Kitchen',
  'Sports',
]

const normaliseCategory = (value: string | undefined): Category => {
  if (!value) return 'All'
  let v = value
  try { v = decodeURIComponent(value) } catch { /* ignore */ }
  const match = categories.find((c) => c.toLowerCase() === String(v).toLowerCase())
  return match || 'All'
}

// ── Lazy-reveal wrapper ─────────────────────────────────────────────────────
const LazyCard: React.FC<{ children: React.ReactNode; index: number }> = ({ children, index }) => {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect() } },
      { threshold: 0.05 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(24px)',
        transition: `opacity 0.45s ease ${index * 60}ms, transform 0.45s ease ${index * 60}ms`,
      }}
    >
      {children}
    </div>
  )
}

// ── Skeleton card ───────────────────────────────────────────────────────────
const SkeletonCard: React.FC = () => (
  <div className="rounded-xl overflow-hidden bg-white/5 border border-white/10 animate-pulse">
    <div className="h-[140px] md:h-[200px] bg-white/10" />
    <div className="p-4 space-y-3">
      <div className="h-2.5 w-1/3 rounded bg-white/10" />
      <div className="h-4 w-2/3 rounded bg-white/10" />
      <div className="h-3 w-1/2 rounded bg-white/10" />
      <div className="h-8 w-full rounded-full bg-white/10 mt-4" />
    </div>
  </div>
)

// ── Pagination controls ─────────────────────────────────────────────────────
interface PaginationProps {
  currentPage: number
  totalPages: number
  onGoTo: (page: number) => void
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onGoTo }) => {
  if (totalPages <= 1) return null

  const pages: (number | '...')[] = []
  if (totalPages <= 7) {
    for (let i = 1; i <= totalPages; i++) pages.push(i)
  } else {
    pages.push(1)
    if (currentPage > 3) pages.push('...')
    for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
      pages.push(i)
    }
    if (currentPage < totalPages - 2) pages.push('...')
    pages.push(totalPages)
  }

  return (
    <div className="flex items-center justify-center gap-2 mt-10 flex-wrap">
      <button
        onClick={() => onGoTo(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-3 py-2 rounded-lg text-sm font-medium bg-white/10 text-gray-300 hover:bg-white/20 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
      >
        ← Prev
      </button>

      {pages.map((p, i) =>
        p === '...' ? (
          <span key={`dots-${i}`} className="px-2 text-gray-500">…</span>
        ) : (
          <button
            key={p}
            onClick={() => onGoTo(p as number)}
            className={`w-9 h-9 rounded-lg text-sm font-semibold transition-all ${
              currentPage === p
                ? 'bg-[#e94560] text-white shadow-lg shadow-[#e94560]/30 scale-105'
                : 'bg-white/10 text-gray-300 hover:bg-white/20'
            }`}
          >
            {p}
          </button>
        )
      )}

      <button
        onClick={() => onGoTo(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-3 py-2 rounded-lg text-sm font-medium bg-white/10 text-gray-300 hover:bg-white/20 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
      >
        Next →
      </button>
    </div>
  )
}

// ── Main component ──────────────────────────────────────────────────────────
interface ProductGridProps {
  selectedCategory?: Category
  setSelectedCategory?: (category: Category) => void
  addToCart: (product: CartProduct) => void
}

const ProductGrid: React.FC<ProductGridProps> = ({
  selectedCategory,
  setSelectedCategory,
  addToCart,
}) => {
  const navigate = useNavigate()
  const location = useLocation()
  const { category } = useParams<{ category?: string }>()

  const activeCategory = normaliseCategory(category || selectedCategory)

  useEffect(() => {
    if (setSelectedCategory) setSelectedCategory(normaliseCategory(category))
  }, [category, setSelectedCategory])

  const basePath = location.pathname.startsWith('/customer') ? '/customer' : ''

  const handleFilterClick = (cat: Category): void => {
    if (typeof setSelectedCategory === 'function') setSelectedCategory(cat)
    if (cat === 'All') navigate(`${basePath}/products`)
    else navigate(`${basePath}/products/${cat}`)
  }

  const {
    visibleProducts,
    allFiltered,
    currentPage,
    totalPages,
    hasMore,
    isLoading,
    sentinelRef,
    goToPage,
  } = useInfiniteProducts(activeCategory)

  return (
    <section className="px-4 py-8 md:py-[60px] md:px-[40px] flex-1 bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#0f3460]">

      {/* Header */}
      <h2 className="text-center text-[1.5rem] mb-1.5 text-[#b9b9bd]">
        {activeCategory !== 'All' ? `${activeCategory} Products` : 'All Products'}
      </h2>
      <p className="text-center text-[#555] text-[0.85rem] mb-2">
        Browse our curated collection
      </p>

      {/* Product count */}
      <p className="text-center text-[#888] text-xs mb-5">
        Showing <span className="text-[#e94560] font-semibold">{visibleProducts.length}</span> of{' '}
        <span className="font-semibold text-gray-400">{allFiltered.length}</span> products
      </p>

      {/* Category filters */}
      <div className="flex gap-2.5 overflow-x-auto whitespace-nowrap py-1 mb-5 pb-4 md:justify-center md:overflow-x-visible [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {categories.map((cat) => (
          <button
            key={cat}
            className={`px-4 py-1.5 border border-black/30 rounded-full text-[0.8rem] font-semibold cursor-pointer transition-all ${
              activeCategory === cat
                ? 'bg-[#e94560] text-white border-[#e94560] shadow-md shadow-[#e94560]/30'
                : 'bg-white/10 text-gray-300 hover:bg-white/20'
            }`}
            onClick={() => handleFilterClick(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid */}
      {allFiltered.length === 0 ? (
        <p className="text-center text-gray-400 mt-10">
          No products found in "{activeCategory}".
        </p>
      ) : (
        <>
          <div className="grid grid-cols-2 gap-3 max-w-[1200px] mx-auto md:grid-cols-[repeat(auto-fill,minmax(240px,1fr))] md:gap-[25px]">
            {visibleProducts.map((product, index) => (
              <LazyCard key={product.id} index={index % 6}>
                <ProductCard product={product} addToCart={addToCart} />
              </LazyCard>
            ))}

            {/* Loading skeletons */}
            {isLoading &&
              Array.from({ length: 3 }).map((_, i) => <SkeletonCard key={`skel-${i}`} />)
            }
          </div>

          {/* Infinite scroll sentinel */}
          <div ref={sentinelRef} className="h-10 mt-4 flex items-center justify-center">
            {isLoading && (
              <div className="flex gap-2">
                {[0, 1, 2].map((i) => (
                  <span
                    key={i}
                    className="w-2 h-2 rounded-full bg-[#e94560] animate-bounce"
                    style={{ animationDelay: `${i * 0.15}s` }}
                  />
                ))}
              </div>
            )}
            {!hasMore && visibleProducts.length > 0 && !isLoading && (
              <p className="text-gray-600 text-xs tracking-widest uppercase">
                ✦ All products loaded ✦
              </p>
            )}
          </div>

          {/* Pagination controls */}
          <Pagination currentPage={currentPage} totalPages={totalPages} onGoTo={goToPage} />
        </>
      )}
    </section>
  )
}

export default ProductGrid
