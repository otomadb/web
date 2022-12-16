import { Meta, StoryObj } from "@storybook/react";

import { LoginForm } from "./LoginForm";
import { mockLoginHandler } from "./useLogin";

export default {
  component: LoginForm,
  parameters: {
    msw: {
      handlers: [mockLoginHandler],
    },
  },
} as Meta<typeof LoginForm>;

export const Primary: StoryObj<typeof LoginForm> = {
  args: {},
};
