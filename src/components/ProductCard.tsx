import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { useCartStore } from '@/store/useCartStore'
import type { ProductCardProps } from '@/types'

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const navigate = useNavigate()
  const location = useLocation()
  const addToCart = useCartStore((state) => state.addToCart)

  const basePath = location.pathname.startsWith('/customer')
    ? '/customer'
    : ''

  const renderStars = (rating: number): string => {
    return '★'.repeat(Math.floor(rating)) + '☆'.repeat(5 - Math.floor(rating))
  }

  return (
    <Card
      className="group flex flex-col cursor-pointer overflow-hidden transition-all hover:shadow-xl hover:-translate-y-1 bg-white rounded-3xl border border-white/10"
      onClick={() => navigate(`${basePath}/product/${product.id}`)}
    >
      <div className="h-[160px] md:h-[220px] bg-gradient-to-br from-pink-50 via-white to-orange-50 flex items-center justify-center relative overflow-hidden rounded-t-3xl">
        {product.image ? (
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover transition-transform group-hover:scale-105 duration-300"
          />
        ) : (
          <span className="text-6xl text-gray-300">{product.emoji || '📦'}</span>
        )}

        {product.badge && (
          <Badge className="absolute top-3 left-3 px-2.5 py-0.5 text-[10px] font-bold bg-white/90 text-gray-800 shadow-sm">
            {product.badge}
          </Badge>
        )}
      </div>

      <CardContent className="p-4 flex flex-col grow text-black">
        <p className="text-[10px] text-muted-foreground font-semibold uppercase tracking-[1px] mb-0.5">
          {product.category}
        </p>
        <h3 className="text-[15px] md:text-[17px] font-semibold leading-snug text-black mb-1.5 line-clamp-2">
          {product.name}
        </h3>
        <div className="flex items-center gap-1 text-xs text-muted-foreground mb-1">
          <span className="text-yellow-500 text-sm tracking-[-1px]">
            {renderStars(product.rating)}
          </span>
          <span className="text-[11px] text-gray-500">({product.reviews})</span>
        </div>
      </CardContent>

      <CardFooter className="text-black p-4 pt-1 flex flex-col gap-2.5">
        <div className="flex items-baseline gap-2">
          <span className="text-[17px] md:text-xl font-bold text-black">
            ${product.price}
          </span>
          {product.originalPrice && (
            <span className="text-xs text-gray-400 line-through">
              ${product.originalPrice}
            </span>
          )}
        </div>

        <Button
          className="w-full h-9 text-sm font-semibold text-white border-0 rounded-full bg-[#e94560] hover:bg-[#c73652] shadow-sm active:scale-[0.985] transition"
          onClick={(e) => {
            e.stopPropagation()
            if (addToCart) {
              addToCart({ ...product, quantity: 1 })
            } else {
              console.error('addToCart action not found')
            }
          }}
        >
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  )
}

export default ProductCard
