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
        "class": colors.violet,
        "background-music": colors.blue,
        "music": colors.cyan,
        "anime": colors.pink,
        "character": colors.green,
        "otomad": colors.red,
      },
    },
  },
  plugins: [],
};
