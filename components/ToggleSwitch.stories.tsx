import { action } from "@storybook/addon-actions";
import { Meta, StoryObj } from "@storybook/react";

import { ToggleSwitch } from "./ToggleSwitch";

export default {
  component: ToggleSwitch,
  args: {
    handleToggle: action("handleToggle"),
  },
  parameters: {
    layout: "centered",
  },
} as Meta<typeof ToggleSwitch>;

export const Primary: StoryObj<typeof ToggleSwitch> = {
  args: {},
};
