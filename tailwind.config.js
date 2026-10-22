/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: { sans: ['"DM Sans"', 'system-ui', 'sans-serif'] },
      colors: { ink: '#1c2430', paper: '#f6f7f4', income: '#0f8a6a', expense: '#d1495b' },
    },
  },
  plugins: [],
};