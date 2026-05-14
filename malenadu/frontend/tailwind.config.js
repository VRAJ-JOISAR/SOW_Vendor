/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'malenadu-cream': '#F4F6F4',
        'malenadu-obsidian': '#0F172A',
        'malenadu-forest': '#355E3B',
        'malenadu-sage': '#E2EFE0',
        'malenadu-olive': '#2D472F',
      },
      borderRadius: {
        '3xl': '1.5rem',
        '4xl': '2rem',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
