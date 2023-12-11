import type { StorybookConfig } from "@storybook/nextjs";
import { isRegExp } from "util/types";

const config: StorybookConfig = {
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
  docs: {
    autodocs: "tag",
    defaultName: "Documentation",
  },
  webpackFinal: async (config) => {
    if (!config.module) config.module = {};

    config.module.rules = [
      ...(config.module.rules || []).map((rule) => {
        if (
          typeof rule === "object" &&
          isRegExp(rule?.test) &&
          rule?.test.test(".svg")
        )
          return { ...rule, exclude: /\.svg$/ };
        else return rule;
      }),
      {
        test: /\.svg$/,
        use: [
          {
            loader: "@svgr/webpack",
            options: {
              svgo: true,
            },
          },
        ],
      },
    ];

    return config;
  },
};
export default config;
