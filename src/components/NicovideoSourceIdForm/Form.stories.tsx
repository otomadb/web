import { action } from "@storybook/addon-actions";
import { Meta, StoryObj } from "@storybook/react";

import { SourceIdInputForm } from "./Form";

const meta = {
  component: SourceIdInputForm,
  args: {
    set: action("set"),
  },
  render(args) {
    return <SourceIdInputForm {...args} />;
  },
  parameters: {
    msw: { handlers: [] },
  },
} as Meta<typeof SourceIdInputForm>;
export default meta;

export const Primary: StoryObj<typeof meta> = {
  args: {},
};
