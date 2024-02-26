const colors = require('tailwindcss/colors');
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    colors: {
      //   inherit: 'inherit',
      //   current: 'currentColor',
      //   transparent: 'transparent',
      //   // black: '#000',
      //   // white: '#fff',
      //   // https://www.tailwindshades.com/
      //   // primary: {
      //   //   50: '#5EB2FD',
      //   //   100: '#49A8FD',
      //   //   200: '#2195FC',
      //   //   300: '#0381F2',
      //   //   400: '#036CC9',
      //   //   500: '#0256A1',
      //   //   600: '#01386A',
      //   //   700: '#011B32',
      //   // },
      //   // secondary: colors.sky,
      //   // neutral: colors.slate,
      //   // info: colors.blue,
      //   // success: colors.blue,
      //   // error: colors.red,
      //   // warning: colors.yellow,
      //   // gray: colors.gray,
      // },
      // fontFamily: {
      //   sans: [
      //     'Inter',
      //     'Arial',
      //     'BlinkMacSystemFont',
      //     '"Segoe UI"',
      //     'Roboto',
      //     '"Helvetica Neue"',
      //     '"Noto Sans"',
      //     'sans-serif',
      //   ],
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

  // https://daisyui.com/docs/config/
  // https://daisyui.com/docs/themes/
  // https://daisyui.com/docs/utilities/
  // https://github.com/saadeghi/daisyui/blob/master/src/theming/themes.js
  // https://daisyui.com/blog/how-to-add-new-colors-to-daisyui/
  plugins: [
    require('@tailwindcss/forms'),
    require('daisyui'),
    require('tailwind-scrollbar')({ nocompatible: true }),
  ],
  daisyui: {
    themes: [
      {
        light: {
          fontFamily:
            'Inter,Arial,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue","Noto Sans",sans-serif',
          'color-scheme': 'light',
          primary: '#0256A1',
          'primary-content': '#ffffff',
          secondary: '#e5f2f9', // '#0284c7',
          'secondary-content': '#0c4a6e',
          accent: '#01386A',
          'accent-content': '#fff',
          neutral: '#f7f7f7', // toolbar //  light '#f4f5f8'
          'neutral-content': '#334155',
          'base-100': '#ffff',
          'base-200': '#f8fafc', // slate-50 // '#f9fafb', // gray-50
          'base-300': '#e5e7eb', //'#f3f4f6', // border // gray-200 '#e5e7eb'
          'base-content': '#1f2937',
          info: '#0ea5e9',
          success: '#16a34a',
          warning: '#ea580c',
          error: '#dc2626',
          '--rounded-box': '0', //'0.125rem',
          '--rounded-btn': '0.375rem',
          '--border-btn': '1px',
          '--rounded-badge': '9999px',
          '--animation-btn': '0', // '0.25s',
          '--animation-input': '0.2s',
          '--btn-focus-scale': '1',
          '--tab-radius': '0.125rem',
          '--tab-border': '1px',
        },
        night: {
          'color-scheme': 'dark',
          primary: '#5EB2FD',
          secondary: '#818CF8',
          accent: '#F471B5',
          neutral: '#1E293B',
          'base-100': '#1A2748',
          info: '#0ea5e9',
          success: '#16a34a',
          warning: '#ea580c',
          error: '#dc2626',
          '--rounded-box': '0', //'0.125rem',
          '--rounded-btn': '0.375rem',
          '--border-btn': '1px',
          '--rounded-badge': '9999px',
          '--animation-btn': '0', // '0.25s',
          '--animation-input': '0.2s',
          '--btn-focus-scale': '1',
          '--tab-radius': '0.125rem',
          '--tab-border': '1px',
        },
      },
    ], // false: only light + dark | true: all themes | array: specific themes like this ["light", "dark", "cupcake"]
    darkTheme: 'dark', // name of one of the included themes for dark mode
    base: true, // true, // applies background color and foreground color for root element by default
    styled: true, // true, // include daisyUI colors and design decisions for all components
    utils: true, //true, // adds responsive and modifier utility classes
    prefix: '', // prefix for daisyUI classnames (components, modifiers and responsive class names. Not colors)
    logs: true, // Shows info about daisyUI version and used config in the console when building your CSS
    themeRoot: ':root', // The element that receives theme color CSS variables
  },
};
