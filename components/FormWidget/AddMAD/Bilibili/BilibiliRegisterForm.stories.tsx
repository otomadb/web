import { action } from "@storybook/addon-actions";
import { Meta, StoryObj } from "@storybook/react";

import BilibiliRegisterForm from "./BilibiliRegisterForm";

const meta = {
  component: BilibiliRegisterForm,
  args: {
    style: {
      width: 640,
      height: 720,
    },
    initThumbnailUrl: "/960x540.jpg",
    handleCancel: action("cancel"),
  },
} as Meta<typeof BilibiliRegisterForm>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};
