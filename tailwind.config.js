/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./app/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        telegram: {
          accent: "#229ED9",
          "primary-light": "#000000",
          "primary-dark": "#FFFFFF",
          "bg-light": "#FFFFFF",
          "bg-dark": "#0F0F0F",
          "bubble-out-light": "#DCF8C6",
          "bubble-in-light": "#FFFFFF",
          "bubble-out-dark": "#2B5278",
          "bubble-in-dark": "#182533",
        },
      },
    },
  },
  plugins: [],
};
