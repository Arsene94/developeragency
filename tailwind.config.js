/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        teal: {
          50:  '#f5fbff',
          100: '#e0f4ff',
          200: '#c2e7ff',
          300: '#a4dbff',
          400: '#89CFF0', // your main baby blue
          500: '#61bff0',
          600: '#3aafe0',
          700: '#2b92b8',
          800: '#207490',
          900: '#175c72',
          950: '#0e3a4b',
        },
        navy: {
          50: '#f0f7ff',
          100: '#e0f0ff',
          200: '#b9e0ff',
          300: '#7cc8ff',
          400: '#36adff',
          500: '#0090ff',
          600: '#0072d6',
          700: '#0A2647',
          800: '#001e47',
          900: '#00173c',
          950: '#000d25',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        serif: ['Merriweather', 'Georgia', 'serif'],
      },
      spacing: {
        '128': '32rem',
        '144': '36rem',
      },
      boxShadow: {
        'soft': '0 4px 20px rgba(0, 0, 0, 0.05)',
      },
      transitionDuration: {
        '2000': '2000ms',
      },
    },
  },
  plugins: [],
};
