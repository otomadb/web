import { action } from "@storybook/addon-actions";
import { Meta, StoryObj } from "@storybook/react";

import Crust from "./Crust";

const meta = {
  component: Crust,
  args: {
    style: { width: 384 },
    eatMe: action("eatMe"),
    duration: 10000,
    children: "This is test",
    type: "info",
    onClick: undefined,
  },
} as Meta<typeof Crust>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Info: Story = {
  args: {
    type: "info",
  },
};

export const Warn: Story = {
  args: {
    type: "warn",
  },
};

export const Error: Story = {
  args: {
    type: "error",
  },
};

export const Clickable: Story = {
  args: {
    onClick: action("onClick"),
  },
};
