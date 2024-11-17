/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        cream: '#F8F4E1',
        tan: '#AF8F6F',
        brown: '#74512D',
        darkBrown: '#543310',
      },
    },
  },
  plugins: [],
};
