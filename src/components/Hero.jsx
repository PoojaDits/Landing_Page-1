import React from "react";

const Hero = () => {
  return (
    <section
      id="home"
      className="relative overflow-hidden bg-[#0a0f1d] text-white py-24 sm:py-32 px-6"
    >
      
      <div className="absolute inset-0 bg-grid-pattern opacity-60 pointer-events-none" />
      <div
        aria-hidden
        className="pointer-events-none absolute -left-20 top-10 w-[350px] sm:w-[500px] h-[350px] sm:h-[500px] rounded-full bg-gradient-to-tr from-[#e94560]/30 to-purple-600/20 mix-blend-screen animate-float-slow"
        style={{
          filter: "blur(90px)",
        }}
      />

      <div
        aria-hidden
        className="pointer-events-none absolute -right-20 bottom-10 w-[350px] sm:w-[500px] h-[350px] sm:h-[500px] rounded-full bg-gradient-to-br from-cyan-500/25 to-blue-600/25 mix-blend-screen animate-float-delayed"
        style={{
          filter: "blur(90px)",
        }}
      />

      <div
        aria-hidden
        className="pointer-events-none absolute left-1/3 top-1/4 w-[250px] sm:w-[350px] h-[250px] sm:h-[350px] rounded-full bg-[#e94560]/10 mix-blend-screen animate-pulse"
        style={{
          filter: "blur(120px)",
          animationDuration: "8s",
        }}
      />

      <div className="relative max-w-5xl mx-auto text-center z-10">
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold leading-tight tracking-tight">
          Discover{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#e94560] to-[#ff7e95] drop-shadow-[0_2px_10px_rgba(233,69,96,0.3)]">
            Amazing
          </span>{" "}
          Products
        </h1>

        <p className="mt-6 text-base sm:text-lg lg:text-xl text-gray-300 max-w-2xl mx-auto font-light leading-relaxed">
          Shop the latest trends with unbeatable prices and fast delivery right to your door.
        </p>

        <div className="mt-10">
          <button
            onClick={() => document.getElementById("products")?.scrollIntoView({ behavior: "smooth" })}
            className="inline-flex items-center gap-3 bg-gradient-to-r from-[#e94560] to-[#f85c76] px-8 py-4 rounded-full text-white font-bold text-sm sm:text-base shadow-[0_4px_20px_rgba(233,69,96,0.4)] hover:shadow-[0_4px_30px_rgba(233,69,96,0.65)] hover:-translate-y-0.5 active:scale-95 transform transition duration-300"
          >
            Shop Now
            <span aria-hidden className="text-xl transition-transform duration-300 group-hover:translate-x-1">→</span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;