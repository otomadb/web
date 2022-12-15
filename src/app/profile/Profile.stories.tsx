import { Meta, StoryObj } from "@storybook/react";
import { graphql } from "msw";
import { createClient, Provider } from "urql";

import { ProfilePageDocument } from "~/gql/graphql";
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
        graphql.query(ProfilePageDocument, (req, res, ctx) => {
          return res(
            ctx.data({
              whoami: {
                id: "1",
                name: "sno2wman",
                displayName: "SnO2WMaN",
                icon: "/storybook/512x512.png",
                favorites: {
                  recommendedVideos: { items: [] },
                  registrations: { nodes: [] },
                },
              },
            })
          );
        }),
      ],
    },
  },
};

export const Slow: StoryObj<typeof Profile> = {
  args: {},
  parameters: {
    msw: {
      handlers: [
        graphql.query(ProfilePageDocument, async (req, res, ctx) => {
          await delay(10000);
          return res(
            ctx.data({
              whoami: {
                id: "1",
                name: "sno2wman",
                displayName: "SnO2WMaN",
                icon: "/storybook/512x512.png",
                favorites: {
                  recommendedVideos: { items: [] },
                  registrations: { nodes: [] },
                },
              },
            })
          );
        }),
      ],
    },
  },
};
