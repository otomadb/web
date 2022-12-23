import { Meta, StoryObj } from "@storybook/react";
import { graphql } from "msw";
import { createClient, Provider } from "urql";

import { aUser, ViewerDocument } from "~/gql/graphql";

import { Profile } from "./Profile";

export default {
  component: Profile,
  args: {},
  render: (args) => (
    <Provider value={createClient({ url: "/graphql" })}>
      <Profile {...args} />
    </Provider>
  ),
  parameters: {
    layout: "centered",
    msw: {
      handlers: [
        graphql.query(ViewerDocument, (req, res, ctx) => {
          return res(
            ctx.data({
              whoami: aUser({
                id: "1",
                name: "SnO2WMaN",
                displayName: "SnO2WMaN",
                icon: "/storybook/512x512.png",
              }),
            })
          );
        }),
      ],
    },
  },
} as Meta<typeof Profile>;

export const Primary: StoryObj<typeof Profile> = {
  args: {},
};

export const LoggedIn: StoryObj<typeof Profile> = {
  name: "ログイン済み",
  args: {},
};

export const NotLogin: StoryObj<typeof Profile> = {
  name: "未ログイン",
  args: {},
  parameters: {
    msw: {
      handlers: [
        graphql.query(ViewerDocument, (req, res, ctx) => {
          return res(ctx.delay(500), ctx.data({ whoami: null }));
        }),
      ],
    },
  },
};

export const Loading: StoryObj<typeof Profile> = {
  name: "ユーザーをロード中",
  args: {},
  parameters: {
    msw: {
      handlers: [
        graphql.query(ViewerDocument, async (req, res, ctx) => {
          return res(ctx.delay("infinite"));
        }),
      ],
    },
  },
};
