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
      <div style={{ padding: "100px 20px", textAlign: "center" }}>
        <h2>Product not found!</h2>
        <Button onClick={() => navigate('/products')}>Back to Products</Button>
      </div>
    );
  }

  return (
    <div style={{ padding: "40px 20px", maxWidth: "900px", margin: "0 auto", minHeight: "80vh" }}>
      <button 
        onClick={() => navigate(-1)} 
        style={{ background: "none", border: "none", color: "#e94560", cursor: "pointer", fontSize: "1rem", marginBottom: "20px", fontWeight: "bold" }}
      >
        ← Back
      </button>
      
      <div style={{ display: "flex", gap: "40px", flexWrap: "wrap", backgroundColor: "white", padding: "40px", borderRadius: "20px", boxShadow: "0 10px 30px rgba(0,0,0,0.05)" }}>
        <div style={{ flex: "1", minWidth: "300px", fontSize: "10rem", display: "flex", alignItems: "center", justifyContent: "center", background: "#f8f9fa", borderRadius: "15px" }}>
          {product.emoji}
        </div>
        
        <div style={{ flex: "1", minWidth: "300px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
          {product.badge && <span style={{ background: "#e94560", color: "white", padding: "5px 12px", borderRadius: "20px", alignSelf: "flex-start", marginBottom: "15px", fontSize: "0.85rem", fontWeight: "bold" }}>{product.badge}</span>}
          <h1 style={{ fontSize: "2.5rem", marginBottom: "10px", color: "#1a1a2e" }}>{product.name}</h1>
          <p style={{ color: "#666", fontSize: "1.1rem", marginBottom: "20px", textTransform: "uppercase", letterSpacing: "1px", fontWeight: "500" }}>{product.category}</p>
          
          <div style={{ display: "flex", alignItems: "baseline", gap: "15px", marginBottom: "25px" }}>
            <h2 style={{ fontSize: "2.5rem", color: "#e94560", margin: 0 }}>${product.price}</h2>
            {product.originalPrice && <span style={{ textDecoration: "line-through", color: "#999", fontSize: "1.2rem" }}>${product.originalPrice}</span>}
          </div>
          
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "30px" }}>
            <span style={{ color: "#ffd700", fontSize: "1.5rem" }}>
              {"★".repeat(Math.floor(product.rating)) + "☆".repeat(5 - Math.floor(product.rating))}
            </span>
            <span style={{ color: "#666" }}>({product.reviews} customer reviews)</span>
          </div>
          
          <p style={{ lineHeight: "1.6", color: "#555", marginBottom: "40px", fontSize: "1.05rem" }}>
            This premium {product.name.toLowerCase()} is perfect for your everyday needs. 
            Built with high-quality materials and designed for both style and durability. 
            Upgrade your collection today with this fantastic item!
          </p>
          
          <style>
            {`
              .detail-add-btn {
                background: linear-gradient(135deg, #e94560, #f093fb);
                color: white;
                border: none;
                padding: 18px 40px;
                border-radius: 30px;
                font-size: 1.2rem;
                font-weight: 700;
                cursor: pointer;
                transition: all 0.3s ease;
                box-shadow: 0 10px 20px rgba(233, 69, 96, 0.3);
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 12px;
                width: 100%;
                max-width: 350px;
              }
              .detail-add-btn:hover {
                transform: translateY(-3px) scale(1.02);
                box-shadow: 0 15px 25px rgba(233, 69, 96, 0.4);
              }
              .detail-add-btn:active {
                transform: translateY(1px);
                box-shadow: 0 5px 10px rgba(233, 69, 96, 0.3);
              }
            `}
          </style>
          
          <button className="detail-add-btn" onClick={() => addToCart(product)}>
            <span style={{ fontSize: "1.4rem" }}>🛒</span> Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
