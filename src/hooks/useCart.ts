import { useState } from 'react'
import type { CartProduct, UseCartReturn } from '@/types'

function useCart(): UseCartReturn {
  const [cartItems, setCartItems] = useState<CartProduct[]>([])
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false)

  function addToCart(product: CartProduct): void {
    const alreadyInCart = cartItems.find((item) => item.id === product.id)
    if (alreadyInCart) {
      setCartItems(
        cartItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      )
    } else {
      setCartItems([...cartItems, { ...product, quantity: 1 }])
    }
  }

  function removeFromCart(id: number): void {
    setCartItems(cartItems.filter((item) => item.id !== id))
  }

  function updateQuantity(id: number, quantity: number): void {
    if (quantity < 1) {
      removeFromCart(id)
      return
    }
    setCartItems(
      cartItems.map((item) =>
        item.id === id ? { ...item, quantity } : item
      )
    )
  }

  function toggleCart(): void {
    setIsCartOpen(!isCartOpen)
  }

  function closeCart(): void {
    setIsCartOpen(false)
  }

  function clearCart(): void {
    setCartItems([])
    setIsCartOpen(false)
  }

  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0)

  return {
    cartItems,
    isCartOpen,
    totalItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    toggleCart,
    closeCart,
    clearCart,
  }
}

export default useCart
