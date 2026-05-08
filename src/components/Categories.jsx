import React from "react";
import { useNavigate } from "react-router-dom";

const categoriesData = [
  { name: "Electronics", emoji: "📱", color: "#ff6b6b" },
  { name: "Footwear", emoji: "👟", color: "#4ecdc4" },
  { name: "Accessories", emoji: "🎒", color: "#ffe66d" },
  { name: "Kitchen", emoji: "☕", color: "#a8e6cf" },
  { name: "Sports", emoji: "⚽", color: "#ff8b94" },
  { name: "All", emoji: "🛍️", color: "#c9b1ff" },
];

const Categories = ({ setSelectedCategory }) => {
  const navigate = useNavigate();

  const handleCategoryClick = (categoryName) => {
    setSelectedCategory(categoryName);
    navigate(`/products/${categoryName}`);
  };

  return (
    <section className="categories-section">
      <h2 className="section-title">Shop by Category</h2>
      

      <div className="categories-grid">
        {categoriesData.map((cat) => (
          <div
            key={cat.name}
            className="category-card"
            style={{ backgroundColor: cat.color }}
            onClick={() => handleCategoryClick(cat.name)}
          >
            <span className="category-emoji">{cat.emoji}</span>
            <h3 className="category-name">{cat.name}</h3>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Categories;