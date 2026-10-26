import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: {
          DEFAULT: '#050816',
          secondary: '#0B1120',
          tertiary: '#0F172A',
        },
        surface: {
          primary: '#0B1120',
          secondary: '#0F172A',
          card: 'rgba(15, 23, 42, 0.75)',
          elevated: 'rgba(30, 41, 59, 0.65)',
        },
        accent: {
          teal: '#64FFDA',
          cyan: '#38BDF8',
          blue: '#3B82F6',
          indigo: '#6366F1',
          gold: '#F59E0B',
          emerald: '#10B981',
          rose: '#F43F5E',
        },
        text: {
          primary: '#F8FAFC',
          secondary: '#94A3B8',
          muted: '#64748B',
          accent: '#64FFDA',
        },
      },
      fontFamily: {
        display: ['var(--font-inter-tight)', '"Inter Tight"', 'sans-serif'],
        sans: ['var(--font-inter)', '"Inter"', 'sans-serif'],
        mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'monospace'],
      },
      boxShadow: {
        glow: '0 0 25px -5px rgba(56, 189, 248, 0.35)',
        'glow-teal': '0 0 25px -5px rgba(100, 255, 218, 0.35)',
        'glow-gold': '0 0 25px -5px rgba(245, 158, 11, 0.35)',
        glass: '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
      },
      backdropBlur: {
        glass: '16px',
        heavy: '24px',
      },
      animation: {
        'spin-slow': 'spin 24s linear infinite',
        'pulse-subtle': 'pulse-subtle 4s ease-in-out infinite',
        float: 'float 6s ease-in-out infinite',
      },
      keyframes: {
        'pulse-subtle': {
          '0%, 100%': { opacity: '0.6', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.03)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
