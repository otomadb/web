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

const $handlerNotLoggedIn = mswGraphql.query(
  GlobalNavQuery,
  (req, res, ctx) => {
    return res(
      ctx.data({
        viewer: null,
      })
    );
  }
);
export const NotLoggedIn: StoryObj<typeof meta> = {
  name: "未ログイン",
  parameters: {
    msw: {
      handlers: {
        concern: [$handlerNotLoggedIn],
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
      viewer: {},
    })
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
