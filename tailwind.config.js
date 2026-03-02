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
          dark: '#0f172a',        // Main text & Headings (Soft Black)
          light: '#475569',       // Paragraphs (Dark Gray)
          base: '#f8fafc',        // Secondary background (Off-white)
          navy: '#f1f5f9',        // Light background variant
          primary: '#0284c7',     // Primary Brand (Deep Sky Blue)
          primaryGlow: '#0ea5e9', // Primary Hover (Light Sky Blue)
          accent: '#047857',      // Secondary / Action (Emerald-700 — WCAG AA: 5.56:1 on white)
          glow: '#065f46',        // Accent hover (Emerald-800 — darker for hover states)
          whatsapp: '#25D366',    // WhatsApp specific
        }
      },
      boxShadow: {
        'premium': '0 20px 40px -15px rgba(2, 132, 199, 0.2)',
        'glow': '0 0 20px rgba(2, 132, 199, 0.25)',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      }
    }
  },
  plugins: [],
}
