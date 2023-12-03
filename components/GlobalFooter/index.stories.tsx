import { Meta, StoryObj } from "@storybook/react";

import { Presentation } from ".";

const meta = {
  component: Presentation,
  args: {
    madsCount: 100,
    tagsCount: 100,
    quote: 1,
  },
} as Meta<typeof Presentation>;
export default meta;

export const Primary: StoryObj<typeof meta> = {
  args: {},
};
