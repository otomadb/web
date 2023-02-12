import { css } from "@emotion/css";
import { Meta, StoryObj } from "@storybook/react";
import { userEvent, within } from "@storybook/testing-library";
import { graphql } from "msw";

import {
  aUser,
  LoginPage_LoginDocument,
  SigninFailedMessage,
} from "~/gql/graphql";

import { LoginForm } from "./LoginForm";

export default {
  component: LoginForm,
  args: {
    className: css`
      width: 400px;
    `,
  },
  render(args) {
    return <LoginForm {...args} />;
  },
} as Meta<typeof LoginForm>;

export const Primary: StoryObj<typeof LoginForm> = {};

export const NoUser: StoryObj<typeof LoginForm> = {
  name: "存在しないユーザー",
  args: {},
  parameters: {
    msw: {
      handlers: [
        graphql.mutation(LoginPage_LoginDocument, (req, res, ctx) => {
          return res(
            ctx.data({
              signin: {
                __typename: "SigninFailedPayload",
                message: SigninFailedMessage.UserNotFound,
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
      "sno2wman"
    );
    await userEvent.type(canvas.getByPlaceholderText("パスワード"), "password");
    await userEvent.click(canvas.getByRole("button"));
  },
};

export const WrongPassword: StoryObj<typeof LoginForm> = {
  name: "パスワードが間違っている",
  args: {},
  parameters: {
    msw: {
      handlers: [
        graphql.mutation(LoginPage_LoginDocument, (req, res, ctx) => {
          return res(
            ctx.data({
              signin: {
                __typename: "SigninFailedPayload",
                message: SigninFailedMessage.WrongPassword,
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
      "sno2wman"
    );
    await userEvent.type(canvas.getByPlaceholderText("パスワード"), "password");
    await userEvent.click(canvas.getByRole("button"));
  },
};

export const SuccessfulLogin: StoryObj<typeof LoginForm> = {
  name: "正常にログイン",
  args: {},
  parameters: {
    msw: {
      handlers: [
        graphql.mutation(LoginPage_LoginDocument, (req, res, ctx) => {
          return res(
            ctx.data({
              signin: {
                __typename: "SigninSucceededPayload",
                user: aUser({
                  id: "u1",
                  name: "sno2wman",
                  displayName: "SnO2WMaN",
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
      "sno2wman"
    );
    await userEvent.type(canvas.getByPlaceholderText("パスワード"), "password");
    await userEvent.click(canvas.getByRole("button"));
  },
};
