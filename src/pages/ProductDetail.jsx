import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import Button from "../components/Button";

const products = [
  { id: 1, name: "Wireless Headphones", category: "Electronics", price: 79.99, originalPrice: 99.99, rating: 4, reviews: 128, emoji: "🎧", badge: "Sale" },
  { id: 2, name: "Running Sneakers", category: "Footwear", price: 59.99, rating: 5, reviews: 245, emoji: "👟", badge: "New" },
  { id: 3, name: "Smart Watch", category: "Electronics", price: 149.99, originalPrice: 199.99, rating: 4, reviews: 87, emoji: "⌚", badge: "Hot" },
  { id: 4, name: "Leather Backpack", category: "Accessories", price: 89.99, rating: 4, reviews: 63, emoji: "🎒" },
  { id: 5, name: "Sunglasses", category: "Accessories", price: 34.99, originalPrice: 49.99, rating: 3, reviews: 192, emoji: "🕶️", badge: "Sale" },
  { id: 6, name: "Mechanical Keyboard", category: "Electronics", price: 119.99, rating: 5, reviews: 304, emoji: "⌨️", badge: "New" },
  { id: 7, name: "Coffee Maker", category: "Kitchen", price: 49.99, originalPrice: 69.99, rating: 4, reviews: 411, emoji: "☕", badge: "Sale" },
  { id: 8, name: "Yoga Mat", category: "Sports", price: 29.99, rating: 5, reviews: 155, emoji: "🧘" },
];

const ProductDetail = ({ addToCart }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = products.find((p) => p.id === parseInt(id));

  if (!product) {
    return (
      <div className="py-[100px] px-5 text-center">
        <h2 className="text-2xl font-bold mb-4">Product not found!</h2>
        <Button onClick={() => navigate('/products')}>Back to Products</Button>
      </div>
    );
  }

  return (
    <div className="py-10 px-5 max-w-[900px] mx-auto min-h-[80vh]">
      
      <button 
        onClick={() => navigate(-1)} 
        className="bg-none border-none text-[#e94560] cursor-pointer text-base mb-5 font-bold hover:opacity-80 transition-opacity"
      >
        ← Back
      </button>
      
      <div className="flex flex-wrap gap-10 bg-white p-10 rounded-[20px] shadow-[0_10px_30px_rgba(0,0,0,0.05)]">
      
        <div className="flex-1 min-w-[300px] text-[10rem] flex items-center justify-center bg-[#f8f9fa] rounded-[15px]">
          {product.emoji}
        </div>
        
  
        <div className="flex-1 min-w-[300px] flex flex-col justify-center">
          {product.badge && (
            <span className="bg-[#e94560] text-white px-3 py-1.5 rounded-full self-start mb-[15px] text-[0.85rem] font-bold">
              {product.badge}
            </span>
          )}
          
          <h1 className="text-4xl lg:text-[2.5rem] font-bold mb-2.5 text-[#1a1a2e]">
            {product.name}
          </h1>
          
          <p className="text-gray-500 text-[1.1rem] mb-5 uppercase tracking-widest font-medium">
            {product.category}
          </p>
          
     
          <div className="flex items-baseline gap-[15px] mb-[25px]">
            <h2 className="text-4xl lg:text-[2.5rem] font-bold text-[#e94560] m-0">
              ${product.price}
            </h2>
            {product.originalPrice && (
              <span className="line-through text-gray-400 text-lg lg:text-[1.2rem]">
                ${product.originalPrice}
              </span>
            )}
          </div>
          
         
          <div className="flex items-center gap-2.5 mb-[30px]">
            <span className="text-[#ffd700] text-2xl">
              {"★".repeat(Math.floor(product.rating)) + "☆".repeat(5 - Math.floor(product.rating))}
            </span>
            <span className="text-gray-500">({product.reviews} customer reviews)</span>
          </div>
          
          <p className="leading-relaxed text-gray-600 mb-10 text-[1.05rem]">
            This premium {product.name.toLowerCase()} is perfect for your everyday needs. 
            Built with high-quality materials and designed for both style and durability. 
            Upgrade your collection today with this fantastic item!
          </p>
          
        
          <button 
            className="mx-auto bg-gradient-to-br from-[#e94560] to-[#f093fb] text-white border-none py-[18px] px-10 rounded-[30px] text-lg lg:text-[1.2rem] font-bold cursor-pointer transition-all duration-300 flex items-center justify-center gap-3 w-full max-w-[350px] hover:-translate-y-[3px] hover:scale-[1.02]  active:translate-y-[1px] active:shadow-[0_5px_10px_rgba(233,69,96,0.3) ]"
            onClick={() => addToCart(product)}
          >
            <span className="text-[1.4rem]">🛒</span> Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
