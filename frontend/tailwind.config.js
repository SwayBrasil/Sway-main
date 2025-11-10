/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eef7ff',
          100: '#d9ecff',
          200: '#b6d9ff',
          300: '#8ec4ff',
          400: '#5aa7ff',
          500: '#2f8cff',
          600: '#1a6fe5',
          700: '#1557b3',
          800: '#0f3c80',
          900: '#0a2a59'
        }
      },
      boxShadow: {
        soft: '0 10px 30px rgba(2,6,23,0.08)'
      }
    },
  },
  plugins: [],
}

