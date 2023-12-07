import { action } from "@storybook/addon-actions";
import { Meta, StoryObj } from "@storybook/react";

import SoundcloudRequestForm from "./SoundcloudRequestForm";

const meta = {
  component: SoundcloudRequestForm,
  args: {
    style: {
      width: 640,
      height: 720,
    },
    handleCancel: action("cancel"),
  },
} as Meta<typeof SoundcloudRequestForm>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};
