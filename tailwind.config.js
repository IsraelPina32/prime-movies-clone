/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Cores oficiais da interface Prime Video
        brand: {
          background: "#0f171e",
          card: "#1a242f",
          blue: "#1a98ff",
          text: "#f2f4f6",
        }
      },
    },
  },
  plugins: [],
}