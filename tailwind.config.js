/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./components/**/*.html.js",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],

  theme: {
    extend: {
       fontFamily: {
        londrina: ['Londrina Solid', 'sans-serif'],
      },
      colors: {
        gray: {
          DEFAULT: '#3A3541DE', 
          secondary: '#3A3541AD', 
          input: '#181A1C',
        },
        blue: {
          DEFAULT: '#0F1E93',   
          input: '#0F1E93',  
        },
        white: {
          DEFAULT: '#E7E3FC',   
          secondary: '#E7E3FCAD',  
        },
        yellow: {
          premium: '#B7A207',  
        },
      },
      backgroundImage: {
        'gradient-blue': 'linear-gradient(286.17deg, #192DB7 0%, #5370D4 100%)',
      },
    },
  },
}
