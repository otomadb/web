import { Meta, StoryObj } from "@storybook/react";

import Component from "./RequestExists";
import { mockRequestExists } from "./RequestExists.mocks";

const meta = {
  component: Component,
  args: {
    style: { width: "1024px" },
  },
} as Meta<typeof Component>;
export default meta;

export const Primary: StoryObj<typeof meta> = {
  args: {
    fragment: mockRequestExists,
  },
};
