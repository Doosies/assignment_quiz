/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      backgroundColor: {
        paper: 'rgb(226 232 240 / var(--tw-bg-opacity)',
      },
      letterSpacing: {
        num: '10px',
      },
    },
  },
  plugins: [],
};
