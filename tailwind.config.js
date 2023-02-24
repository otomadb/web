const colors = require("tailwindcss/colors");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      height: {
        18: "4.5rem",
      },
      zIndex: {
        0: 0,
        1: 1,
        infinity: 2147483647,
      },
      colors: {
        copyright: colors.pink,
        character: colors.green,
        music: colors.sky,
        event: colors.teal,
        series: colors.purple,
        phrase: colors.gray,
      },
    },
  },
  plugins: [
    require("@tailwindcss/container-queries"),
    require("@tailwindcss/line-clamp"),
  ],
};
