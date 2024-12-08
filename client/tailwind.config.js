/** @type {import('tailwindcss').Config} */
import { fontFamily } from 'tailwindcss/defaultTheme'

export default {
  content: [],
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        accent: '#fa586a',
      },
      fontFamily: {
        sans: ['var(--font-atkinson-regular)', ...fontFamily.sans],
        mono: ['var(--font-atkinson-bold)', ...fontFamily.mono],
      },
    },
  },
  plugins: [],
}
