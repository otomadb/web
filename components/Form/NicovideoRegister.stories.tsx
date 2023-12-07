import { action } from "@storybook/addon-actions";
import { Meta, StoryObj } from "@storybook/react";

import NicovideoRegisterForm from "./NicovideoRegisterForm";

const meta = {
  component: NicovideoRegisterForm,
  args: {
    style: {
      width: 640,
      height: 720,
    },
    initThumbnailUrl: "/960x540.jpg",
    handleCancel: action("cancel"),
  },
} as Meta<typeof NicovideoRegisterForm>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};
