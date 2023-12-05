import { action } from "@storybook/addon-actions";
import { Meta, StoryObj } from "@storybook/react";

import { mockTagSearcher } from "~/components/TagSearcher/index.mocks";

import { FormModalContext } from ".";
import { mocksRegisterFromNicovideo } from "./mocks";
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
      <FormModalContext.Provider
        value={{
          current: undefined,
          open: action("openModal"),
          close: action("closeModal"),
        }}
      >
        <RegisterMADFromNicovideoFormModal {...args} />
      </FormModalContext.Provider>
    );
  },
  parameters: {
    msw: {
      handlers: {
        unconcern: [mockTagSearcher],
        concern: mocksRegisterFromNicovideo,
      },
    },
  },
} as Meta<typeof RegisterMADFromNicovideoFormModal>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {};

export const 最初からSourceIDを与える: Story = {
  args: {
    initialSourceId: "sm2057168",
  },
};
