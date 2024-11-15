/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        customBlack: "#000000",
        customPink: "#F21F7B",
      },

      fontFamily: {
        laila: ["Laila"],
      },

      animation: {
        "swipe-up": "swipe-up 0.5s ease-out forwards",
      },
    },
  },
  plugins: [],
};
