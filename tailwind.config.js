const colors = require("tailwindcss/colors");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    zIndex: {
      0: 0,
      1: 1,
      infinity: 2147483647,
    },
    extend: {
      colors: {
        copyright: colors.pink,
        character: colors.green,
        music: colors.sky,
        event: colors.teal,
        series: colors.purple,
      },
    },
  },
  plugins: [require("@tailwindcss/line-clamp")],
};
