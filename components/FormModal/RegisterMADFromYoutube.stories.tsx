import { action } from "@storybook/addon-actions";
import { Meta, StoryObj } from "@storybook/react";

import { mockTagSearcher } from "~/components/TagSearcher/index.mocks";

import { FormModalContext } from ".";
import { mocksRegisterFromYoutube } from "./mocks";
import RegisterMADFromYoutubeFormModal from "./RegisterMADFromYoutube";

const meta = {
  component: RegisterMADFromYoutubeFormModal,
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
        <RegisterMADFromYoutubeFormModal {...args} />{" "}
      </FormModalContext.Provider>
    );
  },
  parameters: {
    msw: {
      handlers: {
        unconcern: [mockTagSearcher],
        concern: mocksRegisterFromYoutube,
      },
    },
  },
} as Meta<typeof RegisterMADFromYoutubeFormModal>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {};

export const 最初からSourceIDを与える: Story = {
  args: {
    initialSourceId: "Q16KpquGsIc",
  },
};
