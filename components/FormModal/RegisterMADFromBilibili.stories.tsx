import { action } from "@storybook/addon-actions";
import { Meta, StoryObj } from "@storybook/react";

import { mockTagSearcher } from "~/components/TagSearcher/index.mocks";
import { ToastContext } from "~/components/Toaster";

import { FormModalContext } from ".";
import { mocksRegisterFromBilibili } from "./mocks";
import RegisterMADFromBilibiliFormModal from "./RegisterMADFromBilibili";

const meta = {
  component: RegisterMADFromBilibiliFormModal,
  args: {
    style: {
      width: 640,
      height: 720,
    },
  },
  render(args) {
    return (
      <ToastContext.Provider value={{ call: action("callToast") }}>
        <FormModalContext.Provider
          value={{
            current: undefined,
            open: action("openModal"),
            close: action("closeModal"),
          }}
        >
          <RegisterMADFromBilibiliFormModal {...args} />
        </FormModalContext.Provider>
      </ToastContext.Provider>
    );
  },
  parameters: {
    msw: {
      handlers: {
        unconcern: [mockTagSearcher],
        concern: mocksRegisterFromBilibili,
      },
    },
  },
} as Meta<typeof RegisterMADFromBilibiliFormModal>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {};

export const 最初からSourceIDを与える: Story = {
  args: {
    initialSourceId: "sm2057168",
  },
};
