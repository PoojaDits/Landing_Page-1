import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import toast from 'react-hot-toast'

interface ProductItem {
  id: number
  name: string
  category?: string
  price?: number
  originalPrice?: number
  description?: string
  image?: string
  badge?: string
  rating?: number
  reviews?: number
}

const CATEGORIES = [
  'Electronics', 'Footwear', 'Accessories',
  'Kitchen', 'Sports', 'Clothes', 'Perfumes', 'Bags', 'Makeup',
]

const ProductsManagement: React.FC = () => {
  const [products, setProducts] = useState<ProductItem[]>([])
  const [loading, setLoading] = useState(false)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [editData, setEditData] = useState<Partial<ProductItem>>({})
  const [search, setSearch] = useState('')
  const [filterCategory, setFilterCategory] = useState('All')
  const [draggedId, setDraggedId] = useState<number | null>(null)

  // ── Drag & Drop ─────────────────────────────────────────────────────────────
  const handleDragStart = (e: React.DragEvent, id: number) => {
    setDraggedId(id)
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault() // Allow drop
  }

  const handleDrop = (e: React.DragEvent, targetId: number) => {
    e.preventDefault()
    if (!draggedId || draggedId === targetId) return

    setProducts((prev) => {
      const newProducts = [...prev]
      const draggedIndex = newProducts.findIndex((p) => p.id === draggedId)
      const targetIndex = newProducts.findIndex((p) => p.id === targetId)
      
      if (draggedIndex !== -1 && targetIndex !== -1) {
        // Swap the items
        const temp = newProducts[draggedIndex]
        newProducts[draggedIndex] = newProducts[targetIndex]
        newProducts[targetIndex] = temp
      }
      return newProducts
    })
    setDraggedId(null)
  }

  const fetchProducts = () => {
    setLoading(true)
    fetch('http://localhost:3001/products')
      .then((r) => r.json())
      .then((data) => setProducts(data || []))
      .catch(() => toast.error('Could not load products'))
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  // ── Delete ──────────────────────────────────────────────────────────────────
  const handleDelete = async (id: number) => {
    if (!window.confirm('Delete this product?')) return
    setLoading(true)
    try {
      const res = await fetch(`http://localhost:3001/products/${id}`, { method: 'DELETE' })
      if (!res.ok) throw new Error()
      toast.success('Product deleted')
      setProducts((prev) => prev.filter((p) => p.id !== id))
    } catch {
      toast.error('Could not delete product')
    } finally {
      setLoading(false)
    }
  }

  // ── Edit ────────────────────────────────────────────────────────────────────
  const handleEdit = (product: ProductItem) => {
    setEditingId(product.id)
    setEditData({ ...product })
  }

  const handleSaveEdit = async () => {
    if (!editingId) return
    setLoading(true)
    try {
      const res = await fetch(`http://localhost:3001/products/${editingId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: editData.name,
          category: editData.category,
          price: editData.price ? Number(editData.price) : undefined,
          originalPrice: editData.originalPrice ? Number(editData.originalPrice) : undefined,
          description: editData.description,
          image: editData.image,
          badge: editData.badge,
        }),
      })
      if (!res.ok) throw new Error()
      const updated: ProductItem = await res.json()
      setProducts((prev) => prev.map((p) => (p.id === editingId ? updated : p)))
      toast.success('Product updated')
      setEditingId(null)
      setEditData({})
    } catch {
      toast.error('Could not update product')
    } finally {
      setLoading(false)
    }
  }

  // ── Filtered list ───────────────────────────────────────────────────────────
  const displayed = products.filter((p) => {
    const matchSearch = p.name?.toLowerCase().includes(search.toLowerCase())
    const matchCat = filterCategory === 'All' || p.category === filterCategory
    return matchSearch && matchCat
  })

  return (
    <div className="p-6 min-h-screen bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#0f3460]">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white">Products</h1>
          <p className="text-gray-400 text-sm mt-0.5">{products.length} total products</p>
        </div>
        <Link
          to="new"
          className="bg-[#e94560] hover:bg-[#c73652] text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors"
        >
          + Add Product
        </Link>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 mb-6">
        <input
          type="text"
          placeholder="Search products…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 min-w-[180px] px-3 py-2 rounded-lg bg-white/10 text-white placeholder-gray-400 border border-white/10 text-sm focus:outline-none focus:border-[#e94560]"
        />
        <select
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
          className="px-3 py-2 rounded-lg bg-white/10 text-white border border-white/10 text-sm focus:outline-none focus:border-[#e94560]"
        >
          <option value="All">All Categories</option>
          {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
        </select>
      </div>

      {/* Loading skeleton */}
      {loading && products.length === 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="bg-white/5 rounded-xl animate-pulse h-72" />
          ))}
        </div>
      )}

      {/* Empty state */}
      {!loading && displayed.length === 0 && (
        <div className="text-center py-20 text-gray-400">
          <p className="text-5xl mb-4">📦</p>
          <p className="text-lg">No products found</p>
        </div>
      )}

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {displayed.map((p) => (
          <div
            key={p.id}
            draggable={!editingId}
            onDragStart={(e) => handleDragStart(e, p.id)}
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, p.id)}
            className={`bg-white/5 border rounded-xl overflow-hidden flex flex-col transition-all 
              ${!editingId ? 'cursor-grab active:cursor-grabbing' : ''}
              ${draggedId === p.id ? 'opacity-40 border-[#e94560] scale-95' : 'border-white/10 hover:border-white/20 hover:shadow-lg'}
            `}
          >
            {editingId === p.id ? (
              /* ── Edit Mode ── */
              <div className="p-4 space-y-2 flex-1">
                <p className="text-[#e94560] text-xs font-semibold uppercase tracking-wider mb-3">Editing #{p.id}</p>

                <input
                  type="text"
                  value={editData.name || ''}
                  onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                  placeholder="Product name"
                  className="w-full px-3 py-1.5 rounded-lg bg-white/10 text-white border border-white/20 text-sm focus:outline-none focus:border-[#e94560]"
                />

                <select
                  value={editData.category || ''}
                  onChange={(e) => setEditData({ ...editData, category: e.target.value })}
                  className="w-full px-3 py-1.5 rounded-lg bg-white/10 text-white border border-white/20 text-sm focus:outline-none focus:border-[#e94560]"
                >
                  <option value="">Select category</option>
                  {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
                </select>

                <div className="flex gap-2">
                  <input
                    type="number"
                    value={editData.price ?? ''}
                    onChange={(e) => setEditData({ ...editData, price: Number(e.target.value) })}
                    placeholder="Price ($)"
                    className="w-1/2 px-3 py-1.5 rounded-lg bg-white/10 text-white border border-white/20 text-sm focus:outline-none focus:border-[#e94560]"
                  />
                  <input
                    type="number"
                    value={editData.originalPrice ?? ''}
                    onChange={(e) => setEditData({ ...editData, originalPrice: Number(e.target.value) })}
                    placeholder="Orig. price"
                    className="w-1/2 px-3 py-1.5 rounded-lg bg-white/10 text-white border border-white/20 text-sm focus:outline-none focus:border-[#e94560]"
                  />
                </div>

                <input
                  type="text"
                  value={editData.badge || ''}
                  onChange={(e) => setEditData({ ...editData, badge: e.target.value })}
                  placeholder="Badge (Sale / New / Hot)"
                  className="w-full px-3 py-1.5 rounded-lg bg-white/10 text-white border border-white/20 text-sm focus:outline-none focus:border-[#e94560]"
                />

                <input
                  type="text"
                  value={editData.image || ''}
                  onChange={(e) => setEditData({ ...editData, image: e.target.value })}
                  placeholder="Image URL"
                  className="w-full px-3 py-1.5 rounded-lg bg-white/10 text-white border border-white/20 text-sm focus:outline-none focus:border-[#e94560]"
                />

                <div className="flex gap-2 pt-1">
                  <button
                    onClick={handleSaveEdit}
                    disabled={loading}
                    className="flex-1 bg-green-600 hover:bg-green-700 text-white py-1.5 rounded-lg text-sm font-semibold disabled:opacity-50 transition-colors"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => { setEditingId(null); setEditData({}) }}
                    disabled={loading}
                    className="flex-1 bg-white/10 hover:bg-white/20 text-gray-300 py-1.5 rounded-lg text-sm font-semibold disabled:opacity-50 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              /* ── View Mode ── */
              <>
                <div className="relative h-44 bg-black/20">
                  {p.image ? (
                    <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-600 text-4xl">📦</div>
                  )}
                  {p.badge && (
                    <span className="absolute top-2 left-2 bg-[#e94560] text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                      {p.badge}
                    </span>
                  )}
                  <span className="absolute top-2 right-2 bg-black/60 text-gray-300 text-[10px] px-2 py-0.5 rounded-full">
                    #{p.id}
                  </span>
                </div>

                <div className="p-3 flex flex-col flex-1">
                  <p className="text-[10px] text-[#e94560] font-semibold uppercase tracking-wider mb-0.5">{p.category}</p>
                  <p className="text-white text-sm font-semibold leading-tight mb-1 line-clamp-2">{p.name}</p>

                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-[#e94560] font-bold text-sm">${p.price?.toFixed(2)}</span>
                    {p.originalPrice && (
                      <span className="text-gray-500 text-xs line-through">${p.originalPrice?.toFixed(2)}</span>
                    )}
                    {p.reviews && (
                      <span className="text-gray-500 text-xs ml-auto">⭐ {p.rating} ({p.reviews})</span>
                    )}
                  </div>

                  <div className="flex gap-2 mt-auto">
                    <button
                      onClick={() => handleEdit(p)}
                      disabled={loading}
                      className="flex-1 bg-blue-600/80 hover:bg-blue-600 text-white py-1.5 rounded-lg text-xs font-semibold disabled:opacity-50 transition-colors"
                    >
                      ✏️ Edit
                    </button>
                    <button
                      onClick={() => handleDelete(p.id)}
                      disabled={loading}
                      className="flex-1 bg-red-600/80 hover:bg-red-600 text-white py-1.5 rounded-lg text-xs font-semibold disabled:opacity-50 transition-colors"
                    >
                      🗑️ Delete
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default ProductsManagement
