import { Meta, StoryObj } from "@storybook/react";
import { createClient, fetchExchange, Provider as UrqlProvider } from "urql";

import GlobalNav from ".";
import {
  mockLoadingQuery,
  mockSuccessfulQuery,
  mockUnauthorizedQuery,
} from "./index.mocks";

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
      value={createClient({ url: "/graphql", exchanges: [fetchExchange] })}
    >
      <GlobalNav {...args} />
    </UrqlProvider>
  ),
} as Meta<typeof GlobalNav>;

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
