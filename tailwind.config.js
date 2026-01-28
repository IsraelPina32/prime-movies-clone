/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        'prime-bg': '#0f171e',      // background oficial.
        'prime-card': '#1a242f',    // background of cards.
        'prime-blue': '#00a8e1',    // Blue of the btns/links.
      },
    },
  },
  plugins: [],
}