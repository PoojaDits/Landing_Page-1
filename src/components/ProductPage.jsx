import React from "react";
import ProductGrid from "./ProductGrid";

const ProductsPage = ({ selectedCategory, setSelectedCategory, addToCart }) => {
  return (
    <div>
      <ProductGrid
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        addToCart={addToCart}
      />
    </div>
  );
};

export default ProductsPage;