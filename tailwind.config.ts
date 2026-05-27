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
          gold:        '#C8A46B',
          'gold-light': '#D9B97E',
          'gold-dark':  '#A8844A',
          wine:        '#8B1E3F',
          'wine-light': '#A02449',
          dark:        '#0F0F0F',
          'dark-2':    '#181818',
          'dark-3':    '#222222',
          'dark-4':    '#2A2A2A',
          cream:       '#F5F1EA',
          muted:       '#B8B8B8',
        },
      },
      fontFamily: {
        poppins:  ['var(--font-poppins)', 'sans-serif'],
        playfair: ['var(--font-playfair)', 'serif'],
      },
      backgroundImage: {
        'gradient-brand':   'linear-gradient(135deg, #C8A46B, #8B1E3F)',
        'gradient-gold':    'linear-gradient(135deg, #C8A46B, #D9B97E)',
        'gradient-hero':    'linear-gradient(135deg, #0F0F0F 0%, #181818 50%, #8B1E3F 100%)',
        'gradient-card':    'linear-gradient(135deg, rgba(200,164,107,0.08), rgba(139,30,63,0.08))',
        'gradient-overlay': 'linear-gradient(to bottom, rgba(15,15,15,0.45) 0%, rgba(15,15,15,0.80) 100%)',
      },
      animation: {
        'float':      'float 6s ease-in-out infinite',
        'float-slow': 'float 9s ease-in-out infinite',
        'glow-pulse': 'glowPulse 3s ease-in-out infinite',
        'shimmer':    'shimmer 2.5s linear infinite',
        'fade-up':    'fadeUp 0.7s ease forwards',
        'particle':   'particleDrift 15s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':      { transform: 'translateY(-18px)' },
        },
        glowPulse: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(200,164,107,0.35)' },
          '50%':      { boxShadow: '0 0 50px rgba(200,164,107,0.55), 0 0 90px rgba(139,30,63,0.25)' },
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
          '0%':   { transform: 'translateY(100vh) translateX(0)',   opacity: '0' },
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
