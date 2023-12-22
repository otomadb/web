import { Meta, StoryObj } from "@storybook/react";

import IconUpdateController from "./IconUpdateController";
import { mockUpdateIconSucceeded } from "./IconUpdateModal.stories";

const meta = {
  component: IconUpdateController,
  args: {
    style: {
      width: 640,
      height: 500,
    },
  },
  parameters: {
    msw: {
      handlers: {
        primary: [mockUpdateIconSucceeded],
      },
    },
  },
} satisfies Meta<typeof IconUpdateController>;
export default meta;

type Story = StoryObj<typeof meta>;
export const Primary: Story = {};
