import { ComponentMeta, ComponentStory } from "@storybook/react";
import { GraphQLClient } from "graphql-request";
import { graphql } from "msw";

import { GraphQLContext } from "~/hooks/useGraphQLClient";
import { WhoamiContext } from "~/hooks/useIsLoggedIn/context";

import { Profile, ProfileQueryDocument } from "./Profile";

export default {
  title: "GlobalNav/Profile",
  component: Profile,
  parameters: {},
} as ComponentMeta<typeof Profile>;

const Template: ComponentStory<typeof Profile> = (args) => (
  <GraphQLContext.Provider
    value={{
      client: new GraphQLClient("/graphql"),
    }}
  >
    <WhoamiContext.Provider
      value={{
        whoami: { checking: false, whoami: "1" },
        setId() {}, // eslint-disable-line @typescript-eslint/no-empty-function
        removeId() {}, // eslint-disable-line @typescript-eslint/no-empty-function
      }}
    >
      <Profile {...args} />
    </WhoamiContext.Provider>
  </GraphQLContext.Provider>
);

export const Successful = Template.bind({});
Successful.parameters = {
  msw: {
    handlers: [
      graphql.query(ProfileQueryDocument, (req, res, ctx) => {
        return res(
          ctx.data({
            whoami: {
              id: "1",
              name: "SnO2WMaN",
              displayName: "SnO2WMaN",
              icon: "/icon",
            },
          })
        );
      }),
    ],
  },
};
