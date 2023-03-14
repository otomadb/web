import { css } from "@emotion/css";
import { Meta, StoryObj } from "@storybook/react";
import { userEvent, within } from "@storybook/testing-library";
import { graphql } from "msw";

import { aUser, SignupPage_SignupDocument } from "~/gql/graphql";

import { SignupForm } from "./SignupForm";

export default {
  component: SignupForm,
  args: {
    className: css`
      width: 400px;
    `,
  },
  render(args) {
    return <SignupForm {...args} />;
  },
} as Meta<typeof SignupForm>;

export const Primary: StoryObj<typeof SignupForm> = {};

export const UsernameLessThen3: StoryObj<typeof SignupForm> = {
  name: "3文字以下のユーザーネーム",
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await userEvent.type(canvas.getByPlaceholderText("ユーザーネーム"), "te");
    await userEvent.type(
      canvas.getByPlaceholderText("表示される名前"),
      "Test User"
    );
    await userEvent.type(
      canvas.getByPlaceholderText("メールアドレス"),
      "testuser@example.com"
    );
    await userEvent.type(canvas.getByPlaceholderText("パスワード"), "password");
    await userEvent.type(
      canvas.getByPlaceholderText("パスワードの再入力"),
      "password"
    );
    await userEvent.click(canvas.getByRole("button"));
  },
};

export const EmailInvalid: StoryObj<typeof SignupForm> = {
  name: "不正な形のメールアドレス",
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await userEvent.type(
      canvas.getByPlaceholderText("ユーザーネーム"),
      "testuser"
    );
    await userEvent.type(
      canvas.getByPlaceholderText("表示される名前"),
      "Test User"
    );
    await userEvent.type(
      canvas.getByPlaceholderText("メールアドレス"),
      "example.com"
    );
    await userEvent.type(canvas.getByPlaceholderText("パスワード"), "password");
    await userEvent.type(
      canvas.getByPlaceholderText("パスワードの再入力"),
      "password"
    );
    await userEvent.click(canvas.getByRole("button"));
  },
};

export const UsernameAlready: StoryObj<typeof SignupForm> = {
  name: "既に登録されているユーザーネーム",
  args: {},
  parameters: {
    msw: {
      handlers: [
        graphql.mutation(SignupPage_SignupDocument, (req, res, ctx) => {
          return res(
            ctx.data({
              signup: {
                __typename: "SignupNameAlreadyExistsError",
                name: req.variables.name,
              },
            })
          );
        }),
      ],
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await userEvent.type(
      canvas.getByPlaceholderText("ユーザーネーム"),
      "already"
    );
    await userEvent.type(
      canvas.getByPlaceholderText("表示される名前"),
      "Test User"
    );
    await userEvent.type(
      canvas.getByPlaceholderText("メールアドレス"),
      "testuser@example.com"
    );
    await userEvent.type(canvas.getByPlaceholderText("パスワード"), "password");
    await userEvent.type(
      canvas.getByPlaceholderText("パスワードの再入力"),
      "password"
    );
    await userEvent.click(canvas.getByRole("button"));
  },
};

export const EmailAlready: StoryObj<typeof SignupForm> = {
  name: "既に登録されたメールアドレス",
  args: {},
  parameters: {
    msw: {
      handlers: [
        graphql.mutation(SignupPage_SignupDocument, (req, res, ctx) => {
          return res(
            ctx.data({
              signup: {
                __typename: "SignupEmailAlreadyExistsError",
                email: req.variables.email,
              },
            })
          );
        }),
      ],
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await userEvent.type(
      canvas.getByPlaceholderText("ユーザーネーム"),
      "testuser"
    );
    await userEvent.type(
      canvas.getByPlaceholderText("表示される名前"),
      "Test User"
    );
    await userEvent.type(
      canvas.getByPlaceholderText("メールアドレス"),
      "already@example.com"
    );
    await userEvent.type(canvas.getByPlaceholderText("パスワード"), "password");
    await userEvent.type(
      canvas.getByPlaceholderText("パスワードの再入力"),
      "password"
    );
    await userEvent.click(canvas.getByRole("button"));
  },
};

export const SuccessfulFill: StoryObj<typeof SignupForm> = {
  name: "正常にユーザー登録完了",
  args: {},
  parameters: {
    msw: {
      handlers: [
        graphql.mutation(SignupPage_SignupDocument, (req, res, ctx) => {
          return res(
            ctx.data({
              signup: {
                __typename: "SignupSucceededPayload",
                user: aUser({
                  id: "u1",
                  name: "testuser",
                  displayName: "Test User",
                }),
              },
            })
          );
        }),
      ],
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await userEvent.type(
      canvas.getByPlaceholderText("ユーザーネーム"),
      "testuser"
    );
    await userEvent.type(
      canvas.getByPlaceholderText("表示される名前"),
      "Test User"
    );
    await userEvent.type(
      canvas.getByPlaceholderText("メールアドレス"),
      "testuser@example.com"
    );
    await userEvent.type(canvas.getByPlaceholderText("パスワード"), "password");
    await userEvent.type(
      canvas.getByPlaceholderText("パスワードの再入力"),
      "password"
    );
    await userEvent.click(canvas.getByRole("button"));
  },
};
