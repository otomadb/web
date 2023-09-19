import { Meta, StoryObj } from "@storybook/react";

import NicovideoIDForm from "./NicovideoIDForm";

const meta = {
  component: NicovideoIDForm,
  args: {
    style: { width: 512, height: 384 },
  },
} as Meta<typeof NicovideoIDForm>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {};
