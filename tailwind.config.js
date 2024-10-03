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
        'primary': '#d82645',
        'primary-dark': '#6c1323',
        'secondary': '#182e3d',
      }
    },
  },
  darkMode: 'selector',
  plugins: [],
}

