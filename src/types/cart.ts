/**
 * Cart Types
 */

import type { CartProduct } from './product';

export interface CartState {
  cartItems: CartProduct[];
  isCartOpen: boolean;
  totalItems: number;
}

export interface CartActions {
  addToCart: (product: CartProduct) => void;
  removeFromCart: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  toggleCart: () => void;
  closeCart: () => void;
  clearCart: () => void;
}

export interface UseCartReturn extends CartState, CartActions {}
