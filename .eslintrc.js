/** @type {import('eslint/lib/shared/types').ConfigData} */
module.exports = {
  root: true,
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "next/core-web-vitals",
    "plugin:eslint-comments/recommended",
    "plugin:storybook/recommended",
    "plugin:tailwindcss/recommended",
    "plugin:mdx/recommended",
  ],
  plugins: ["unused-imports", "simple-import-sort"],
  rules: {
    "prefer-spread": 2,
    "prefer-template": 2,
    "no-useless-rename": [2],
    "object-shorthand": [2, "always"],
    "quote-props": [2, "consistent"],
    "eqeqeq": 2,
    "no-empty-function": 2,
    /* unused-imports */
    "unused-imports/no-unused-imports": [2],
    /* simple-import-sort */
    "sort-imports": 0,
    "simple-import-sort/imports": 2,
    "simple-import-sort/exports": 2,
    /* react */
    "react/self-closing-comp": [
      2,
      {
        component: true,
        html: false,
      },
    ],
    /* next.js  */
    "@next/next/no-html-link-for-pages": [0], // https://github.com/vercel/next.js/issues/42448
    /* eslint-comments */
    "eslint-comments/require-description": 1,
    /* typescript */
    "@typescript-eslint/ban-ts-comment": 1,
    "@typescript-eslint/no-unused-vars": 1,
    "@typescript-eslint/no-explicit-any": 2,
  },
  overrides: [
    {
      files: ["opengraph-image.tsx"],
      rules: {
        "jsx-a11y/alt-text": 0,
        "@next/next/no-img-element": 0,
      },
    },
    {
      files: ["*.config.js"],
      rules: {
        "@typescript-eslint/no-var-requires": 0,
      },
    },
    {
      files: ["*.stories.ts", "*.stories.tsx"],
      rules: {
        "storybook/prefer-pascal-case": 0,
      },
    },
  ],
};
