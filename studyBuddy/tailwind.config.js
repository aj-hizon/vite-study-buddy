/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./*.{html,js}",
    "./auth/*.{html, js}",
    "./profileSetup/*.{html, js}",
    "./profileSetups/profile-page/*.{html, js}",
    "./profileSetups/*.{html, js}", 
    "./node_modules/flowbite/**/*.js"
  ],
  theme: {
    extend: {
      colors: {
        'regular-yellow': '#FBB03B',
        'regular-blue': '#030229',
        'text-blue': '#121481',
        'text-secondary-blue': '#33658A',
        'button-blue': '#555296',
        'home-text': '#222222',
      },
      screens: {
        'sm': '940px',
      },
      backgroundImage: {
        'hero': 'url(./public/2imgLandingPage/section1-bg.png)',
      },
      fontFamily: {
        'roboto': ["Roboto", "sans-serif"],
      }
    },
  },
  plugins: [
    require('flowbite/plugin')
  ],
}

