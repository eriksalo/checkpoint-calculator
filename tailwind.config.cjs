/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        midnight: '#04070C',
        slate: '#1F2937',
        aurora: '#5DF2FF',
        ember: '#FF6B6B',
        quartz: '#E5E7EB'
      },
      fontFamily: {
        sans: ['"Inter var"', 'Inter', 'system-ui', 'sans-serif']
      },
      boxShadow: {
        glow: '0 0 35px rgba(93, 242, 255, 0.35)'
      }
    }
  },
  plugins: []
};
