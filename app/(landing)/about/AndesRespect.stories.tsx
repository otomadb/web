import { Meta, StoryObj } from "@storybook/react";

import AndesSpace from "./AndesRespect";

const meta = {
  component: AndesSpace,
  args: {
    style: {
      width: 960,
      height: 640,
    },
  },
} satisfies Meta<typeof AndesSpace>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {};
