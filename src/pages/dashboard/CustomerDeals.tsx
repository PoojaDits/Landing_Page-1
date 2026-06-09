import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useCartStore } from '@/store/useCartStore'
import toast from 'react-hot-toast'

interface DealProduct {
    id: number
    name: string
    category?: string
    price?: number
    originalPrice?: number
    image?: string
    rating?: number
    reviews?: number
    badge?: string
}

const CustomerDeals: React.FC = () => {
    const [deals, setDeals] = useState<DealProduct[]>([])
    const [loading, setLoading] = useState(true)
    const addToCart = useCartStore((state) => state.addToCart)

    const fetchDeals = async () => {
        setLoading(true)
        try {
            const res = await fetch('http://localhost:3001/products')
            const data: DealProduct[] = await res.json()

            const onSale = data.filter(p => p.originalPrice && p.originalPrice > (p.price || 0))
            setDeals(onSale.length > 0 ? onSale : data.slice(0, 8))
        } catch {
            setDeals([
                { id: 1, name: "Wireless Headphones", category: "Electronics", price: 79.99, originalPrice: 99.99, image: "https://images.unsplash.com/photo-1613040809024-b4ef7ba99bc3?w=600&auto=format&fit=crop&q=80", rating: 4, reviews: 128, badge: "Sale" },
                { id: 3, name: "Smart Watch", category: "Electronics", price: 149.99, originalPrice: 199.99, image: "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=600&auto=format&fit=crop&q=80", rating: 4, reviews: 87, badge: "Hot" },
                { id: 5, name: "Sunglasses", category: "Accessories", price: 34.99, originalPrice: 49.99, image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=600&auto=format&fit=crop&q=80", rating: 3, reviews: 192, badge: "Sale" },
                { id: 2, name: "Running Sneakers", category: "Footwear", price: 59.99, originalPrice: 79.99, image: "https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=600&auto=format&fit=crop&q=80", rating: 5, reviews: 245, badge: "New" }
            ])
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchDeals()
    }, [])

    const handleAddToCart = (product: DealProduct) => {
        addToCart({
            id: product.id,
            name: product.name,
            price: product.price || 0,
            image: product.image || '',
            quantity: 1,
            category: product.category || 'All',
            rating: product.rating || 0,
            reviews: product.reviews || 0,
        })
        toast.success(`${product.name} added to cart!`)
    }

    const calculateDiscount = (price: number, original: number) => {
        return Math.round(((original - price) / original) * 100)
    }

    return (
        <div className="max-w-7xl mx-auto p-6 sm:p-8">
            <div className="mb-8">
                <div className="flex items-center gap-3">
                    <h1 className="text-4xl font-semibold text-white">Hot Deals</h1>
                    <span className="px-3 py-1 rounded-full bg-[#e94560] text-white text-xs font-bold">LIMITED TIME</span>
                </div>
                <p className="text-slate-300 mt-2 max-w-2xl">
                    Grab these amazing discounts before they're gone.
                </p>
            </div>

            {loading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {Array.from({ length: 8 }).map((_, i) => (
                        <div key={i} className="bg-slate-950/90 rounded-3xl h-96 animate-pulse border border-white/10" />
                    ))}
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {deals.map((deal) => {
                        const discount = deal.originalPrice && deal.price
                            ? calculateDiscount(deal.price, deal.originalPrice)
                            : 0

                        return (
                            <div key={deal.id} className="group bg-slate-950/90 rounded-3xl overflow-hidden border border-white/10 flex flex-col transition-all hover:border-white/30">
                                <div className="relative h-52 bg-black/30">
                                    {deal.image ? (
                                        <img src={deal.image} alt={deal.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-gray-600 text-5xl">📦</div>
                                    )}
                                    {discount > 0 && (
                                        <div className="absolute top-3 left-3 bg-[#e94560] text-white text-xs font-bold px-3 py-1 rounded-full">
                                            -{discount}%
                                        </div>
                                    )}
                                    {deal.badge && (
                                        <div className="absolute top-3 right-3 bg-white/90 text-black text-[10px] font-bold px-2.5 py-0.5 rounded-full">
                                            {deal.badge}
                                        </div>
                                    )}
                                </div>

                                <div className="p-5 flex flex-col flex-1">
                                    <div className="flex-1">
                                        <p className="text-xs text-[#e94560] font-semibold uppercase tracking-wider">{deal.category}</p>
                                        <h3 className="text-white font-semibold text-lg leading-tight mt-1 line-clamp-2">{deal.name}</h3>

                                        <div className="flex items-baseline gap-2 mt-3">
                                            <span className="text-2xl font-bold text-white">${deal.price?.toFixed(2)}</span>
                                            {deal.originalPrice && (
                                                <span className="text-sm text-gray-400 line-through">${deal.originalPrice.toFixed(2)}</span>
                                            )}
                                        </div>

                                        {deal.rating && (
                                            <div className="flex items-center gap-1 mt-2 text-sm">
                                                <span className="text-yellow-400">★</span>
                                                <span className="text-white font-medium">{deal.rating}</span>
                                                {deal.reviews && <span className="text-gray-400">({deal.reviews})</span>}
                                            </div>
                                        )}
                                    </div>

                                    <div className="flex gap-3 mt-5">
                                        <Link to={`/customer/product/${deal.id}`} className="flex-1 text-center border border-white/20 hover:bg-white/5 text-white text-sm font-medium py-2.5 rounded-2xl transition">
                                            View Details
                                        </Link>
                                        <button onClick={() => handleAddToCart(deal)} className="flex-1 bg-[#e94560] hover:bg-[#c73652] text-white text-sm font-semibold py-2.5 rounded-2xl transition">
                                            Add to Cart
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            )}
        </div>
    )
}

export default CustomerDeals