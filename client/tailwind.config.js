/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {},
  },
  plugins: [],
  css: {
    // Change the output path and file name
    path: 'src/styles/',
    file: 'tailwind.css',
  },
}

