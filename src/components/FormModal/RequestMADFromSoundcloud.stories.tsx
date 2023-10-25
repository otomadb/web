import { action } from "@storybook/addon-actions";
import { Meta, StoryObj } from "@storybook/react";

import { mockTagSearcher } from "~/components/TagSearcher/index.mocks";
import { ToastContext } from "~/components/Toaster";
import { MockedUrqlProvider } from "~/utils/MockedUrqlProvider";

import { FormModalContext } from ".";
import RequestMADFromSoundcloudFormModal from "./RequestMADFromSoundcloud";

const meta = {
  component: RequestMADFromSoundcloudFormModal,
  args: {
    style: {
      width: 640,
      height: 720,
    },
  },
  render(args) {
    return (
      <MockedUrqlProvider>
        <ToastContext.Provider value={{ call: action("callToast") }}>
          <FormModalContext.Provider
            value={{
              current: undefined,
              open: action("openModal"),
              close: action("closeModal"),
            }}
          >
            <RequestMADFromSoundcloudFormModal {...args} />
          </FormModalContext.Provider>
        </ToastContext.Provider>
      </MockedUrqlProvider>
    );
  },
  parameters: {
    msw: {
      handlers: {
        unconcern: [mockTagSearcher],
        concern: mocksRequestFromSoundcloud,
      },
    },
  },
} as Meta<typeof RequestMADFromSoundcloudFormModal>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {};

export const 最初からSourceIDを与える: Story = {
  args: {
    initialUrl: "sm2057168",
  },
};
