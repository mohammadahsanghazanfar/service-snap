/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
],
  theme: {
    extend: {
      colors: {
        'custom-gray': '#445964',
        'custom-blue': '#2b7cb4',
        'custom-black': '#34444c',
        'custom-hover-blue': '#4c649d',
        'navbar-bg': '#444d58',
        'custom-dark-blue': '#3598db',
        'custom-light-blue': '#2e99de',
        'custom-tan-blue': '#5e738b',
        'custom-dark-tan-blue': '#5f7289',
        'side-bar-bkg': '#1e1e2d',
        'logo-bkg': '1c1c27',
      },
      fontSize: {
        'xxs': '0.65rem'  // Define a smaller font size
      },
      transitionDuration: {
        '3000': '3000ms', // Adding a 3000ms duration for transitions
      }
    },
  },
  plugins: [],
}

