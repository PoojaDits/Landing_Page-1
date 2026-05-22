module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      keyframes: {
        slideIn: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0)' },
        },
        modalSlide: {
          '0%': { opacity: '0', transform: 'translateY(-100px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        dropdownFadeIn: {
          '0%': { opacity: '0', transform: 'translateY(-10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'slide-in': 'slideIn 0.3s ease-out forwards',
        'modal-slide': 'modalSlide 0.4s ease forwards',
        'dropdown-fade-in': 'dropdownFadeIn 0.3s ease forwards',
      },
    },
  },
  plugins: [],
};
