import { Meta, StoryObj } from "@storybook/react";

import { GlobalFooter } from ".";

const meta = {
  component: GlobalFooter,
} as Meta<typeof GlobalFooter>;
export default meta;

export const Primary: StoryObj<typeof meta> = {
  args: {},
};
