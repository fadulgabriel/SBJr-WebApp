/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          purple: '#704595',
          pink: '#f6538c',
        },
        accent: {
          green: '#54ff00',
        },
        base: {
          light: '#ffffff',
          dark: '#1a0a2e',
        }
      },
      fontFamily: {
        display: ['Strelka', 'sans-serif'],
        body: ['Noir Pro', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
