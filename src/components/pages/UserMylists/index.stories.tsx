import { css } from "@emotion/css";
import { Meta, StoryObj } from "@storybook/react";
import { graphql } from "msw";
import {
  createClient as createUrqlClient,
  Provider as UrqlProvider,
} from "urql";

import {
  aMylist,
  aMylistConnection,
  aUser,
  UserMylistsPage_AuthMylistsDocument,
  UserMylistsPage_ViewerDocument,
} from "~/gql/graphql";

import { Mylists } from ".";

const mock_UserMylistsPage_ViewerDocument_loggedIn = graphql.query(
  UserMylistsPage_ViewerDocument,
  (req, res, ctx) => res(ctx.data({ whoami: { id: "user:1" } }))
);
const mock_UserMylistsPage_ViewerDocument_notLoggedIn = graphql.query(
  UserMylistsPage_ViewerDocument,
  (req, res, ctx) => res(ctx.data({ whoami: null }))
);

export default {
  component: Mylists,
  render(args) {
    return (
      <UrqlProvider value={createUrqlClient({ url: "/graphql" })}>
        <Mylists {...args} />
      </UrqlProvider>
    );
  },
  args: {
    pageUserId: "user:1",
  },
  parameters: {
    layout: "centered",
    msw: {
      handlers: [
        mock_UserMylistsPage_ViewerDocument_loggedIn,
        graphql.query(UserMylistsPage_AuthMylistsDocument, (req, res, ctx) =>
          res(
            ctx.data({
              user: aUser({
                id: "user:1",
                icon: "/storybook/512x512.png",
                name: "sno2wman",
                displayName: "SnO2WMaN",
                mylists: aMylistConnection({
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
      handlers: [mock_UserMylistsPage_ViewerDocument_notLoggedIn],
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
        mock_UserMylistsPage_ViewerDocument_loggedIn,
        graphql.query(UserMylistsPage_AuthMylistsDocument, (req, res, ctx) =>
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
