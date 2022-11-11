const colors = require("tailwindcss/colors");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        character: colors.green,
        class: colors.violet,
        music: colors.cyan,
        work: colors.pink,
      },
    },
  },
  plugins: [],
};
