import { Meta, StoryObj } from "@storybook/react";

import Paginator from ".";

const meta = {
  component: Paginator,
  args: {
    pathname: "/",
    size: "md",
  },
} satisfies Meta<typeof Paginator>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    currentPage: 5,
    pageMax: 9,
  },
};
