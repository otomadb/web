const plugin = require("tailwindcss/plugin");
const colors = require("tailwindcss/colors");

const myConfig = require("@otomadb/tailwind-config");

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
        ...myConfig.colors,
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
    plugin(({ addUtilities, addVariant }) => {
      addVariant("aria-current-page", '&[aria-current="page"]');
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
