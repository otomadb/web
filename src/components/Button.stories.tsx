import { action } from "@storybook/addon-actions";
import { Meta, StoryObj } from "@storybook/react";

import Button from "./Button";

const meta = {
  component: Button,
} satisfies Meta<typeof Button>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    text: "Test",
    color: "blue",
    size: "medium",
    onClick: action("onClick"),
  },
};
