import type { Config } from 'tailwindcss';

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontSize: {
        '4xs': '0.375rem',
        '5xs': '0.25rem',
      },
      colors: ({ colors }) => ({
        paper: colors.gray[50],
        'paper-hover': colors.gray[100],
        gray: colors.gray[200],
        blue: colors.blue[500],
        red: colors.red[500],
        'blue-hover': colors.blue[700],
      }),
    },
  },
  plugins: [
    ({ addComponents, addUtilities, config }) => {
      addComponents({
        '.progress-bar': {
          '&::-webkit-progress-value': {
            backgroundColor: config('theme.colors.blue'),
            borderRadius: config('theme.borderRadius.md'),
            transition: 'width 0.5s ease-in-out',
          },
          '&::-webkit-progress-bar': {
            backgroundColor: config('theme.colors.gray'),
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
