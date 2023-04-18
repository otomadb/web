import { action } from "@storybook/addon-actions";
import { Meta, StoryObj } from "@storybook/react";
import {
  createClient as createUrqlClient,
  fetchExchange,
  Provider as UrqlProvider,
} from "urql";

import { mockTagButton } from "~/app/editor/nicovideo/TagButton.mocks";
import { mockTagSearcher } from "~/components/TagSearcher/index.mocks";
import { ToastContext } from "~/components/Toaster";

import Controller from "./Controller";
import { mockNeitherRegisterNorRequest } from "./SourceChecker.mocks";
import { mockRegisterSuccessfully } from "./useRequestVideo.mocks";

const meta = {
  component: Controller,
  args: {
    style: { width: "1024px" },
  },
  render(args) {
    return (
      <UrqlProvider
        value={createUrqlClient({
          url: "/graphql",
          exchanges: [fetchExchange],
        })}
      >
        <ToastContext.Provider value={{ call: action("callToast") }}>
          <Controller {...args} />
        </ToastContext.Provider>
      </UrqlProvider>
    );
  },
  parameters: {
    msw: {
      handlers: {
        unconcern: [
          mockNeitherRegisterNorRequest,
          mockTagButton,
          mockTagSearcher,
        ],
      },
    },
  },
} as Meta<typeof Controller>;
export default meta;

export const Primary: StoryObj<typeof meta> = {
  parameters: {
    msw: {
      handlers: {
        concern: [mockRegisterSuccessfully],
      },
    },
  },
};
