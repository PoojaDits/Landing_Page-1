import { useState } from 'react';

function useCart() {
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  function addToCart(product) {
    const alreadyInCart = cartItems.find(item => item.id === product.id);
    if (alreadyInCart) {
      setCartItems(cartItems.map(item =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      ));
    } else {
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
    }
  }

  function removeFromCart(id) {
    setCartItems(cartItems.filter(item => item.id !== id));
  }

  function updateQuantity(id, quantity) {
    if (quantity < 1) {
      removeFromCart(id);
      return;
    }
    setCartItems(cartItems.map(item =>
      item.id === id ? { ...item, quantity } : item
    ));
  }

  function toggleCart() {
    setIsCartOpen(!isCartOpen);
  }

  function closeCart() {
    setIsCartOpen(false);
  }

  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);

  return {
    cartItems,
    isCartOpen,
    totalItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    toggleCart,
    closeCart,
  };
}

export default useCart;
