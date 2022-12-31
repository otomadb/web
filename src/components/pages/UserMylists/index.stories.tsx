import { css } from "@emotion/css";
import { Meta, StoryObj } from "@storybook/react";
import { graphql } from "msw";
import {
  createClient as createUrqlClient,
  Provider as UrqlProvider,
} from "urql";

import {
  aMylist,
  aMylistsConnection,
  aUser,
  ProfileMylistsPage_MylistsDocument,
} from "~/gql/graphql";

import { Mylists } from ".";

export default {
  component: Mylists,
  render(args) {
    return (
      <UrqlProvider value={createUrqlClient({ url: "/graphql" })}>
        <Mylists {...args} />
      </UrqlProvider>
    );
  },
  parameters: {
    layout: "centered",
    msw: {
      handlers: [
        graphql.query(ProfileMylistsPage_MylistsDocument, (req, res, ctx) =>
          res(
            ctx.data({
              whoami: aUser({
                id: "user:1",
                icon: "/storybook/512x512.png",
                name: "sno2wman",
                displayName: "SnO2WMaN",
                mylists: aMylistsConnection({
                  nodes: [
                    aMylist({ id: "mylist:1" }),
                    aMylist({ id: "mylist:2" }),
                  ],
                }),
              }),
            })
          )
        ),
      ],
    },
  },
} as Meta<typeof Mylists>;

export const NotLoggedIn: StoryObj<typeof Mylists> = {
  name: "未ログイン時",
  args: {
    className: css`
      width: 1024px;
    `,
  },
  parameters: {
    msw: {
      handlers: [
        graphql.query(ProfileMylistsPage_MylistsDocument, (req, res, ctx) =>
          res(ctx.data({ whoami: null }))
        ),
      ],
    },
  },
};

export const Loading: StoryObj<typeof Mylists> = {
  name: "ロード中",
  args: {
    className: css`
      width: 1024px;
    `,
  },
  parameters: {
    msw: {
      handlers: [
        graphql.query(ProfileMylistsPage_MylistsDocument, (req, res, ctx) =>
          res(ctx.delay("infinite"))
        ),
      ],
    },
  },
};

export const Width1024: StoryObj<typeof Mylists> = {
  name: "横幅1024px",
  args: {
    className: css`
      width: 1024px;
    `,
  },
};
