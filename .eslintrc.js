/** @type {import('eslint/lib/shared/types').ConfigData} */
module.exports = {
  root: true,
  extends: [
    "eslint:recommended",
    "next/core-web-vitals",
    "plugin:eslint-comments/recommended",
    "plugin:storybook/recommended",
  ],
  plugins: ["unused-imports", "simple-import-sort"],
  rules: {
    "prefer-spread": 2,
    "prefer-template": 2,
    "no-useless-rename": [2],
    "object-shorthand": [2, "always"],
    "quote-props": [2, "consistent"],
    "eqeqeq": 2,
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
    "eslint-comments/no-unused-disable": 2,
  },
  overrides: [
    {
      files: ["*.ts", "*.tsx"],
      extends: ["plugin:@typescript-eslint/recommended"],
      plugins: ["@typescript-eslint"],
      parser: "@typescript-eslint/parser",
      rules: {},
    },
  ],
};
