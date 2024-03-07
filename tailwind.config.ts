import type { Config } from 'tailwindcss';

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      backgroundColor: ({ colors }) => ({
        paper: colors.gray[50],
        gray: colors.gray[200],
        blue: colors.blue[500],
        'blue-hover': colors.blue[700],
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
