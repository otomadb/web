import { Meta, StoryObj } from "@storybook/react";

import { TextInput2 } from "./TextInput";

const meta = {
  component: TextInput2,
  args: {
    placeholder: "Placeholder",
    style: { width: 384 },
  },
} as Meta<typeof TextInput2>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Small: Story = {
  args: {
    size: "small",
  },
};

export const Medium: Story = {
  args: {
    size: "medium",
  },
};

export const Large: Story = {
  args: {
    size: "large",
  },
};
