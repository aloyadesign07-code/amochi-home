/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        sage: {
          50: '#f1f8f2',
          100: '#dceedd',
          200: '#b9dcbf',
          300: '#88bd94',
          400: '#579d6a',
          500: '#2A7342',
          600: '#225c35',
          700: '#1d4b2d',
          800: '#183c25',
          900: '#102a1a',
        },
        cream: {
          50: '#FCEAE6',
          100: '#FFFDF9',
          200: '#F7D5CD',
          300: '#efb9aa',
          400: '#e89a84',
          500: '#D87A43',
          600: '#B85B28',
          700: '#8f4521',
          800: '#64331f',
          900: '#40231b',
        },
        wood: {
          100: '#FFFDF9',
          200: '#F7D5CD',
          300: '#efb9aa',
          400: '#D87A43',
          500: '#B85B28',
          600: '#64331f',
          700: '#2C221E',
        },
        blush: {
          100: '#fff4f0',
          200: '#f7d5cd',
          300: '#efb9aa',
          400: '#D87A43',
          500: '#B85B28',
        },
        sky: {
          cozy: '#f8e4df',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        xl: '1rem',
        '2xl': '1.5rem',
        '3xl': '2rem',
      },
      boxShadow: {
        cozy: '0 6px 24px rgba(184, 91, 40, 0.12), 0 2px 6px rgba(44,34,30,0.08)',
        'cozy-lg': '0 12px 40px rgba(184, 91, 40, 0.16), 0 3px 10px rgba(44,34,30,0.10)',
        card: '0 4px 16px rgba(184, 91, 40, 0.10), 0 1px 4px rgba(44,34,30,0.06)',
      },
      animation: {
        'bounce-coin': 'bounceCoin 0.6s ease-out',
        'pop': 'pop 0.3s ease-out',
        'wiggle': 'wiggle 0.5s ease-in-out',
        'float': 'float 3s ease-in-out infinite',
      },
      keyframes: {
        bounceCoin: {
          '0%': { transform: 'scale(0.5) translateY(0)', opacity: '1' },
          '50%': { transform: 'scale(1.3) translateY(-20px)', opacity: '1' },
          '100%': { transform: 'scale(1) translateY(-40px)', opacity: '0' },
        },
        pop: {
          '0%': { transform: 'scale(0.8)', opacity: '0' },
          '70%': { transform: 'scale(1.1)' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        wiggle: {
          '0%, 100%': { transform: 'rotate(-5deg)' },
          '50%': { transform: 'rotate(5deg)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-6px)' },
        },
      },
    },
  },
  plugins: [],
};
