/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./resources/**/*.blade.php",
    "./resources/**/*.js",
  ],
  theme: {
    extend: {
      fontFamily: {
        'suse': ['SUSE', 'sans-serif'],
      },
      colors: {
        'dark-lime': '#afe952',
      },
      boxShadow: {
        'flat': '5px 5px 0px -1px rgba(0,0,0,1)'
      }
    },
  },
  darkMode: 'selector',
  plugins: [],
}

