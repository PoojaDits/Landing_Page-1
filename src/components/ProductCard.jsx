import React from "react";

const ProductCard = ({ product, addToCart }) => {
  const renderStars = (rating) => {
    return "★".repeat(Math.floor(rating)) + "☆".repeat(5 - Math.floor(rating));
  };

  return (
    <div className="product-card">
      <div className="product-image-wrapper">
        <span>{product.emoji}</span>
        {product.badge && <span className="badge">{product.badge}</span>}
      </div>
      <div className="product-info">
        <p className="product-category">{product.category}</p>
        <h3 className="product-name">{product.name}</h3>
        <div className="product-rating">
          <span className="stars">{renderStars(product.rating)}</span>
          <span>({product.reviews})</span>
        </div>
        <div className="product-footer">
          <div>
            <span className="product-price">${product.price}</span>
            {product.originalPrice && (
              <span className="original-price">${product.originalPrice}</span>
            )}
          </div>
          <button
            className="add-to-cart-btn"
            onClick={() => addToCart(product)}
          >
            + Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;