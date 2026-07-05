/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,jsx,ts,tsx}', './components/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        accent: '#FF6B35',
        'accent-light': '#FF8B55',
        'accent-dark': '#E5522A',
      },
    },
  },
  plugins: [],
};
