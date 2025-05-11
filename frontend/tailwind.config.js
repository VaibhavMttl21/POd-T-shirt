import { Config } from 'tailwindcss'

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        dark: {
          bg: '#121212',
          card: '#1e1e1e',
          border: '#333333',
          text: '#e0e0e0',
          muted: '#888888',
          input: '#2a2a2a',
        },
        theme1: {
          primary: '#3b82f6',
          secondary: '#2563eb',
          accent: '#60a5fa',
        },
        theme2: {
          primary: '#10b981', 
          secondary: '#059669',
          accent: '#34d399',
        },
        theme3: {
          primary: '#8b5cf6',
          secondary: '#7c3aed',
          accent: '#a78bfa',
        },
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
      boxShadow: {
        'inner-lg': 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.15)',
        'glow': '0 0 15px var(--glow-color, rgba(59, 130, 246, 0.5))',
      },
    },
  },
  plugins: [],
} 