/** @type {import('tailwindcss').Config} */
const { fontFamily } = require("tailwindcss/defaultTheme")

module.exports = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
    './app/**/*.{js,jsx}',
    './src/**/*.{js,jsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      fontFamily: {
        sans: ['Inter', ...fontFamily.sans],
        mono: ['"Fira Code"', '"Courier New"', ...fontFamily.mono],
      },
      colors: {
        background: '#0d0d0d',
        foreground: '#e5e7eb',
        primary: {
          DEFAULT: '#ff3b3b',
          foreground: '#ffffff',
        },
        destructive: {
          DEFAULT: '#ff3b3b',
          foreground: '#ffffff',
        },
        border: 'rgba(255, 59, 59, 0.2)',
        input: 'rgba(255, 59, 59, 0.1)',
        ring: '#ff3b3b',
        muted: {
          DEFAULT: 'rgba(255, 255, 255, 0.1)',
          foreground: '#a1a1aa',
        }
      },
      borderRadius: {
        lg: `0.5rem`,
        md: `calc(0.5rem - 2px)`,
        sm: `calc(0.5rem - 4px)`,
      },
      keyframes: {
        glitch: {
          '0%': { transform: 'translate(0)' },
          '20%': { transform: 'translate(-3px, 3px)' },
          '40%': { transform: 'translate(-3px, -3px)' },
          '60%': { transform: 'translate(3px, 3px)' },
          '80%': { transform: 'translate(3px, -3px)' },
          'to': { transform: 'translate(0)' },
        },
        'glitch-scan': {
          '0%, 100%': { clipPath: 'polygon(0% 45%, 100% 45%, 100% 55%, 0% 55%)' },
          '50%': { clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)' },
        }
      },
      animation: {
        glitch: 'glitch 0.3s linear infinite',
        'glitch-scan': 'glitch-scan 3s steps(2, end) infinite',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};