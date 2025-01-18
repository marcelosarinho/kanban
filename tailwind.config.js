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
        'success': '#52e9af',
        'info': '#8952e9',
        'danger': '#e95252',
      },
    },
  },
  darkMode: 'selector',
  plugins: [],
}

