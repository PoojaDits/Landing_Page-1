import type { FC } from 'react'
import { useParams } from 'react-router-dom'

interface ProductDetailProps {
  id?: string
}

const ProductDetail: FC<ProductDetailProps> = () => {
  const { id } = useParams<{ id: string }>()

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#0f3460] py-12">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-white mb-8">
          Product Detail #{id}
        </h1>
        <p className="text-gray-400">
          Product detail page content goes here
        </p>
      </div>
    </div>
  )
}

export default ProductDetail
