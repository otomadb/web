const plugin = require("tailwindcss/plugin");
const colors = require("tailwindcss/colors");

const mkTagTheme = (color) => ({
  primary: color[300],
  secondary: color[400],
  vivid: color[200],

  disabled: color[700],

  bg: color[950],
  bgHover: color[900],
  bgDisabled: color[800],

  frame: color[700],
  frameHover: color[600],
  frameDisabled: color[400],
});

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./mdx-components.tsx",
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
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
        "accent": {
          primary: "hsl(168, 81%, 65%)",
        },
        "text": {
          primary: "hsl(182, 26%, 92%)",
          muted: "hsl(182, 8%, 53%)",
          disabled: "hsl(182, 20%, 29%)",
        },
        "background": {
          root: "hsl(212, 24%, 5%)",

          deeper: "hsl(212, 14%, 7%)",
          primary: "hsl(212, 21%, 12%)",
          shallower: "hsl(212, 16%, 16%)",
          shallowest: colors.gray[600],

          muted: colors.gray[100],
        },
        "vivid": {
          primary: "hsl(168, 81%, 65%)",
        },
        "coal": {
          darkest: "hsl(15, 25%, 5%)",
          darker: "hsl(15, 14%, 7%)",
          primary: "hsl(15, 21%, 12%)",
          lighter: "hsl(15, 16%, 16%)",
          lightest: colors.gray[600],
        },
        "obsidian": {
          darkest: "hsl(222, 25%, 5%)",
          darker: "hsl(222, 14%, 7%)",
          primary: "hsl(222, 22%, 11%)",
          lighter: "hsl(222, 16%, 16%)",
          lightest: "hsl(222, 16%, 16%)",
        },
        "snow": {
          darkest: "hsl(210, 16%, 53%)",
          darker: "hsl(210, 29%, 76%)",
          primary: "hsl(210, 22%, 84%)",
          lighter: colors.gray[200],
          lightest: colors.gray[100],
        },
        // other services
        "nicovideo": { primary: "#FFF", sub: "#252525" },
        "youtube": { primary: "#FF0000" },
        "bilibili": { primary: "#22A8DE" },
        "soundcloud": { primary: "#FF5500" },
        // tags
        "tag-copyright": mkTagTheme(colors.rose),
        "tag-character": mkTagTheme(colors.green),
        "tag-class": mkTagTheme(colors.slate),
        "tag-music": mkTagTheme(colors.sky),
        "tag-event": mkTagTheme(colors.teal),
        "tag-series": mkTagTheme(colors.purple),
        "tag-phrase": mkTagTheme(colors.yellow),
        "tag-style": mkTagTheme(colors.slate),
        "tag-subtle": mkTagTheme(colors.slate),
        "tag-tactics": mkTagTheme(colors.slate),
        "tag-unknown": mkTagTheme(colors.slate),
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
