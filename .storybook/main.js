module.exports = {
  stories: [
    "../stories/*.mdx",
    "../**/*.stories.mdx",
    "../**/*.stories.@(js|jsx|ts|tsx)",
  ],
  staticDirs: ["./public"],
  addons: [
    "@storybook/addon-essentials",
    "@storybook/addon-links",
    "@storybook/addon-interactions",
    "@storybook/addon-docs",
  ],
  framework: {
    name: "@storybook/nextjs",
    options: {},
  },
  webpackFinal: async (config) => {
    config.module.rules = config.module.rules.map((rule) => {
      if (/svg/.test(rule.test)) return { ...rule, exclude: /\.svg$/i };
      return rule;
    });
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });
    return config;
  },
};
