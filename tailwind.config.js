/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          bg: "#03040a",
          yellow: "#ffdd4f",
          purple: "#a29bfe",
          blue: "#2d4e89",
        },
      },
      keyframes: {
        "slide-horizontal": {
          "0%, 100%": { transform: "translateX(0)" },
          "50%": { transform: "translateX(calc(100% - 14rem))" },
        },
        "fadeIn": {
          "0%": { opacity: "0", transform: "translateY(-10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "slide-horizontal": "slide-horizontal 8s ease-in-out infinite",
        "fadeIn": "fadeIn 0.2s ease-out",
      },
    },
  },
};

