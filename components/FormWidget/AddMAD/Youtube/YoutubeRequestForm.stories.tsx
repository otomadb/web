import { action } from "@storybook/addon-actions";
import { Meta, StoryObj } from "@storybook/react";

import YoutubeRequestForm from "./YoutubeRequestForm";

const meta = {
  component: YoutubeRequestForm,
  args: {
    style: {
      width: 640,
      height: 720,
    },
    handleCancel: action("cancel"),
  },
} as Meta<typeof YoutubeRequestForm>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};
