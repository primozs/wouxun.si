const colors = require('tailwindcss/colors');
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    colors: {
      inherit: 'inherit',
      current: 'currentColor',
      transparent: 'transparent',
      black: '#000',
      white: '#fff',
      // https://www.tailwindshades.com/
      primary: {
        50: '#5EB2FD',
        100: '#49A8FD',
        200: '#2195FC',
        300: '#0381F2',
        400: '#036CC9',
        500: '#0256A1',
        600: '#01386A',
        700: '#011B32',
        800: '#000000',
        900: '#000000',
        950: '#000000',
      },
      neutral: colors.slate,
    },
    fontFamily: {
      sans: [
        'Inter',
        'Arial',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        '"Noto Sans"',
        'sans-serif',
      ],
    },
    extend: {},
  },
  plugins: [],
};
