/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    screens: {
      sm: '480px',
      md: '768px',
      lg: '976px',
      xl: '1440px',
    },
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },

      typography: {
        h1: {
          css: {
            color: '#333',
          },
        },
        p: {
          css: {
            color: '#333',
          },
        },
      },
    },
  },
  plugins: [require('@tailwindcss/typography'), require('daisyui')],
  daisyui: {
    themes: [
      {
        light: {
          primary: '#2B4E99',
          secondary: '#4D9966',
          accent1: '#CC7A00',
          accent2: '#CC224D',
          background: '#21293D',
          text: '#F2F5F8',
          link: '#82AAFF',
          success: '#00A550',
          warning: '#DAAA00',
          error: '#FF1A4D',
          '.bg-default': {
            backgroundColor: '#F2F5F8',
            color: '#333333',
          },
        },
      },
      // 'dark',
    ],
  },
};
