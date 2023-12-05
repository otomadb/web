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

export const Loading: Story = {
  name: "読み込み中",
  args: {
    current: undefined,
  },
};

export const IsLiked: Story = {
  name: "いいね済み",
  args: {
    current: true,
  },
};

export const IsNotLiked: Story = {
  name: "まだいいねしていない",
  args: {
    current: false,
  },
};
