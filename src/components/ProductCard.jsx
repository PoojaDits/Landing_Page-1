import React from "react";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ product, addToCart }) => {
  const navigate = useNavigate();
  const renderStars = (rating) => {
    return "★".repeat(Math.floor(rating)) + "☆".repeat(5 - Math.floor(rating));
  };

  return (
    <div className="bg-[#dbeefd] rounded-xl overflow-hidden shadow-[0_2px_8px_rgba(0,0,0,0.08)] flex flex-col hover:shadow-[0_6px_16px_rgba(34,70,128,0.18)] hover:-translate-y-1 cursor-pointer" onClick={() => navigate(`/product/${product.id}`)}>
      <div className="h-[140px] md:h-[200px] bg-gradient-to-br from-[#f5f5f5] to-[#eeeeee] flex items-center justify-center text-[2.5rem] md:text-[4rem] relative">
        <span>{product.emoji}</span>
        {product.badge && <span className="absolute top-[5px] left-[5px] text-[0.6rem] px-[6px] py-[2px] bg-[#e94560] text-white rounded font-bold">{product.badge}</span>}
      </div>
      <div className="p-[10px] flex flex-col grow">
        <p className="text-[0.65rem] text-[#1a1a2e] font-bold">{product.category}</p>
        <h3 className="text-[0.85rem] md:text-[1.1rem] font-bold my-1 text-[#1a1a2e]">{product.name}</h3>
        <div className="text-xs text-gray-500 mb-2">
          <span className="text-yellow-400 mr-1">{renderStars(product.rating)}</span>
          <span>({product.reviews})</span>
        </div>
        <div className="flex flex-col md:flex-row md:justify-between items-start md:items-center gap-2 mt-auto pt-2">
          <div>
            <span className="text-[1rem] md:text-[1.25rem] font-extrabold mr-2">${product.price}</span>
            {product.originalPrice && (
              <span className="text-sm line-through text-gray-400">${product.originalPrice}</span>
            )}
          </div>
          <button
            className="w-full md:w-auto bg-[#e94560] text-white border-none py-2 px-3 rounded-md text-[0.75rem] font-semibold cursor-pointer hover:bg-[#d63a52] hover:-translate-y-0.5 hover:shadow-[0_2px_8px_rgba(233,69,96,0.3)]"
            onClick={(e) => {
              e.stopPropagation();
              addToCart(product);
            }}
          >
            + Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;