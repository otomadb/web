import { ResultOf } from "@graphql-typed-document-node/core";
import { Meta, StoryObj } from "@storybook/react";
import { graphql as mswGraphql } from "msw";

import { $handlerSourceAndRequests } from "~/components/SearchContents/Nicovideo.stories";
import { $handlerSomeMadsHit } from "~/components/SearchContents/SearchMads.stories";
import { $handlerSomeTagsHit } from "~/components/SearchContents/SearchTags.stories";
import { MockedUrqlProvider } from "~/utils/MockedUrqlProvider";

import GlobalNav, { GlobalNavQuery } from ".";

const meta = {
  component: GlobalNav,
  args: {
    style: {
      width: 1024,
      height: 64,
    },
  },
  render: (args) => (
    <MockedUrqlProvider>
      <GlobalNav {...args} />
    </MockedUrqlProvider>
  ),
  parameters: {
    msw: {
      handlers: {
        misc: [
          $handlerSourceAndRequests,
          $handlerSomeMadsHit,
          $handlerSomeTagsHit,
        ],
      },
    },
  },
  excludeStories: /^\$handler/,
} as Meta<typeof GlobalNav>;

export default meta;

export const NotAuthenticated: StoryObj<typeof meta> = {
  name: "未ログイン",
};

const $handlerFailed = mswGraphql.query(GlobalNavQuery, (req, res, ctx) => {
  return res(ctx.errors([{ message: "Unauthorized" }]));
});

export const Unauthorized: StoryObj<typeof meta> = {
  name: "ユーザ情報の取得に失敗",
  parameters: {
    msw: {
      handlers: {
        concern: [$handlerFailed],
      },
    },
  },
};

const $handlerLoading = mswGraphql.query(
  GlobalNavQuery,
  async (req, res, ctx) => {
    return res(ctx.delay("infinite"));
  }
);
export const Loading: StoryObj<typeof meta> = {
  name: "ユーザーをロード中",
  parameters: {
    msw: {
      handlers: {
        concern: [$handlerLoading],
      },
    },
  },
};

const $handlerSuccessful = mswGraphql.query(GlobalNavQuery, (req, res, ctx) => {
  return res(
    ctx.data({
      whoami: {
        id: "1",
        name: "user1",
        displayName: "User 1",
        icon: "/512x512.png",
        isEditor: false,
        isAdministrator: false,
      },
      notifications: {
        totalCount: 9,
      },
    } as ResultOf<typeof GlobalNavQuery>)
  );
});
export const LoggedIn: StoryObj<typeof meta> = {
  name: "ログイン済み",
  parameters: {
    msw: {
      handlers: {
        concern: [$handlerSuccessful],
      },
    },
  },
};
