import type { Config } from 'tailwindcss';

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      backgroundColor: ({ colors }) => ({
        paper: colors.gray[200],
        blue: colors.cyan[400],
      }),
    },
  },
  plugins: [
    ({ addComponents, addUtilities, config }) => {
      addComponents({
        '.progress-bar': {
          '&::-webkit-progress-value': {
            backgroundColor: config('theme.colors.cyan.400'),
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
