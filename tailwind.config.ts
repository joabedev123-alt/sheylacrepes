import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          purple:     '#8B5CF6',
          'purple-dark': '#6D28D9',
          'purple-light': '#A78BFA',
          pink:       '#EC4899',
          'pink-light': '#F472B6',
          lime:       '#A3E635',
          'lime-dark': '#84CC16',
          gold:       '#F59E0B',
          dark:       '#070714',
          'dark-2':   '#0E0E24',
          'dark-3':   '#15152E',
          'dark-4':   '#1E1E40',
        },
      },
      fontFamily: {
        poppins:  ['var(--font-poppins)', 'sans-serif'],
        playfair: ['var(--font-playfair)', 'serif'],
      },
      backgroundImage: {
        'gradient-brand':   'linear-gradient(135deg, #8B5CF6, #EC4899)',
        'gradient-accent':  'linear-gradient(135deg, #EC4899, #A3E635)',
        'gradient-hero':    'linear-gradient(135deg, #070714 0%, #1A0A2E 60%, #070F04 100%)',
        'gradient-card':    'linear-gradient(135deg, rgba(139,92,246,0.12), rgba(236,72,153,0.12))',
        'gradient-overlay': 'linear-gradient(to bottom, rgba(7,7,20,0.55) 0%, rgba(7,7,20,0.88) 100%)',
      },
      animation: {
        'float':        'float 6s ease-in-out infinite',
        'float-slow':   'float 9s ease-in-out infinite',
        'glow-pulse':   'glowPulse 3s ease-in-out infinite',
        'shimmer':      'shimmer 2.5s linear infinite',
        'fade-up':      'fadeUp 0.7s ease forwards',
        'particle':     'particleDrift 15s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':      { transform: 'translateY(-18px)' },
        },
        glowPulse: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(139,92,246,0.4)' },
          '50%':      { boxShadow: '0 0 50px rgba(236,72,153,0.6), 0 0 90px rgba(139,92,246,0.3)' },
        },
        shimmer: {
          '0%':   { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition:  '200% center' },
        },
        fadeUp: {
          '0%':   { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        particleDrift: {
          '0%':   { transform: 'translateY(100vh) translateX(0)',  opacity: '0' },
          '10%':  { opacity: '1' },
          '90%':  { opacity: '1' },
          '100%': { transform: 'translateY(-100px) translateX(60px)', opacity: '0' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
}

export default config
