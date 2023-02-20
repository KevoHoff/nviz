/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{html,js,svelte,ts}',
    "./node_modules/flowbite-svelte/**/*.{html,js,svelte,ts}"
  ],
  theme: {
    extend: {},
    colors: {
      primary: '#5c2edb',
      deepPrimary: '#4b21c0',
      lightPrimary: '#7751e1',
      light: '#EFEFEF',
      dark: '#0C111D',
      secondary: '#FF5E5B'
    }
  },
  plugins: [
    require('flowbite/plugin')
  ],
  darkMode: 'class'
};
