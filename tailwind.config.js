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
    },
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: [
      {
        light: {
          ...require('daisyui/src/theming/themes')['[data-theme=light]'],
          primary: 'mediumblue',
          secondary: '#e0e7ff',
          accent: '#2e8a99',
          accentContent: '#e8eaf6',
          '.btn-primary': {
            color: '#fff',
            backgroundColor: 'mediumblue',
            borderColor: 'mediumblue',
          },
          '.btn-secondary': {
            color: 'mediumblue',
            backgroundColor: '#fff',
            borderColor: 'mediumblue',
          },
          '.btn-secondary:hover': {
            backgroundColor: 'mediumblue',
            color: '#fff',
            borderColor: '#fff',
          },
        },
      },
      'dark',
    ],
  },
};
