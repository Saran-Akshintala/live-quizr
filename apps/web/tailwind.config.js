/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{html,ts,scss}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'Ubuntu', 'Cantarell', 'Noto Sans', 'sans-serif'],
      },
      colors: {
        primary: { DEFAULT: '#4f46e5', dark: '#4338ca' }, // indigo-600 / indigo-700
        accent: { DEFAULT: '#10b981' }, // emerald-500
        bg: { DEFAULT: '#f8fafc', alt: '#f1f5f9' }, // slate-50 / slate-100
        text: { DEFAULT: '#0f172a', muted: '#334155' }, // slate-800 / slate-700
      },
    },
  },
  plugins: [],
};
