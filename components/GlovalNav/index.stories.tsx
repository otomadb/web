import { Auth0Context, Auth0ContextInterface } from "@auth0/auth0-react";
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
    <Auth0Context.Provider
      value={{ isAuthenticated: true } as Auth0ContextInterface}
    >
      <UrqlProvider
        value={createClient({ url: "/graphql", exchanges: [fetchExchange] })}
      >
        <GlobalNav {...args} />
      </UrqlProvider>
    </Auth0Context.Provider>
  ),
  parameters: {
    msw: {
      handlers: {
        concern: [mockSuccessfulQuery],
      },
    },
  },
} as Meta<typeof GlobalNav>;

export default meta;

export const NotAuthenticated: StoryObj<typeof meta> = {
  name: "未ログイン",
  render: (args) => (
    <Auth0Context.Provider
      value={{ isAuthenticated: false } as Auth0ContextInterface}
    >
      <UrqlProvider
        value={createClient({ url: "/graphql", exchanges: [fetchExchange] })}
      >
        <GlobalNav {...args} />
      </UrqlProvider>
    </Auth0Context.Provider>
  ),
};

export const Unauthorized: StoryObj<typeof meta> = {
  name: "ユーザ情報の取得に失敗",
  parameters: {
    msw: {
      handlers: {
        concern: [mockUnauthorizedQuery],
      },
    },
  },
};

export const Loading: StoryObj<typeof meta> = {
  name: "ユーザーをロード中",
  parameters: {
    msw: {
      handlers: {
        concern: [mockLoadingQuery],
      },
    },
  },
};

export const LoggedIn: StoryObj<typeof meta> = {
  name: "ログイン済み",
};
