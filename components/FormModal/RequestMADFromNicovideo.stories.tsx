import { action } from "@storybook/addon-actions";
import { Meta, StoryObj } from "@storybook/react";

import { mockTagSearcher } from "~/components/TagSearcher/index.mocks";

import { FormModalContext } from ".";
import { mocksRequestFromNicovideo } from "./mocks";
import RequestMADFromNicovideoFormModal from "./RequestMADFromNicovideo";

const meta = {
  component: RequestMADFromNicovideoFormModal,
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
        <RequestMADFromNicovideoFormModal {...args} />
      </FormModalContext.Provider>
    );
  },
  parameters: {
    msw: {
      handlers: {
        unconcern: [mockTagSearcher],
        concern: mocksRequestFromNicovideo,
      },
    },
  },
} as Meta<typeof RequestMADFromNicovideoFormModal>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {};

export const 最初からSourceIDを与える: Story = {
  args: {
    initialSourceId: "sm2057168",
  },
};
