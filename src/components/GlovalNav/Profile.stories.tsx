import { Meta, StoryObj } from "@storybook/react";
import { createClient, fetchExchange, Provider as UrqlProvider } from "urql";

import Profile from "./Profile";
import {
  mockLoadingQuery,
  mockSuccessfulQuery,
  mockUnauthorizedQuery,
} from "./Profile.mocks";

const meta = {
  component: Profile,
  args: {
    style: {
      width: "144px",
    },
  },
  render: (args) => (
    <UrqlProvider
      value={createClient({
        url: "/graphql",
        exchanges: [fetchExchange],
      })}
    >
      <Profile {...args} />
    </UrqlProvider>
  ),
} as Meta<typeof Profile>;
export default meta;

export const LoggedIn: StoryObj<typeof meta> = {
  name: "ログイン済み",
  parameters: { msw: { handlers: [mockSuccessfulQuery] } },
};

export const NotLogin: StoryObj<typeof meta> = {
  name: "未ログイン",
  parameters: { msw: { handlers: [mockUnauthorizedQuery] } },
};

export const Loading: StoryObj<typeof meta> = {
  name: "ユーザーをロード中",
  parameters: { msw: { handlers: [mockLoadingQuery] } },
};
