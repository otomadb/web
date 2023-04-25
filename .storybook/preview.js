import "../src/app/globals.css";

import { initialize as initializeMSW, mswDecorator } from "msw-storybook-addon";

initializeMSW({
  onUnhandledRequest: "bypass",
});

export const decorators = [mswDecorator];

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  nextjs: {
    appDirectory: true,
  },
};
