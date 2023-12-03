import { Meta, StoryObj } from "@storybook/react";

import Quote from "./Quote";

const meta = {
  component: Quote,
  args: {
    style: { width: 384 },
    initIndex: 1,
  },
} as Meta<typeof Quote>;
export default meta;

export const Primary: StoryObj<typeof meta> = {};
