import { Meta, StoryObj } from "@storybook/react";

import { mockLoginHandler } from "~/hooks/useLogin";

import { LoginForm } from "./LoginForm";

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
