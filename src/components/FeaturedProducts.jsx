import React from "react";
import { Link } from "react-router-dom";
import ProductCard from "./ProductCard";

const featuredProducts = [
  { id: 1, name: "Wireless Headphones", category: "Electronics", price: 79.99, originalPrice: 99.99, rating: 4, reviews: 128, emoji: "🎧", badge: "Sale" },
  { id: 2, name: "Running Sneakers", category: "Footwear", price: 59.99, rating: 5, reviews: 245, emoji: "👟", badge: "New" },
  { id: 3, name: "Smart Watch", category: "Electronics", price: 149.99, originalPrice: 199.99, rating: 4, reviews: 87, emoji: "⌚", badge: "Hot" },
  { id: 7, name: "Coffee Maker", category: "Kitchen", price: 49.99, originalPrice: 69.99, rating: 4, reviews: 411, emoji: "☕", badge: "Sale" },
];

const FeaturedProducts = ({ addToCart }) => {
  return (
    <section className="py-16 px-6 bg-gradient-to-br from-[#1a1a2e] to-[#16213e]">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold text-white">Trending Products</h2>
          <p className="mt-3 text-sm text-gray-400 max-w-xl mx-auto">
            Discover our customer favorites and hot items flying off the shelves.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
          {featuredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              addToCart={addToCart}
            />
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            to="/products"
            className="inline-flex items-center gap-3 bg-gradient-to-br from-[#e94560] to-[#d63a52] px-8 py-3.5 rounded-full text-white font-bold shadow-lg transform transition hover:scale-105 active:scale-95 cursor-pointer"
          >
            Explore All Products
            <span aria-hidden className="text-lg">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
