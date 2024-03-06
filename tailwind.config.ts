import type { Config } from 'tailwindcss';

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      backgroundColor: ({ colors }) => ({
        paper: colors.gray[200],
        blue: colors.blue[500],
      }),
    },
  },
  plugins: [
    ({ addComponents, addUtilities, config }) => {
      addComponents({
        '.progress-bar': {
          '&::-webkit-progress-value': {
            backgroundColor: config('theme.colors.blue.500'),
            borderRadius: config('theme.borderRadius.md'),
            transition: 'width 0.5s ease-in-out',
          },
          '&::-webkit-progress-bar': {
            backgroundColor: config('theme.colors.gray.200'),
            borderRadius: config('theme.borderRadius.md'),
          },
        },
        button: {
          backgroundColor: config('theme.colors.blue.500'),
          borderRadius: config('theme.borderRadius.md'),
          color: config('theme.colors.white'),
          padding: '0.5rem 1rem',
          transition: 'background-color 0.5s ease-in-out',
          '&:hover': {
            backgroundColor: config('theme.colors.blue.500'),
          },
        },
      });
      addUtilities({
        '.flex-center': {
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        },
      });
    },
  ],
} satisfies Config;
