/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens:{
        'xs': "500px",
        'xxs': "400px"
      },
      backgroundImage: {
        'red-scalet': "linear-gradient(rgba(252, 46, 32, 0.5),rgba(252, 46, 32, 0.5)),url('./pics/red-scaletbg.jpg')",
      },
    },
  },
  plugins: [],
}

