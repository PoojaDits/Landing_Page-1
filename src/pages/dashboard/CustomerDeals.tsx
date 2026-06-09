import React, { useEffect, useState } from 'react'
import ProductCard from '@/components/ProductCard'
import type { Product } from '@/types'

const CustomerDeals: React.FC = () => {
    const [deals, setDeals] = useState<Product[]>([])
    const [loading, setLoading] = useState(true)

    const fetchDeals = async () => {
        setLoading(true)
        try {
            const res = await fetch('http://localhost:3001/products')
            const data: Product[] = await res.json()

            // Only show products that have a discount (originalPrice)
            const onSale = data.filter((p) => p.originalPrice && p.originalPrice > p.price)
            setDeals(onSale.length > 0 ? onSale : data.slice(0, 8))
        } catch {
            // Fallback demo data with discounts
            setDeals([
                {
                    id: 1,
                    name: "Wireless Headphones",
                    category: "Electronics",
                    price: 79.99,
                    originalPrice: 99.99,
                    image: "https://images.unsplash.com/photo-1613040809024-b4ef7ba99bc3?w=600&auto=format&fit=crop&q=80",
                    rating: 4,
                    reviews: 128,
                    badge: "Sale",
                },
                {
                    id: 3,
                    name: "Smart Watch",
                    category: "Electronics",
                    price: 149.99,
                    originalPrice: 199.99,
                    image: "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=600&auto=format&fit=crop&q=80",
                    rating: 4,
                    reviews: 87,
                    badge: "Hot",
                },
                {
                    id: 5,
                    name: "Sunglasses",
                    category: "Accessories",
                    price: 34.99,
                    originalPrice: 49.99,
                    image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=600&auto=format&fit=crop&q=80",
                    rating: 3,
                    reviews: 192,
                    badge: "Sale",
                },
                {
                    id: 2,
                    name: "Running Sneakers",
                    category: "Footwear",
                    price: 59.99,
                    originalPrice: 79.99,
                    image: "https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=600&auto=format&fit=crop&q=80",
                    rating: 5,
                    reviews: 245,
                    badge: "New",
                },
            ])
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchDeals()
    }, [])

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

            {loading ? (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {Array.from({ length: 8 }).map((_, i) => (
                        <div key={i} className="rounded-xl overflow-hidden bg-white/5 border border-white/10 animate-pulse h-[380px]" />
                    ))}
                </div>
            ) : deals.length === 0 ? (
                <div className="text-center py-20 text-gray-400">
                    <p className="text-6xl mb-4">🔥</p>
                    <p className="text-xl">No deals available right now</p>
                </div>
            ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {deals.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            )}
        </div>
    )
}

export default CustomerDeals
