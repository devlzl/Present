import colors from 'tailwindcss/colors'

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#C43E1C',
          text: '#242424',
        },
        secondary: {
          DEFAULT: colors.neutral[100],
          hover: colors.neutral[200],
          border: colors.neutral[300],
          text: '#424242',
          dark: colors.neutral[800],
          ['dark-hover']: colors.neutral[900],
        },
        success: colors.green,
        warning: colors.yellow,
        error: colors.red,
      },
    },
  },
  plugins: [],
}
