const plugin = require("tailwindcss/plugin");
const colors = require("tailwindcss/colors");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./mdx-components.tsx",
    "./src/app/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    containers: {
      w96: "24rem",
      w128: "32rem",
      w192: "48rem",
      w240: "60rem",
      w320: "80rem",
    },
    extend: {
      fontSize: {
        xxs: ["0.6rem", "0.725rem"],
      },
      width: {
        128: "32rem",
      },
      height: {
        18: "4.5rem",
      },
      padding: {
        0.25: "0.0625rem",
      },
      zIndex: {
        0: 0,
        1: 1,
        infinity: 2147483647,
      },
      transitionDuration: {
        50: "50ms",
      },
      colors: {
        accent: {
          primary: "hsl(168, 81%, 65%)",
        },
        text: {
          primary: "hsl(182, 26%, 92%)",
          muted: "hsl(182, 8%, 53%)",
          disabled: "hsl(182, 20%, 29%)",
        },
        background: {
          root: "hsl(212, 24%, 5%)",

          deeper: "hsl(212, 14%, 7%)",
          primary: "hsl(212, 21%, 12%)",
          shallower: "hsl(212, 16%, 16%)",
          shallowest: colors.gray[600],

          muted: colors.gray[100],
        },
        vivid: {
          primary: "hsl(168, 81%, 65%)",
        },
        coal: {
          darkest: "hsl(15, 14%, 7%)",
          darker: "hsl(15, 14%, 7%)",
          primary: "hsl(15, 21%, 12%)",
          lighter: "hsl(15, 16%, 16%)",
          lightest: colors.gray[600],
        },
        snow: {
          darkest: colors.gray[100],
          darker: colors.gray[200],
          primary: colors.gray[300],
          lighter: colors.gray[400],
          lightest: colors.gray[500],
        },
        nicovideo: {
          primary: "#FFF",
          sub: "#252525",
        },
        youtube: { primary: "#FF0000" },
        bilibili: { primary: "#22A8DE" },
        soundcloud: { primary: "#FF5500" },
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
    plugin(({ addUtilities }) => {
      addUtilities({
        ".animation-paused": {
          "animation-play-state": "paused",
        },
        ".animation-running": {
          "animation-play-state": "running",
        },
      });
    }),
  ],
};
