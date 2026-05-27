import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

const categoriesData = [
  { name: "Electronics", emoji: "📱", color: "bg-[#ff6b6b]" },
  { name: "Footwear", emoji: "👟", color: "bg-[#4ecdc4]" },
  { name: "Accessories", emoji: "🎒", color: "bg-[#ffe66d]" },
  { name: "Kitchen", emoji: "☕", color: "bg-[#a8e6cf]" },
  { name: "Sports", emoji: "⚽", color: "bg-[#ff8b94]" },
  { name: "All", emoji: "🛍️", color: "bg-[#c9b1ff]" },
];

const Categories = ({ setSelectedCategory }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const basePath = location.pathname.startsWith("/customer") ? "/customer" : "";

  const handleCategoryClick = (categoryName) => {
    if (typeof setSelectedCategory === "function") {
      setSelectedCategory(categoryName);
    }
    if (categoryName === "All") {
      navigate(`${basePath}/products`);
    } else {
      navigate(`${basePath}/products/${categoryName}`);
    }
  };

  return (
    <section className="py-12 px-5 text-center bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#0f3460]">
      <h2 className="text-2xl font-bold text-white">Shop by Category</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 max-w-5xl mx-auto mt-8">
        {categoriesData.map((cat) => (
          <div
            key={cat.name}
            className={`${cat.color} p-8 rounded-2xl cursor-pointer flex flex-col items-center gap-2.5 font-bold text-[#1a1a2e] transition-transform duration-250 ease-in-out hover:-translate-y-1.5 hover:shadow-lg`}
            onClick={() => handleCategoryClick(cat.name)}
          >
            <span className="text-5xl">{cat.emoji}</span>
            <h3 className="text-base">{cat.name}</h3>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Categories;
