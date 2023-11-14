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
      backdropBlur: {
        xs: '1px',
      },
      colors: {
        redx: {
          DEFAULT: '#E63755'
        },
        greenx: {
          DEFAULT: '#56AC30'
        },
        bluex: {
          DEFAULT: '#2573F0'
        },
        primary: {
          DEFAULT: '#0D9677',
          '50': '#edfcf6',
          '100': '#d3f8e8',
          '200': '#abefd6',
          '300': '#74e1bf',
          '400': '#3ccba3',
          '500': '#19b08b',
          '600': '#0d9677',
          '700': '#0a725d',
          '800': '#0b5a4b',
          '900': '#0a4a3e',
        },
        orangex: {
          DEFAULT: '#F08039'
        },
        purplex: {
          DEFAULT: '#6C5ED1'
        },
        neutral: {
          DEFAULT: '#F6F6F6',
          '50': '#F8F8F8',
          '100': '#f0f0f0',
          '200': '#e4e4e4',
          '300': '#d1d1d1',
          '400': '#B2B2B2',
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
