import { action } from "@storybook/addon-actions";
import "../styles/globals.css";
import { ToastContext } from "../components/Toaster";

import { Preview } from "@storybook/react";
import { initialize as initializeMSW, mswDecorator } from "msw-storybook-addon";
import {
  Provider as UrqlProvider,
  createClient as createUrqlClient,
  fetchExchange,
} from "urql";

initializeMSW({
  onUnhandledRequest: "bypass",
});

const preview: Preview = {
  decorators: [
    (Story) => (
      <ToastContext.Provider value={{ call: action("callToast") }}>
        <UrqlProvider
          value={createUrqlClient({
            url: "/graphql",
            exchanges: [fetchExchange],
          })}
        >
          <Story />
        </UrqlProvider>
      </ToastContext.Provider>
    ),
    mswDecorator,
  ],
  parameters: {
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
    darkMode: {
      current: "dark",
    },
  },
};
export default preview;
