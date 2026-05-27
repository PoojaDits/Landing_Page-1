import React from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

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
  const location = useLocation();
  const product = products.find((p) => p.id === parseInt(id));

  // Keep links inside the customer section when relevant.
  const basePath = location.pathname.startsWith("/customer") ? "/customer" : "";

  if (!product) {
    return (
      <section className="min-h-full py-20 px-5 text-center flex flex-col items-center bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#0f3460]">
        <h2 className="text-2xl font-bold mb-4 text-white">Product not found!</h2>
        <Button onClick={() => navigate(`${basePath}/products`)}>Back to Products</Button>
      </section>
    );
  }

  return (
    <section className="min-h-full py-10 px-5 bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#0f3460]">
      <div className="max-w-[900px] mx-auto">
        <Button
          variant="ghost"
          onClick={() => navigate(-1)}
          className="mb-6 pl-0 hover:bg-white/10 text-white"
        >
          ← Back
        </Button>

        <div className="flex flex-col md:flex-row gap-10 bg-white text-gray-900 p-8 md:p-10 rounded-2xl shadow-2xl border border-white/10">
          <div className="flex-1 min-w-[300px] h-[300px] md:h-auto text-[10rem] flex items-center justify-center bg-gray-100 rounded-xl">
            {product.emoji}
          </div>

          <div className="flex-1 min-w-[300px] flex flex-col justify-center">
            {product.badge && (
              <Badge className="self-start mb-4 px-3 py-1 text-sm">
                {product.badge}
              </Badge>
            )}

            <h1 className="text-3xl md:text-4xl font-bold mb-2">
              {product.name}
            </h1>

            <p className="text-gray-500 text-sm mb-6 uppercase tracking-widest font-semibold">
              {product.category}
            </p>

            <div className="flex items-baseline gap-4 mb-6">
              <h2 className="text-4xl font-bold m-0" style={{ color: "#e94560" }}>
                ${product.price}
              </h2>
              {product.originalPrice && (
                <span className="line-through text-gray-400 text-lg">
                  ${product.originalPrice}
                </span>
              )}
            </div>

            <div className="flex items-center gap-3 mb-8">
              <span className="text-yellow-500 text-xl tracking-widest">
                {"★".repeat(Math.floor(product.rating)) + "☆".repeat(5 - Math.floor(product.rating))}
              </span>
              <span className="text-gray-500 text-sm">({product.reviews} customer reviews)</span>
            </div>

            <p className="leading-relaxed text-gray-600 mb-10">
              This premium {product.name.toLowerCase()} is perfect for your everyday needs.
              Built with high-quality materials and designed for both style and durability.
              Upgrade your collection today with this fantastic item!
            </p>

            <Button
              size="lg"
              className="w-full sm:max-w-sm rounded-full h-14 text-lg font-bold text-white border-0 hover:opacity-90 transition-opacity"
              style={{ background: 'linear-gradient(135deg, #e94560, #f85c76)', boxShadow: '0 4px 20px rgba(233,69,96,0.4)' }}
              onClick={() => addToCart(product)}
            >
              🛒 Add to Cart
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductDetail;
