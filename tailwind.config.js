/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,ts,tsx}', './components/**/*.{js,ts,tsx}'],

  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        light: '#EDEFF8',
        'light-hover': '#E4E8F4',
        'light-active': '#C7CFE9',
        normal: '#4B63B7',
        'normal-hover': '#4459A5',
        'normal-active': '#3C4F92',
        dark: '#384A89',
        'dark-hover': '#2D3B6E',
        'dark-active': '#222D52',
        darker: '#1A2340',
      },
    },
  },
  plugins: [],
};
