/** @type {import('tailwindcss').Config} */
export default {
  content: ["./*.{html,js}"],
  theme: {
    extend: {
      colors: {
        'regular-yellow': '#FBB03B',
        'regular-blue': '#030229',
      },
      screens: {
        'sm': '400px',
      }
    },
  },
  plugins: [],
}

