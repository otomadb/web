import { action } from "@storybook/addon-actions";
import { Meta, StoryObj } from "@storybook/react";

import { Presentation } from "./LikeSwitch";

const meta = {
  component: Presentation,
  args: {
    like: action("like"),
    unlike: action("unlike"),
  },
} satisfies Meta<typeof Presentation>;
export default meta;

type Story = StoryObj<typeof meta>;

export const IsLiked: Story = {
  args: {
    isLiked: true,
  },
};

export const IsNotLiked: Story = {
  args: {
    isLiked: false,
  },
};
