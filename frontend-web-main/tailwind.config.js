/** @type {import('tailwindcss').Config} */
export default {
  // prefix: 'tw-',
  important: true,
  content: [
    // Añádir estas 2 lineas
    './node_modules/paganini/index.html',
    './node_modules/paganini/src/**/*.{js,ts,jsx,tsx}',
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#4EA4B1',
        secondary: '#F9CED5',
        tertiary: '#F9F2EA',
      },
    },
  },
  daisyui: {
    // prefix: 'dy-',
    themes: ['light'],
  },
  plugins: [require('daisyui')],
};
