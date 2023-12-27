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
      fontSize: {
        '2xs': '0.625rem',
        xs: '0.75rem',
        sm: '0.875rem',
        base: '1rem',
        lg: '1.125rem',
        xl: '1.25rem',
        '2xl': '1.5rem',
        '3xl': '1.875rem',
        '4xl': '2.25rem',
        '5xl': '3rem',
      },
    },
  },
  plugins: [],
}
