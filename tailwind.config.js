/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
            colors: {
              'vip-blue': '#002E75',
              'vip-light-blue': '#809DCA',
              'vip-gold': '#FFB700',
              'vip-yellow': '#FFB700',
              'footer-bg': '#D9E4F8',
            },
      fontFamily: {
        sans: ['Manrope', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

