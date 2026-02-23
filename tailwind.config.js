/** @type {import('tailwindcss').Config} */
export default {
  content: ["./*.html", "./*.js"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Heebo', 'sans-serif'],
      },
      colors: {
        brand: {
          dark: '#0f172a',   // Slate 900
          base: '#f8fafc',   // Slate 50
          navy: '#f1f5f9',   // Slate 100
          light: '#475569',  // Slate 600
          accent: '#0f766e', // Teal 700 (High contrast, accessible)
          glow: '#0d9488',   // Teal 600
        }
      },
      boxShadow: {
        'premium': '0 20px 40px -15px rgba(15, 118, 110, 0.2)',
        'glow': '0 0 20px rgba(15, 118, 110, 0.25)',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      }
    }
  },
  plugins: [],
}
