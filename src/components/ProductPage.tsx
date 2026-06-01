import React from 'react'
import ProductGrid from './ProductGrid'
import type { ProductGridProps } from '@/types'

const ProductPage: React.FC<ProductGridProps> = ({
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
