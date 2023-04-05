import { Meta, StoryObj } from "@storybook/react";
import { createClient, fetchExchange, Provider as UrqlProvider } from "urql";

import GlobalNav from ".";
import { mockSuccessfulQuery as mockProfileSuccessfulQuery } from "./Profile.mocks";

const meta = {
  component: GlobalNav,
  args: {
    style: {
      width: "100%",
      height: "64px",
    },
  },
  render: (args) => (
    <UrqlProvider
      value={createClient({
        url: "/graphql",
        exchanges: [fetchExchange],
      })}
    >
      <GlobalNav {...args} />
    </UrqlProvider>
  ),
  parameters: {
    msw: {
      handlers: {
        profile: [mockProfileSuccessfulQuery],
      },
    },
  },
} as Meta<typeof GlobalNav>;

export default meta;

export const Primary: StoryObj<typeof GlobalNav> = {};
