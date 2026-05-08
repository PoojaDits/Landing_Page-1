import React from "react";

const Hero = () => {
  return (
    <section className="hero" id="home">
      <h1>
        Discover <span>Amazing</span> Products
      </h1>
      <p>
        Shop the latest trends with unbeatable prices and fast delivery
        right to your door.
      </p>
      <button
        className="hero-btn"
        onClick={() =>
          document
            .getElementById("products")
            .scrollIntoView({ behavior: "smooth" })
        }
      >
        Shop Now →
      </button>
    </section>
  );
};

export default Hero;