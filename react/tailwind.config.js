/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        customColorPrimaryBlack: '#000',
        customColorPrimaryWhite: '#000',
        customColorSecondary: '#4EE2EC',
        customColorTertiary: '#E238EC',
        customColorQuaternary: '#6AFB92'
      }
    },
  },
  plugins: [],
}

