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
        'primary-50': '#fff0f2',
        'primary-100': '##ffdbe2',
        'primary-200': '#ffb3c3',
        'primary-300': '#fa87a4',
        'primary-400': '#ed5a84',
        'primary-500': '#e13169',
        'primary-600': '#ba2056',
        'primary-700': '#941244',
        'primary-800': '#6e0832',
        'primary-900': '#470422',
        'success': '#16BC53',
        'info': '#00A4FC',
        'warning': '#FFD800',
        'danger': '#FF3887',
      },
      boxShadow: {
        'flat': '3px 3px 0px -1px rgba(0,0,0,1)'
      }
    },
  },
  darkMode: 'selector',
  plugins: [],
}

