const plugin = require("tailwindcss/plugin");
const colors = require("tailwindcss/colors");

const mkTagTheme = (color) => ({
  "primary": color[300],
  "vivid": color[200],
  "primary-vivid": color[200],
  "secondary": color[400],

  "disabled": color[700],

  "bg": color[950],
  "bgHover": color[900],
  "bgDisabled": color[800],

  "frame": color[700],
  "frameHover": color[600],
  "frameDisabled": color[400],

  "back": color[950],
  "back-vivid": color[900],
  "back-muted": color[800],
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
      aria: {
        "disabled-false": 'disabled="false"',
      },
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
        "vivid": {
          primary: "hsl(162, 91%, 73%)",
        },
        "warn": {
          primary: colors.yellow[400],
        },
        "error": {
          primary: colors.red[600],
        },
        "like": {
          darkest: colors.rose[950],
          darker: colors.rose[900],
          primary: colors.rose[500],
          lighter: colors.rose[300],
          lightest: colors.rose[100],
        },
        "obsidian": {
          darkest: "hsl(232, 34%, 6%)",
          darker: "hsl(228, 21%, 9%)",
          primary: "hsl(222, 17%, 13%)",
          lighter: "hsl(218, 20%, 21%)",
          lightest: "hsl(216, 13%, 28%)",
        },
        "snow": {
          darkest: "hsl(210, 10.2%, 48.5%)",
          darker: "hsl(210, 13%, 62%)",
          primary: "hsl(210, 22%, 84%)",
          lighter: "hsl(210, 18%, 92%)",
          lightest: "hsl(210, 14%, 96%)",
        },
        // other services
        "nicovideo": { primary: "#FFF", sub: "#252525" },
        "youtube": { primary: "#FF0000" },
        "bilibili": { primary: "#22A8DE" },
        "soundcloud": { primary: "#FF5500" },
        // tags
        "tag-copyright": mkTagTheme(colors.rose),
        "tag-character": mkTagTheme(colors.green),
        "tag-music": mkTagTheme(colors.sky),
        // "tag-event": mkTagTheme(colors.teal),
        "tag-series": mkTagTheme(colors.purple),
        "tag-phrase": mkTagTheme(colors.yellow),
        "tag-subtle": mkTagTheme(colors.slate),
        "tag-unknown": mkTagTheme(colors.slate),

        "tag-realperson": {
          "primary": "hsl(78,10%,78%)",
          "primary-vivid": "hsl(78,12%,83%)",
          "primary-muted": "hsl(78,5%,42%)",
          "secondary": "hsl(78,10%,62%)",
          "secondary-vivid": "hsl(78,22%,70%)",
          "secondary-muted": "hsl(78,5%,34%)",
          "back": "hsl(78,10%,21%)",
          "back-vivid": "hsl(78,10%,29%)",
          "back-muted": "hsl(78,5%,18%)",
        },
        "tag-class": {
          "primary": "hsl(231,5%,74%)",
          "primary-vivid": "hsl(231,7%,83%)",
          "primary-muted": "hsl(231,2%,48%)",
          "secondary": "hsl(231,5%,48%)",
          "secondary-vivid": "hsl(231,12%,56%)",
          "secondary-muted": "hsl(231,3%,34%)",
          "back": "hsl(231,5%,21%)",
          "back-vivid": "hsl(231,8%,29%)",
          "back-muted": "hsl(231,5%,18%)",
        },
        "tag-style": {
          "primary": "hsl(193,25%,74%)",
          "primary-vivid": "hsl(193,35%,83%)",
          "primary-muted": "hsl(193,12%,48%)",
          "secondary": "hsl(193,15%,48%)",
          "secondary-vivid": "hsl(193,21%,56%)",
          "secondary-muted": "hsl(193,8%,34%)",
          "back": "hsl(193,12%,21%)",
          "back-vivid": "hsl(193,11%,29%)",
          "back-muted": "hsl(193,5%,18%)",
        },
        "tag-technique": {
          "primary": "hsl(156,25%,74%)",
          "primary-vivid": "hsl(156,35%,83%)",
          "primary-muted": "hsl(156,12%,48%)",
          "secondary": "hsl(156,15%,48%)",
          "secondary-vivid": "hsl(156,21%,56%)",
          "secondary-muted": "hsl(156,8%,34%)",
          "back": "hsl(156,12%,21%)",
          "back-vivid": "hsl(156,11%,29%)",
          "back-muted": "hsl(156,5%,18%)",
        },
        "tag-event": {
          "primary": "hsl(34,87%,74%)",
          "primary-vivid": "hsl(34,62%,83%)",
          "primary-muted": "hsl(34,35%,48%)",
          "secondary": "hsl(34,63%,54%)",
          "secondary-vivid": "hsl(34,69%,64%)",
          "secondary-muted": "hsl(34,43%,34%)",
          "back": "hsl(34,32%,21%)",
          "back-vivid": "hsl(34,52%,28%)",
          "back-muted": "hsl(34,29%,18%)",
        },
      },
      keyframes: {
        "stretch-t-to-b": {
          "0%": { transform: "scaleY(0)" },
          "100%": { transform: "scaleY(100%)" },
        },
        "scale-x-1-to-0": {
          "0%": { transform: "scaleX(1)" },
          "100%": { transform: "scaleX(0)" },
        },
        "fade-slide-l-to-r": {
          "0%": { opacity: 0, transform: "translateX(-1rem)" },
          "100%": { opacity: 1, transform: "translateX(0)" },
        },
        "fade-slide-r-to-l": {
          "0%": { opacity: 0, transform: "translateX(1rem)" },
          "100%": { opacity: 1, transform: "translateX(0)" },
        },
        "like": {
          "0%": { opacity: 1, transform: "scale(0)" },
          "50%": { opacity: 1 },
          "100%": { opacity: 1, transform: "scale(1)" },
        },
      },
    },
  },
  plugins: [
    require("@tailwindcss/container-queries"),
    require("@tailwindcss/aspect-ratio"),
    require("tailwind-scrollbar")({ nocompatible: true }),
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
