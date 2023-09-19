import { Meta, StoryObj } from "@storybook/react";

import YoutubeIDForm from "./YoutubeIDForm";

const meta = {
  component: YoutubeIDForm,
  args: {
    style: { width: 512, height: 384 },
  },
} as Meta<typeof YoutubeIDForm>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {};
