/** @type {import('tailwindcss').Config} */
import type { Config } from 'tailwindcss'

const config = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        accent: '#fa586a',
      },
      fontFamily: {
        sans: ['atkinson-regular'],
        bold: ['atkinson-bold'],
      },
    },
  },
  plugins: [],
} satisfies Config

export default config
