import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          white:     '#FFFFFF',
          ivory:     '#F5F0E8',
          beige:     '#D4C4A0',
          brownSub:  '#8B7355',
          brownMain: '#5C4A2A',
          green:     '#DADF81',
        },
      },
      fontFamily: {
        sans: ['Zen Maru Gothic', 'sans-serif'],
      },
      maxWidth: {
        content: '1000px',
      },
      height: {
        nav:  '90px',
        hero: '470px',
      },
      spacing: {
        section: '80px',
        'section-sp': '48px',
      },
      screens: {
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1440px',
      },
    },
  },
  plugins: [],
}

export default config
