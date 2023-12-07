import { action } from "@storybook/addon-actions";
import { Meta, StoryObj } from "@storybook/react";

import NicovideoRequestForm from "./NicovideoRequestForm";

const meta = {
  component: NicovideoRequestForm,
  args: {
    style: {
      width: 640,
      height: 720,
    },
    handleCancel: action("cancel"),
  },
} as Meta<typeof NicovideoRequestForm>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};
