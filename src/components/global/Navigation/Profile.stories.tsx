import { Meta, StoryObj } from "@storybook/react";
import { graphql } from "msw";
import { createClient, Provider } from "urql";

import { GlobalNav_ProfileDocument } from "~/gql/graphql";
import { delay } from "~/utils/delay";

import { Profile } from "./Profile";

export default {
  component: Profile,
  args: {},
  render: (args) => (
    <Provider value={createClient({ url: "/graphql" })}>
      <Profile {...args} />
    </Provider>
  ),
} as Meta<typeof Profile>;

export const Successful: StoryObj<typeof Profile> = {
  args: {},
  parameters: {
    msw: {
      handlers: [
        graphql.query(GlobalNav_ProfileDocument, (req, res, ctx) => {
          return res(
            ctx.data({
              whoami: {
                id: "1",
                name: "SnO2WMaN",
                displayName: "SnO2WMaN",
                icon: "/storybook/512x512.png",
              },
            })
          );
        }),
      ],
    },
  },
};

export const NotLogin: StoryObj<typeof Profile> = {
  args: {},
  parameters: {
    msw: {
      handlers: [
        graphql.query(GlobalNav_ProfileDocument, (req, res, ctx) => {
          return res(ctx.data({ whoami: null }));
        }),
      ],
    },
  },
};

export const Loading: StoryObj<typeof Profile> = {
  args: {},
  parameters: {
    msw: {
      handlers: [
        graphql.query(GlobalNav_ProfileDocument, async (req, res, ctx) => {
          await delay(10000);
          return res(
            ctx.data({
              whoami: {
                id: "1",
                name: "SnO2WMaN",
                displayName: "SnO2WMaN",
                icon: "/storybook/512x512.png",
              },
            })
          );
        }),
      ],
    },
  },
};
