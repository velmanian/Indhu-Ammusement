import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class', // Enable dark mode with 'class' strategy
  theme: {
    extend: {
      colors: {
        brand: {
          primary: '#0B4F8A',
          secondary: '#0A6FB5',
          accent: '#C6D300',
          navy: '#0A2E4F',
          light: '#EAF3FA',
        },
      },
    },
  },
  plugins: [],
};

export default config;