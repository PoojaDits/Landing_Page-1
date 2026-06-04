import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'

const AddProduct: React.FC = () => {
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [category, setCategory] = useState('Electronics')
  const [price, setPrice] = useState('0')
  const [rating, setRating] = useState('5')
  const [reviews, setReviews] = useState('0')
  const [description, setDescription] = useState('')
  const [imageDataUrl, setImageDataUrl] = useState<string | null>(null)

  const handleImage = (file?: File) => {
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => {
      setImageDataUrl(String(reader.result))
    }
    reader.readAsDataURL(file)
  }
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const product = {
      name,
      category,
      price: Number(price),
      rating: Number(rating),
      reviews: Number(reviews),
      description,
      image: imageDataUrl,
    }

    try {
      const res = await fetch('http://localhost:3001/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(product),
      })
      if (!res.ok) throw new Error('Failed to add product')
      toast.success('Product added')
      navigate('/admin/products')
    } catch (err) {
      
      console.error(err)
      toast.error('Could not add product')
    }
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold text-white mb-4">Add Product</h1>
      <form onSubmit={handleSubmit} className="max-w-lg">
        <label className="block text-sm text-gray-300">Name</label>
        <input value={name} onChange={(e) => setName(e.target.value)} className="w-full p-2 rounded mb-3 text-black" />

        <label className="block text-sm text-gray-300">Category</label>
        <select value={category} onChange={(e) => setCategory(e.target.value)} className="w-full p-2 rounded mb-3 text-black">
          <option>Electronics</option>
          <option>Footwear</option>
          <option>Accessories</option>
          <option>Kitchen</option>
          <option>Sports</option>
          <option>Clothes</option>
          <option>Perfumes</option>
          <option>Bags</option>
          <option>Makeup</option>
        </select>

        <label className="block text-sm text-gray-300">Price</label>
        <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} className="w-full p-2 rounded mb-3 text-black" />

        {/* <label className="block text-sm text-gray-300">Rating</label>
        <input type="number" value={rating} onChange={(e) => setRating(e.target.value)} min={0} max={5} className="w-full p-2 rounded mb-3 text-black" />

        <label className="block text-sm text-gray-300">Reviews</label>
        <input type="number" value={reviews} onChange={(e) => setReviews(e.target.value)} className="w-full p-2 rounded mb-3 text-black" /> */}

        <label className="block text-sm text-gray-300">Description</label>
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} className="w-full p-2 rounded mb-3 text-black" />

        <label className="block text-sm text-gray-300">Image</label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => handleImage(e.target.files?.[0])}
          className="w-full mb-3"
        />

        {imageDataUrl && (
          <img src={imageDataUrl} alt="preview" className="w-48 h-48 object-cover mb-3 rounded" />
        )}
        <button type="submit" className="bg-[#e94560] text-white px-4 py-2 rounded">Save Product</button>
      </form>
    </div>
  )
}

export default AddProduct
