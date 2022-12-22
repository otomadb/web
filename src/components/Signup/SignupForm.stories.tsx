import { css } from "@emotion/css";
import { Meta, StoryObj } from "@storybook/react";
import { screen, userEvent } from "@storybook/testing-library";

import { SignupForm } from "./SignupForm";
import { mockSignupHandler } from "./useSignup";

export default {
  component: SignupForm,
  args: {
    className: css`
      width: 400px;
    `,
  },
  parameters: {
    msw: {
      handlers: [mockSignupHandler],
    },
  },
} as Meta<typeof SignupForm>;

export const Primary: StoryObj<typeof SignupForm> = {
  args: {},
};

export const SuccessfulFill: StoryObj<typeof SignupForm> = {
  name: "正常にユーザー登録完了",
  args: {},
  play: async () => {
    await userEvent.type(screen.getByLabelText("User name"), "testuser");
    await userEvent.type(screen.getByLabelText("Display name"), "Test User");
    await userEvent.type(
      screen.getByLabelText("Email"),
      "testuser@example.com"
    );
    await userEvent.type(screen.getByLabelText("Password"), "password");
    await userEvent.type(screen.getByLabelText("Retype password"), "password");
    await userEvent.click(screen.getByLabelText("Signup"));
  },
};

export const UsernameLessThen3: StoryObj<typeof SignupForm> = {
  name: "3文字以下のユーザーネーム",
  args: {},
  play: async () => {
    await userEvent.type(screen.getByLabelText("User name"), "te");
    await userEvent.type(screen.getByLabelText("Display name"), "Test User");
    await userEvent.type(
      screen.getByLabelText("Email"),
      "testuser@example.com"
    );
    await userEvent.type(screen.getByLabelText("Password"), "password");
    await userEvent.type(screen.getByLabelText("Retype password"), "password");
    await userEvent.click(screen.getByLabelText("Signup"));
  },
};

export const UsernameAlready: StoryObj<typeof SignupForm> = {
  name: "既に登録されているユーザーネーム",
  args: {},
  play: async () => {
    await userEvent.type(screen.getByLabelText("User name"), "already");
    await userEvent.type(screen.getByLabelText("Display name"), "Test User");
    await userEvent.type(
      screen.getByLabelText("Email"),
      "testuser@example.com"
    );
    await userEvent.type(screen.getByLabelText("Password"), "password");
    await userEvent.type(screen.getByLabelText("Retype password"), "password");
    await userEvent.click(screen.getByLabelText("Signup"));
  },
};

export const EmailInvalid: StoryObj<typeof SignupForm> = {
  name: "不正なメールアドレス",
  args: {},
  play: async () => {
    await userEvent.type(screen.getByLabelText("User name"), "testuser");
    await userEvent.type(screen.getByLabelText("Display name"), "Test User");
    await userEvent.type(screen.getByLabelText("Email"), "example.com");
    await userEvent.type(screen.getByLabelText("Password"), "password");
    await userEvent.type(screen.getByLabelText("Retype password"), "password");
    await userEvent.click(screen.getByLabelText("Signup"));
  },
};

export const EmailAlready: StoryObj<typeof SignupForm> = {
  name: "既に登録されたメールアドレス",
  args: {},
  play: async () => {
    await userEvent.type(screen.getByLabelText("User name"), "testuser");
    await userEvent.type(screen.getByLabelText("Display name"), "Test User");
    await userEvent.type(screen.getByLabelText("Email"), "already@example.com");
    await userEvent.type(screen.getByLabelText("Password"), "password");
    await userEvent.type(screen.getByLabelText("Retype password"), "password");
    await userEvent.click(screen.getByLabelText("Signup"));
  },
};
