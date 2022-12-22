import { css } from "@emotion/css";
import { Meta, StoryObj } from "@storybook/react";

import { LoginForm } from "./LoginForm";
import { mockLoginHandler } from "./useLogin";

export default {
  component: LoginForm,
  args: {
    className: css`
      width: 400px;
    `,
  },
  parameters: {
    msw: {
      handlers: [mockLoginHandler],
    },
  },
} as Meta<typeof LoginForm>;

export const Primary: StoryObj<typeof LoginForm> = {
  args: {},
};
