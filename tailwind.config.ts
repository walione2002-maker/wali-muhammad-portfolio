import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: {
          DEFAULT: '#080808',
          secondary: '#111111',
          tertiary: '#181818',
        },
        surface: {
          primary: '#111111',
          secondary: '#181818',
          card: '#121212',
          elevated: '#1a1a1a',
        },
        accent: {
          DEFAULT: '#FF4D00',
          orange: '#FF4D00',
          teal: '#64FFDA',
          cyan: '#38BDF8',
          blue: '#3B82F6',
          indigo: '#6366F1',
          gold: '#F59E0B',
          emerald: '#10B981',
          rose: '#F43F5E',
        },
        text: {
          primary: '#E8E4DE',
          secondary: '#9CA3AF',
          muted: '#6B7280',
          accent: '#FF4D00',
        },
        border: {
          DEFAULT: '#1A1A1A',
          subtle: '#222222',
        },
      },
      fontFamily: {
        display: ['var(--font-syne)', '"Syne"', 'sans-serif'],
        sans: ['var(--font-inter)', '"Inter"', 'sans-serif'],
        mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'monospace'],
      },
      animation: {
        'spin-slow': 'spin 24s linear infinite',
        'pulse-subtle': 'pulse-subtle 4s ease-in-out infinite',
      },
      keyframes: {
        'pulse-subtle': {
          '0%, 100%': { opacity: '0.6', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.02)' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
