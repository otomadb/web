import { Meta, StoryObj } from "@storybook/react";
import { graphql as mswGql } from "msw";

import { CommonTagFragment } from "~/components/CommonTag";
import { $UseHarRoleQuery } from "~/components/useHasRole";
import { Fragment as VideoThumbnailFragment } from "~/components/VideoThumbnail";
import { makeFragmentData } from "~/gql";
import { TagType } from "~/gql/graphql";
import { MockedUrqlProvider } from "~/utils/MockedUrqlProvider";

import { Fragment as LinkVideoFragment } from "../mads/[serial]/Link";
import TimelineEvent, { TimelineEventFragment } from "./TimelineEvent";

const mockHasRole = [
  mswGql.query($UseHarRoleQuery, (req, res, ctx) =>
    res(ctx.data({ whoami: { id: "user:1", hasRole: true } }))
  ),
];
const mockHasNoRole = [
  mswGql.query($UseHarRoleQuery, (req, res, ctx) =>
    res(ctx.data({ whoami: { id: "user:1", hasRole: false } }))
  ),
];

const meta = {
  component: TimelineEvent,
  args: { style: { width: 720 } },

  render(args) {
    return (
      <MockedUrqlProvider>
        <TimelineEvent {...args} />
      </MockedUrqlProvider>
    );
  },
} as Meta<typeof TimelineEvent>;
export default meta;

type Story = StoryObj<typeof meta>;

export const MadRegistered: Story = {
  name: "音MADの登録イベント",
  args: {
    fragment: makeFragmentData(
      {
        __typename: "MadRegisteredTimelineEvent",
        createdAt: "2021-01-01T00:00:00.000Z",
        event: {
          id: "event:1",
          user: {
            id: "user:1",
            displayName: "User1",
            name: "user1",
            icon: "/icon.png",
          } as any, // eslint-disable-line @typescript-eslint/no-explicit-any -- 面倒なので
        },
        video: {
          id: "video:1",
          title: "Title 1",
          taggings: {
            nodes: [
              {
                id: "tagging:1",
                tag: {
                  ...makeFragmentData(
                    { name: "tag1", type: TagType.Character },
                    CommonTagFragment
                  ),
                },
              },
              {
                id: "tagging:2",
                tag: {
                  ...makeFragmentData(
                    { name: "tag2", type: TagType.Character },
                    CommonTagFragment
                  ),
                },
              },
              {
                id: "tagging:3",
                tag: {
                  ...makeFragmentData(
                    { name: "tag3", type: TagType.Character },
                    CommonTagFragment
                  ),
                },
              },
              {
                id: "tagging:4",
                tag: {
                  ...makeFragmentData(
                    { name: "tag4", type: TagType.Character },
                    CommonTagFragment
                  ),
                },
              },
              {
                id: "tagging:5",
                tag: {
                  ...makeFragmentData(
                    { name: "tag5", type: TagType.Character },
                    CommonTagFragment
                  ),
                },
              },
            ],
          },
          nicovideoSources: [
            {
              id: "nicovideoSource:1",
              sourceId: "sm2057168",
              url: "https://www.nicovideo.jp/watch/sm2057168",
            },
          ],
          youtubeSources: [
            {
              id: "youtubeSource:1",
              sourceId: "Q16KpquGsIc",
              url: "https://www.youtube.com/watch?v=Q16KpquGsIc",
            },
          ],
          bilibiliSources: [
            {
              id: "bilibiliSources:1",
              sourceId: "BV1xx411c7mu",
              url: "https://www.bilibili.com/video/BV1xx411c7mu",
            },
          ],
          soundcloudSources: [
            {
              id: "soundcloudSource:1",
              sourceId: "keigoooo/hyperflip-donaldcore",
              url: "https://soundcloud.com/keigoooo/hyperflip-donaldcore",
            },
          ],
          ...makeFragmentData({ serial: 1 }, LinkVideoFragment),
          ...makeFragmentData(
            { title: "Title 1", thumbnailUrl: "/960x540.jpg" },
            VideoThumbnailFragment
          ),
        } as any, // eslint-disable-line @typescript-eslint/no-explicit-any -- Codegenの限界
      },
      TimelineEventFragment
    ),
  },
};

const NicovideoRequestFragment = makeFragmentData(
  {
    __typename: "NicovideoMadRequestedTimelineEvent",
    createdAt: "2021-01-01T00:00:00.000Z",
    event: {
      id: "event:1",
      user: {
        id: "user:1",
        displayName: "User1",
        name: "user1",
        icon: "/icon.png",
      } as any, // eslint-disable-line @typescript-eslint/no-explicit-any -- 面倒なので
    },
    request: {
      id: "request:1",
      title: "Title 1",
      sourceId: "sm2057168",
      thumbnailUrl: "/960x540.jpg",
      originalUrl: "https://www.nicovideo.jp/watch/sm2057168",
    },
  },
  TimelineEventFragment
);
export const NicovideoMadRequested: Story = {
  name: "ニコニコ動画の動画リクエストイベント(登録権限なし)",
  args: {
    fragment: NicovideoRequestFragment,
  },
  parameters: {
    msw: {
      handlers: {
        roles: mockHasNoRole,
      },
    },
  },
};
export const NicovideoMadRequestedWithRegistrable: Story = {
  name: "ニコニコ動画の動画リクエストイベント(登録権限あり)",
  args: {
    fragment: NicovideoRequestFragment,
  },
  parameters: {
    msw: {
      handlers: {
        roles: mockHasRole,
      },
    },
  },
};

const mockYoutubeFragment = makeFragmentData(
  {
    __typename: "YoutubeMadRequestedTimelineEvent",
    createdAt: "2021-01-01T00:00:00.000Z",
    event: {
      id: "event:1",
      user: {
        id: "user:1",
        displayName: "User1",
        name: "user1",
        icon: "/icon.png",
      } as any, // eslint-disable-line @typescript-eslint/no-explicit-any -- 面倒なので
    },
    request: {
      id: "request:1",
      title: "Title 1",
      sourceId: "Q16KpquGsIc",
      thumbnailUrl: "/960x540.jpg",
      originalUrl: "https://www.youtube.com/watch?v=Q16KpquGsIc",
    },
  },
  TimelineEventFragment
);
export const YoutubeMadRequested: Story = {
  name: "Youtubeの動画リクエストイベント(登録権限なし)",
  args: {
    fragment: mockYoutubeFragment,
  },
  parameters: {
    msw: {
      handlers: {
        roles: mockHasNoRole,
      },
    },
  },
};
export const YoutubeMadRequestedWithRegistrable: Story = {
  name: "Youtubeの動画リクエストイベント(登録権限あり)",
  args: {
    fragment: mockYoutubeFragment,
  },
  parameters: {
    msw: {
      handlers: {
        roles: mockHasRole,
      },
    },
  },
};
