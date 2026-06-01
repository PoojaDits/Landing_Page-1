import React from 'react'
import ProductGrid from './ProductGrid'
import type { Category, CartProduct } from '@/types'

interface ProductPageProps {
  selectedCategory?: Category
  setSelectedCategory?: (category: Category) => void
  addToCart: (product: CartProduct) => void
}

const ProductPage: React.FC<ProductPageProps> = ({
  selectedCategory,
  setSelectedCategory,
  addToCart,
}) => {
  return (
    <div>
      <ProductGrid
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        addToCart={addToCart}
      />
    </div>
  )
}

export default ProductPage
