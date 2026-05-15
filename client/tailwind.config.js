/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#10201b",
        mint: "#0f766e",
        coral: "#e85d4f",
        amber: "#f59e0b"
      },
      boxShadow: {
        soft: "0 14px 45px rgba(16, 32, 27, 0.08)"
      }
    }
  },
  plugins: []
};
