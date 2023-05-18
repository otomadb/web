import { Auth0Context, Auth0ContextInterface } from "@auth0/auth0-react";
import { Meta, StoryObj } from "@storybook/react";
import { createClient, fetchExchange, Provider as UrqlProvider } from "urql";

import { makeFragmentData } from "~/gql";

import Component, { Fragment } from "./LikeButton";
import {
  mockLikedAlready,
  mockLikeSuccessfully,
  mockNotLikedYet,
  mockUndoLikeSuccessfully,
} from "./LikeButton.mocks";

const meta = {
  component: Component,
  args: {
    fragment: makeFragmentData({ id: "v1" }, Fragment),
  },
  render: (args) => (
    <Auth0Context.Provider
      value={
        {
          isAuthenticated: true,
          async getAccessTokenSilently() {
            return "token";
          },
        } as Auth0ContextInterface
      }
    >
      <UrqlProvider
        value={createClient({ url: "/graphql", exchanges: [fetchExchange] })}
      >
        <Component {...args} />
      </UrqlProvider>
    </Auth0Context.Provider>
  ),
  parameters: {
    msw: {
      handlers: {
        mutation: [mockLikeSuccessfully, mockUndoLikeSuccessfully],
      },
    },
  },
} as Meta<typeof Component>;
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
        <Component {...args} />
      </UrqlProvider>
    </Auth0Context.Provider>
  ),
};

export const NotLikedYet: StoryObj<typeof meta> = {
  name: "まだいいねしていない",
  parameters: {
    msw: {
      handlers: {
        concern: [mockNotLikedYet],
      },
    },
  },
};

export const AlreadyLiked: StoryObj<typeof meta> = {
  name: "既にいいね済み",
  parameters: {
    msw: {
      handlers: {
        concern: [mockLikedAlready],
      },
    },
  },
};
