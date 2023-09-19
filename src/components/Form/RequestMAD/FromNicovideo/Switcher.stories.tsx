import { action } from "@storybook/addon-actions";
import { Meta, StoryObj } from "@storybook/react";

import { mockTagButton } from "~/app/editor/nicovideo/TagButton.mocks";
import { mockTagSearcher } from "~/components/TagSearcher/index.mocks";
import { ToastContext } from "~/components/Toaster";
import { MockedUrqlProvider } from "~/utils/MockedUrqlProvider";

import RequestMADFromNicovideoForm from "./Switcher";
import { mockRegisterSuccessfully } from "./useRequestFromNicovideo.mocks";

const meta = {
  component: RequestMADFromNicovideoForm,
  args: {
    style: {
      width: 640,
      height: 520,
    },
  },
  render(args) {
    return (
      <MockedUrqlProvider>
        <ToastContext.Provider value={{ call: action("callToast") }}>
          <RequestMADFromNicovideoForm {...args} />
        </ToastContext.Provider>
      </MockedUrqlProvider>
    );
  },
  parameters: {
    msw: {
      handlers: {
        unconcern: [mockTagButton, mockTagSearcher],
      },
    },
  },
} as Meta<typeof RequestMADFromNicovideoForm>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  parameters: {
    msw: {
      handlers: {
        concern: [mockRegisterSuccessfully],
      },
    },
  },
};

export const 最初からSourceIDを与える: Story = {
  args: {
    initialSourceId: "sm2057168",
  },
};
