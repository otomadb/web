import { action } from "@storybook/addon-actions";
import { Meta, StoryObj } from "@storybook/react";

import SoundcloudURLForm from "./SoundCloudURLForm";
import SoundCloudURLForm from "./SoundCloudURLForm";

const meta = {
  component: SoundcloudURLForm,
  args: {
    style: { width: 512, height: 384 },
    set: action("set"),
  },
} as Meta<typeof SoundCloudURLForm>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {};
