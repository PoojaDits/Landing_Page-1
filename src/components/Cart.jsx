import React from "react";

const Cart = ({ cartItems, removeFromCart, updateQuantity, closeCart }) => {
  const total = cartItems
    .reduce((sum, item) => sum + item.price * item.quantity, 0)
    .toFixed(2);

  return (
    <>
      <div className="fixed inset-0 bg-black/60 z-[999]" onClick={closeCart} />
      <div className="fixed top-0 right-0 w-full md:w-[400px] h-full bg-white z-[1000] flex flex-col animate-slide-in">
        <div className="p-4 bg-[#1a1a2e] text-white flex justify-between items-center relative">
          <h2 className="text-xl font-bold m-0">🛒 Your Cart</h2>
          <button className="bg-transparent border-none text-[22px] cursor-pointer text-white absolute top-3.5 right-4" onClick={closeCart}>✕</button>
        </div> 

        <div className="flex-1 overflow-y-auto p-4">
          {cartItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-gray-500 mt-20">
              <span className="text-4xl mb-4">🛍️</span>
              Your cart is empty
            </div>
          ) : (
            cartItems.map((item) => (
              <div key={item.id} className="flex gap-2.5 py-2.5 border-b border-[#eee] items-center">
                <div className="text-2xl bg-[#f5f5f5] w-11 h-11 flex items-center justify-center rounded-lg">{item.emoji}</div>
                <div className="flex-1">
                  <p className="text-[0.85rem] font-bold m-0">{item.name}</p>
                  <p className="text-[0.8rem] text-[#e94560] m-0 font-semibold">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
                <div className="flex items-center gap-1.5">
                  <button
                    className="w-6 h-6 border border-[#ddd] bg-white rounded cursor-pointer flex items-center justify-center hover:bg-gray-100 font-bold"
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  >
                    −
                  </button>
                  <span className="text-sm font-semibold w-4 text-center">{item.quantity}</span>
                  <button
                    className="w-6 h-6 border border-[#ddd] bg-white rounded cursor-pointer flex items-center justify-center hover:bg-gray-100 font-bold"
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  >
                    +
                  </button>
                </div>
                <button
                  className="bg-transparent border-none text-red-500 cursor-pointer text-lg hover:text-red-700 ml-2"
                  onClick={() => removeFromCart(item.id)}
                >
                  🗑
                </button>
              </div>
            ))
          )}
        </div>

        {cartItems.length > 0 && (
          <div className="p-4 border-t border-[#eee]">
            <div className="flex justify-between font-bold mb-3">
              <span>Total</span>
              <span className="text-[#e94560]">${total}</span>
            </div>
            <button className="w-full p-3 bg-gradient-to-br from-[#e94560] to-[#f093fb] text-white border-none rounded-lg font-bold cursor-pointer hover:shadow-lg hover:-translate-y-0.5 transition-all">Proceed to Checkout →</button>
          </div>
        )}
      </div>
    </>
  );
};

export default Cart;