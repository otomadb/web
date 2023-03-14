import { css } from "@emotion/css";
import { Meta, StoryObj } from "@storybook/react";
import { userEvent, within } from "@storybook/testing-library";
import { graphql } from "msw";

import {
  aUser,
  SigninFailedMessage,
  SigninPage_SigninDocument,
} from "~/gql/graphql";

import { SigninForm } from "./SigninForm";

export default {
  component: SigninForm,
  args: {
    className: css`
      width: 400px;
    `,
  },
  render(args) {
    return <SigninForm {...args} />;
  },
} as Meta<typeof SigninForm>;

export const Primary: StoryObj<typeof SigninForm> = {};

export const NoUser: StoryObj<typeof SigninForm> = {
  name: "存在しないユーザー",
  args: {},
  parameters: {
    msw: {
      handlers: [
        graphql.mutation(SigninPage_SigninDocument, (req, res, ctx) => {
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

export const WrongPassword: StoryObj<typeof SigninForm> = {
  name: "パスワードが間違っている",
  args: {},
  parameters: {
    msw: {
      handlers: [
        graphql.mutation(SigninPage_SigninDocument, (req, res, ctx) => {
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

export const SuccessfulSignin: StoryObj<typeof SigninForm> = {
  name: "正常にログイン",
  args: {},
  parameters: {
    msw: {
      handlers: [
        graphql.mutation(SigninPage_SigninDocument, (req, res, ctx) => {
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
