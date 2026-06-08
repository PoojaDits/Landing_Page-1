import { useCartStore } from '@/store/useCartStore'
import type { UseCartReturn } from '@/types'

function useCart(): UseCartReturn {
  const store = useCartStore()

  return {
    cartItems: store.cartItems,
    isCartOpen: store.isCartOpen,
    totalItems: store.totalItems,
    addToCart: store.addToCart,
    removeFromCart: store.removeFromCart,
    updateQuantity: store.updateQuantity,
    toggleCart: store.toggleCart,
    closeCart: store.closeCart,
    clearCart: store.clearCart,
  }
}

export default useCart
