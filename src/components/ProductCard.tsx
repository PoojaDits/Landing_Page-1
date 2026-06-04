import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import type { ProductCardProps } from '@/types'

const ProductCard: React.FC<ProductCardProps> = ({ product, addToCart }) => {
  const navigate = useNavigate()
  const location = useLocation()

  const basePath = location.pathname.startsWith('/customer')
    ? '/customer'
    : ''

  const renderStars = (rating: number): string => {
    return '★'.repeat(Math.floor(rating)) + '☆'.repeat(5 - Math.floor(rating))
  }

  return (
    <Card
      className="flex flex-col cursor-pointer overflow-hidden transition-all hover:shadow-lg hover:-translate-y-1 bg-white"
      onClick={() => navigate(`${basePath}/product/${product.id}`)}
    >
      <div className="h-[140px] md:h-[200px] bg-muted/30 flex items-center justify-center text-[2.5rem] md:text-[4rem] relative overflow-hidden">
        {product.image ? (
          
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <span>{product.emoji || '📦'}</span>
        )}

        {product.badge && (
          <Badge className="absolute top-2 left-2 px-2 py-0 text-[0.65rem] font-bold">
            {product.badge}
          </Badge>
        )}
      </div>

      <CardContent className="p-4 flex flex-col grow text-black">
        <p className="text-[0.65rem] text-muted-foreground font-bold uppercase tracking-wider">
          {product.category}
        </p>
        <h3 className="text-base md:text-lg font-bold my-1 text-foreground leading-tight">
          {product.name}
        </h3>
        <div className="text-xs text-muted-foreground mb-4 flex items-center">
          <span className="text-yellow-500 mr-1 text-sm">
            {renderStars(product.rating)}
          </span>
          <span>({product.reviews})</span>
        </div>
      </CardContent>

      <CardFooter className="text-black p-4 pt-0 flex flex-col md:flex-row md:justify-between items-start md:items-center gap-3">
        <div className="flex items-center gap-2">
          <span className="text-lg md:text-xl font-extrabold">
            ${product.price}
          </span>
          {product.originalPrice && (
            <span className="text-sm line-through text-muted-foreground">
              ${product.originalPrice}
            </span>
          )}
        </div>

        <Button
          className="w-full md:w-auto font-semibold text-white border-0 rounded-full mt-4"
          onClick={(e) => {
            e.stopPropagation()
            addToCart({ ...product, quantity: 1 })
          }}
        >
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  )
}

export default ProductCard
