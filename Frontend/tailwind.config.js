/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        outfit: ["outfit", "sans-serif"],
      },
      colors: {
        bg: "#1b1b1b",
      },
    },
  },
  plugins: [],
};
