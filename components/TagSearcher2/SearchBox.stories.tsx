import { Meta, StoryObj } from "@storybook/react";

import SearchBox from "./SearchBox";

const meta = {
  component: SearchBox,
  args: {
    style: { width: "320px" },
    size: "medium",
  },
} as Meta<typeof SearchBox>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Small: Story = {
  args: {
    style: { width: 240 },
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
    style: { width: 480 },
    size: "large",
  },
};

export const Fetching: Story = {
  args: {
    fetching: true,
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};
