import React, { useEffect } from 'react'
import ProductCard from '@/components/ProductCard'
import { useProducts } from '@/hooks/useProducts'
import { useProductStore } from '@/store/useProductStore'

const Deals: React.FC = () => {
    // Reset product store filters so Deals page is independent of Products page state
    // (prevents category/search/sort from one page affecting the other)
    useEffect(() => {
        const { setCategory, setSearchQuery, setSortBy } = useProductStore.getState()
        setCategory('All')
        setSearchQuery('')
        setSortBy('none')
    }, [])

    // Use the shared React Query hook — gets caching, loading states, etc. for free
    // Force 'All' to ensure we get full list before filtering for deals
    const { products: allProducts, isLoading, isFetching, error } = useProducts('All')

    // Client-side filter for deals only (products with discount)
    const deals = allProducts.filter(
        (p) => p.originalPrice && p.originalPrice > p.price
    )

    // Show fallback only if we have no data at all (offline / first load failure)
    const displayDeals = deals.length > 0 ? deals : allProducts.slice(0, 8)

    if (error) {
        return (
            <div className="max-w-7xl mx-auto p-6 sm:p-8 text-center text-red-400">
                Failed to load deals. Please try again.
            </div>
        )
    }

    return (
        <div className="max-w-7xl mx-auto p-6 sm:p-8">
            <div className="mb-8">
                <div className="flex items-center gap-3">
                    <h1 className="text-4xl font-semibold text-white">Hot Deals</h1>
                    <span className="px-3 py-1 rounded-full bg-[#e94560] text-white text-xs font-bold">LIMITED TIME</span>
                </div>
                <p className="text-slate-300 mt-2 max-w-2xl">
                    Exclusive discounts on selected products. Limited stock — grab them before they’re gone!
                </p>
            </div>

            {isLoading ? (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {Array.from({ length: 8 }).map((_, i) => (
                        <div key={i} className="rounded-xl overflow-hidden bg-white/5 border border-white/10 animate-pulse h-[380px]" />
                    ))}
                </div>
            ) : displayDeals.length === 0 ? (
                <div className="text-center py-20 text-gray-400">
                    <p className="text-6xl mb-4">🔥</p>
                    <p className="text-xl">No deals available right now</p>
                </div>
            ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {displayDeals.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            )}

            {isFetching && !isLoading && (
                <div className="text-center mt-4 text-sm text-gray-400">Refreshing deals…</div>
            )}
        </div>
    )
}

export { Deals }
