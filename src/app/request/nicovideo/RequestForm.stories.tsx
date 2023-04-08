import { action } from "@storybook/addon-actions";
import { Meta, StoryObj } from "@storybook/react";
import {
  createClient as createUrqlClient,
  fetchExchange,
  Provider as UrqlProvider,
} from "urql";

import { mockTagButton } from "~/app/editor/nicovideo/_components/TagButton.mocks";
import { mockSearchBox } from "~/components/TagSearcher/SearchBox.mocks";
import { ToastContext } from "~/components/Toaster";

import RequestForm from "./RequestForm";
import { mockNeitherRegisterNorRequest } from "./SourceChecker.mocks";
import { mockRegisterSuccessfully } from "./useRequestVideo.mocks";

const meta = {
  component: RequestForm,
  args: {
    style: { width: "1024px" },
    sourceId: "sm2057168",
    clearSourceId: action("clearSourceId"),
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
          <RequestForm {...args} />
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
          mockSearchBox,
        ],
      },
    },
  },
} as Meta<typeof RequestForm>;
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
