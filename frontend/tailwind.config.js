/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#2874F0',
        accent: '#FF6161',
        success: '#26A541',
        warning: '#FF9F00',
        'page-bg': '#F1F3F6',
      },
      fontFamily: {
        heading: ['"Plus Jakarta Sans"', 'sans-serif'],
        body: ['"DM Sans"', 'sans-serif'],
      },
      boxShadow: {
        card: '0 1px 8px rgba(0,0,0,0.08)',
        'card-hover': '0 4px 20px rgba(0,0,0,0.14)',
      },
    },
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
  ],
}
