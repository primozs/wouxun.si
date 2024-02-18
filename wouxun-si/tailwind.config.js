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
      secondary: colors.sky,
      neutral: colors.slate,
      info: colors.blue,
      success: colors.blue,
      error: colors.red,
      warning: colors.yellow,
      gray: colors.gray,
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
    extend: {
      boxShadow: {
        'card-hover-dark':
          '0px 0px 0px 1px rgba(255, 255, 255, 0.2), 0px 1px 2px -1px rgba(255, 255, 255, 0.32), 0px 2px 8px 0px rgba(0, 0, 0, 0.64)',
        'card-hover-light':
          '0px 0px 0px 1px rgba(17, 24, 28, 0.08), 0px 1px 2px -1px rgba(17, 24, 28, 0.08), 0px 2px 8px 0px rgba(17, 24, 28, 0.1)',
      },
      backgroundColor: {
        'overlay-dark': 'rgba(22, 22, 24, 0.7)',
        'overlay-light': 'rgba(17, 24, 28, 0.4)',
      },
      keyframes: {
        blink: {
          '0%': { opacity: 0.2 },
          '20%': { opacity: 1 },
          '100% ': { opacity: 0.2 },
        },
      },
      animation: {
        blink: 'blink 1.4s both infinite',
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
};
