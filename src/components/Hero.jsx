import React from "react";

const Hero = () => {
  return (
    <section
      id="home"
      className="relative overflow-hidden bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#0f3460] text-white py-20 px-6"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -left-20 top-6 w-[420px] h-[420px] rounded-[48%_52%_46%_54%] transform -rotate-15"
        style={{
          background:
            'radial-gradient(circle at 30% 30%, rgba(73,213,244,0.35), transparent 25%), radial-gradient(circle at 60% 60%, rgba(249,92,102,0.28), transparent 18%), radial-gradient(circle at 20% 80%, rgba(255,255,255,0.18), transparent 22%)',
        }}
      />

      <div
        aria-hidden
        className="pointer-events-none absolute -right-20 bottom-0 w-[420px] h-[420px] rounded-full"
        style={{
          background:
            'radial-gradient(circle at 20% 25%, rgba(255,255,255,0.22), transparent 18%), radial-gradient(circle at 60% 45%, rgba(233,69,96,0.18), transparent 20%), radial-gradient(circle at 80% 75%, rgba(255,255,255,0.18), transparent 22%)',
        }}
      />

      <div className="relative max-w-5xl mx-auto text-center">
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold leading-tight">
          Discover <span className="text-pink-400">Amazing</span> Products
        </h1>

        <p className="mt-4 text-sm sm:text-base text-gray-200 max-w-2xl mx-auto">
          Shop the latest trends with unbeatable prices and fast delivery right to your door.
        </p>

        <div className="mt-8">
          <button
            onClick={() => document.getElementById("products")?.scrollIntoView({ behavior: "smooth" })}
            className="inline-flex items-center gap-3 bg-gradient-to-br from-[#e94560] to-[#d63a52]  px-6 py-3 rounded-full text-white font-semibold shadow-lg transform transition active:scale-95"
          >
            Shop Now
            <span aria-hidden className="text-xl">→</span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;