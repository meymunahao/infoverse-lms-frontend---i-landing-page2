/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./hooks/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: "#0f6db6",
          light: "#3da8e0",
          dark: "#0b4c82",
        },
        accent: {
          DEFAULT: "#dd7c5e",
          soft: "#ffe2d5",
        },
        slate: {
          950: "#0f172a",
        },
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui"],
        serif: ["Playfair Display", "ui-serif", "Georgia"],
      },
      boxShadow: {
        card: "0 20px 45px -20px rgba(15, 109, 182, 0.35)",
        focus: "0 0 0 4px rgba(61, 168, 224, 0.25)",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: 0, transform: "translateY(20px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      animation: {
        "fade-in": "fadeIn 0.8s ease-out forwards",
        marquee: "marquee 20s linear infinite",
      },
      container: {
        center: true,
        padding: {
          DEFAULT: "1.5rem",
          lg: "3rem",
        },
        screens: {
          "2xl": "1200px",
        },
      },
    },
  },
  plugins: [require("@tailwindcss/forms"), require("@tailwindcss/typography")],
};
