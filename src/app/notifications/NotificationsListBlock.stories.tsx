import { action } from "@storybook/addon-actions";
import { Meta, StoryObj } from "@storybook/react";
import { graphql } from "msw";
import {
  createClient as createUrqlClient,
  fetchExchange,
  Provider as UrqlProvider,
} from "urql";

import { mock as mockNicovideoRegistrationRequestAcceptingNotification } from "./NicovideoRegistrationRequestAcceptingNotification.mocks";
import { mock as mockNicovideoRegistrationRequestRejectingNotification } from "./NicovideoRegistrationRequestRejectingNotification.mocks";
import Component, { Query } from "./NotificationsListBlock";

const meta = {
  component: Component,
  args: {
    style: { width: "1024px" },
    pushCursor: action("pushCursor"),
  },
  render(args) {
    return (
      <UrqlProvider
        value={createUrqlClient({
          url: "/graphql",
          exchanges: [fetchExchange],
        })}
      >
        <Component {...args} />
      </UrqlProvider>
    );
  },
  parameters: {
    msw: {
      handlers: {
        unconcern: [],
        concern: [
          graphql.query(Query, (req, res, ctx) =>
            res(
              ctx.data({
                notifications: {
                  pageInfo: {
                    hasNextPage: true,
                    endCursor: "next",
                  },
                  edges: [
                    {
                      cursor: "cursor1",
                      node: {
                        id: "n1",
                        __typename:
                          "NicovideoRegistrationRequestRejectingNotification",
                        ...mockNicovideoRegistrationRequestRejectingNotification,
                      },
                    },
                    {
                      cursor: "cursor2",
                      node: {
                        id: "n2",
                        __typename:
                          "NicovideoRegistrationRequestAcceptingNotification",
                        ...mockNicovideoRegistrationRequestAcceptingNotification,
                      },
                    },
                  ],
                },
              })
            )
          ),
        ],
      },
    },
  },
} as Meta<typeof Component>;
export default meta;

export const Primary: StoryObj<typeof meta> = {
  args: {},
};

export const NoNext: StoryObj<typeof meta> = {
  args: {},
  parameters: {
    msw: {
      handlers: {
        unconcern: [],
        concern: [
          graphql.query(Query, (req, res, ctx) =>
            res(
              ctx.data({
                notifications: {
                  pageInfo: {
                    hasNextPage: false,
                    endCursor: null,
                  },
                  edges: [
                    {
                      cursor: "cursor1",
                      node: {
                        id: "n1",
                        __typename:
                          "NicovideoRegistrationRequestRejectingNotification",
                        ...mockNicovideoRegistrationRequestRejectingNotification,
                      },
                    },
                    {
                      cursor: "cursor2",
                      node: {
                        id: "n2",
                        __typename:
                          "NicovideoRegistrationRequestAcceptingNotification",
                        ...mockNicovideoRegistrationRequestAcceptingNotification,
                      },
                    },
                  ],
                },
              })
            )
          ),
        ],
      },
    },
  },
};
