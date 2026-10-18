import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        surface: {
          primary: '#0A0A0F',
          secondary: '#12121A',
        },
        accent: {
          gold: '#C9A96E',
          blue: '#3B82F6',
          cyan: '#06B6D4',
        },
        muted: '#8888A0',
      },
      fontFamily: {
        display: ['var(--font-inter-tight)', '"Inter Tight"', 'sans-serif'],
        body: ['var(--font-inter)', '"Inter"', 'sans-serif'],
      },
      backdropBlur: {
        glass: '20px',
      },
      animation: {
        'spin-slow': 'spin 20s linear infinite',
        'pulse-glow': 'pulse-glow 3s ease-in-out infinite',
      },
      keyframes: {
        'pulse-glow': {
          '0%, 100%': { opacity: '0.6' },
          '50%': { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
