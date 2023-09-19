import { action } from "@storybook/addon-actions";
import { Meta, StoryObj } from "@storybook/react";

import { mockTagButton } from "~/app/editor/nicovideo/TagButton.mocks";
import { mockTagSearcher } from "~/components/TagSearcher/index.mocks";
import { ToastContext } from "~/components/Toaster";
import { MockedUrqlProvider } from "~/utils/MockedUrqlProvider";

import RegisterMADFromNicovideoFormModal from "./RegisterMADFromNicovideo";

const meta = {
  component: RegisterMADFromNicovideoFormModal,
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
          <RegisterMADFromNicovideoFormModal {...args} />
        </ToastContext.Provider>
      </MockedUrqlProvider>
    );
  },
  parameters: {
    msw: {
      handlers: {
        unconcern: [mockTagButton, mockTagSearcher],
        concern: [],
      },
    },
  },
} as Meta<typeof RegisterMADFromNicovideoFormModal>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {};

export const 最初からSourceIDを与える: Story = {
  args: {
    initialSourceId: "Q16KpquGsIc",
  },
};
