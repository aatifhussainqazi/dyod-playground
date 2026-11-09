/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: {
          DEFAULT: '#FFF8ED',
          50: '#FFFCF7',
          100: '#FFF8ED',
          200: '#FFEECF',
        },
        sky: {
          DEFAULT: '#A8D8FF',
          light: '#CEE8FF',
          dark: '#70B5F5',
        },
        sunny: {
          DEFAULT: '#FFE66D',
          light: '#FFF09E',
          dark: '#E5C83B',
        },
        coral: {
          DEFAULT: '#FF8B76',
          light: '#FFAEA0',
          dark: '#E0644D',
        },
        mint: {
          DEFAULT: '#B7E4C7',
          light: '#D5F2DF',
          dark: '#86CD9F',
        },
        lavender: {
          DEFAULT: '#D9C2FF',
          light: '#EADCFE',
          dark: '#B794F6',
        },
        ink: {
          DEFAULT: '#242424',
          muted: '#525252',
          subtle: '#787878',
        }
      },
      fontFamily: {
        heading: ['"Fredoka"', 'sans-serif'],
        body: ['"Nunito"', '"DM Sans"', 'sans-serif'],
      },
      boxShadow: {
        'pop': '4px 4px 0px 0px #242424',
        'pop-sm': '2px 2px 0px 0px #242424',
        'pop-lg': '6px 6px 0px 0px #242424',
        'pop-xl': '8px 8px 0px 0px #242424',
        'pop-hover': '2px 2px 0px 0px #242424',
      },
      animation: {
        'float-slow': 'float 6s ease-in-out infinite',
        'float-medium': 'float 4s ease-in-out infinite',
        'wiggle': 'wiggle 2s ease-in-out infinite',
        'spin-slow': 'spin 12s linear infinite',
        'pulse-gentle': 'pulseGentle 3s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-12px) rotate(3deg)' },
        },
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        },
        pulseGentle: {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.88', transform: 'scale(1.03)' },
        }
      }
    },
  },
  plugins: [],
}
