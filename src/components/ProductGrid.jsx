import React from "react";
import { useNavigate } from "react-router-dom";
import ProductCard from "./ProductCard";

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

const categories = ["All", "Electronics", "Footwear", "Accessories", "Kitchen", "Sports"];

const ProductGrid = ({ selectedCategory, setSelectedCategory, addToCart }) => {
  const navigate = useNavigate();

  const handleFilterClick = (cat) => {
    setSelectedCategory(cat);
    if (cat === "All") {
      navigate("/products");
    } else {
      navigate(`/products/${cat}`);
    }
  };

  const filtered =
    !selectedCategory || selectedCategory === "All"
      ? products
      : products.filter((p) => p.category === selectedCategory);

  return (
    <section className="px-4 py-8 md:py-[60px] md:px-[40px] flex-1 bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#0f3460]">
      <h2 className="text-center text-[1.5rem] mb-1.5 text-[#b9b9bd]">
        {selectedCategory && selectedCategory !== "All"
          ? `${selectedCategory} Products`
          : "All Products"}
      </h2>
      <p className="text-center text-[#555] text-[0.85rem] mb-5">Browse our curated collection</p>

      <div className="flex gap-2.5 overflow-x-auto whitespace-nowrap py-1 mb-5 pb-4 md:justify-center md:overflow-x-visible [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {categories.map((cat) => (
          <button
            key={cat}
            className={`px-4 py-1.5 border border-black/30 rounded-full text-[0.8rem] font-semibold cursor-pointer ${selectedCategory === cat ? "bg-[#e94560] text-white border-[#e94560]" : "bg-white/10 text-gray-500"}`}
            onClick={() => handleFilterClick(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-3 max-w-[1200px] mx-auto md:grid-cols-[repeat(auto-fill,minmax(240px,1fr))] md:gap-[25px]">
        {filtered.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            addToCart={addToCart}
          />
        ))}
      </div>
    </section>
  );
};

export default ProductGrid;