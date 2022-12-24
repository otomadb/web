import { css } from "@emotion/css";
import { Meta, StoryObj } from "@storybook/react";
import { userEvent, within } from "@storybook/testing-library";
import { rest } from "msw";

import { RestProvider } from "~/rest";

import { LoginForm } from "./LoginForm";

export default {
  component: LoginForm,
  args: {
    className: css`
      width: 400px;
    `,
  },
  render(args) {
    return (
      <RestProvider value={{ base: "/" }}>
        <LoginForm {...args} />
      </RestProvider>
    );
  },
} as Meta<typeof LoginForm>;

export const Primary: StoryObj<typeof LoginForm> = {};

export const NoUser: StoryObj<typeof LoginForm> = {
  name: "存在しないユーザー",
  args: {},
  parameters: {
    msw: {
      handlers: [
        rest.post("/auth/login", async (req, res, ctx) =>
          res(ctx.status(400), ctx.json({ error: "user not found" }))
        ),
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
        rest.post("/auth/login", async (req, res, ctx) =>
          res(ctx.status(400), ctx.json({ error: "password wrong" }))
        ),
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
        rest.post("/auth/login", async (req, res, ctx) => {
          return res(
            ctx.cookie("otmd-session", "sessionid-secret", {
              httpOnly: true,
              sameSite: "strict",
              secure: false,
            }),
            ctx.json({ id: "1" })
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
