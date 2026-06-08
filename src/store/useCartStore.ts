import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { CartState, CartActions } from '@/types';

interface CartStore extends CartState, CartActions { }

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      cartItems: [],
      isCartOpen: false,
      totalItems: 0,

      addToCart: (product) => {
        const { cartItems } = get();
        const existingItem = cartItems.find((item) => item.id === product.id);

        let newCartItems;
        if (existingItem) {
          newCartItems = cartItems.map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          );
        } else {
          newCartItems = [...cartItems, { ...product, quantity: 1 }];
        }

        set({
          cartItems: newCartItems,
          totalItems: newCartItems.reduce((acc, item) => acc + item.quantity, 0)
        });
      },

      removeFromCart: (id) => {
        const { cartItems } = get();
        const newCartItems = cartItems.filter((item) => item.id !== id);

        set({
          cartItems: newCartItems,
          totalItems: newCartItems.reduce((acc, item) => acc + item.quantity, 0)
        });
      },

      updateQuantity: (id, quantity) => {
        const { cartItems, removeFromCart } = get();

        if (quantity < 1) {
          removeFromCart(id);
          return;
        }

        const newCartItems = cartItems.map((item) =>
          item.id === id ? { ...item, quantity } : item
        );

        set({
          cartItems: newCartItems,
          totalItems: newCartItems.reduce((acc, item) => acc + item.quantity, 0)
        });
      },

      toggleCart: () => set((state) => ({ isCartOpen: !state.isCartOpen })),
      closeCart: () => set({ isCartOpen: false }),
      clearCart: () => set({ cartItems: [], totalItems: 0 }),
    }),
    {
      name: 'cart-storage',
      partialize: (state) => ({
        cartItems: state.cartItems,
        totalItems: state.totalItems
      }),
    }
  )
);
