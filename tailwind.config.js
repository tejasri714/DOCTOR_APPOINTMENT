/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",      
    "./src/**/*.{js,jsx,ts,tsx}", // include all JS/TS/JSX/TSX files
  ],
  theme: {
    extend: {
      colors: {
        primary: "#5f6FFF",
      },
      gridTemplateColumns: {
        auto: 'repeat(auto-fill, minmax(180px, 1fr))',
      },
    },
  },
  plugins: [],
}
