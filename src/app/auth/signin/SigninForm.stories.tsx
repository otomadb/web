import { action } from "@storybook/addon-actions";
import { Meta, StoryObj } from "@storybook/react";
import { userEvent, within } from "@storybook/testing-library";
import { graphql } from "msw";
import {
  createClient as createUrqlClient,
  Provider as UrqlProvider,
} from "urql";

import { ToastContext } from "~/components/Toaster";
import {
  aUser,
  SigninFailedMessage,
  SigninPage_SigninDocument,
} from "~/gql/graphql";

import { SigninForm } from "./SigninForm";
import { Mutation } from "./useSignin";

export default {
  component: SigninForm,
  render(args) {
    return (
      <UrqlProvider value={createUrqlClient({ url: "/graphql" })}>
        <ToastContext.Provider value={{ call: action("callToast") }}>
          <SigninForm {...args} style={{ width: "384px" }} />
        </ToastContext.Provider>
      </UrqlProvider>
    );
  },
  parameters: {
    msw: {
      handlers: [
        graphql.mutation(Mutation, (req, res, ctx) => {
          return res(
            ctx.data({
              signin: {
                __typename: "SigninSucceededPayload",
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
    await userEvent.type(canvas.getByLabelText("ユーザーネーム"), "testuser");
    await userEvent.type(canvas.getByLabelText("パスワード"), "password");
    await userEvent.click(canvas.getByText("ログイン", { selector: "button" }));
  },
} as Meta<typeof SigninForm>;

export const Primary: StoryObj<typeof SigninForm> = {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  play: () => {},
};

export const NoUser: StoryObj<typeof SigninForm> = {
  name: "存在しないユーザー",
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
};

export const WrongPassword: StoryObj<typeof SigninForm> = {
  name: "パスワードが間違っている",
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
};

export const SuccessfulSignin: StoryObj<typeof SigninForm> = {
  name: "正常にログイン",
};
