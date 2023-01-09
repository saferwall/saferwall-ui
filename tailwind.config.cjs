/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      fontFamily: {
        primary: 'Manrope',
      },
      borderRadius: {
        DEFAULT: "6px"
      },
      boxShadow: {
        'base': '0px 2px 9px rgb(0 0 0 / 0.05)'
      },
      colors: {
        redx: {
          DEFAULT: '#E63755'
        },
        greenx: {
          DEFAULT: '#56AC30'
        },
        primary: {
          DEFAULT: '#0D9677'
        },
        grayx: {
          DEFAULT: '#F6F6F6',
          '50': '#f6f6f6',
          '100': '#f0f0f0',
          '200': '#e4e4e4',
          '300': '#d1d1d1',
          '400': '#b4b4b4',
          '500': '#9a9a9a',
          '600': '#818181',
          '700': '#6a6a6a',
          '800': '#5a5a5a',
          '900': '#4e4e4e',
        }
      }
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
