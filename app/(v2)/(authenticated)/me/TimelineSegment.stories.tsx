import { action } from "@storybook/addon-actions";
import { Meta, StoryObj } from "@storybook/react";
import { graphql as mswGql } from "msw";

import { makeFragmentData } from "~/gql";

import { TimelineEventFragment } from "./TimelineEvent";
import TimelineSegment, { Query } from "./TimelineSegment";

const meta = {
  component: TimelineSegment,
  args: {
    style: { width: 720 },
    skip: 0,
    take: 3,
    fetchMore: action("fetchMore"),
  },
  parameters: {
    msw: {
      handlers: [
        mswGql.query(Query, (req, res, ctx) =>
          res(
            ctx.data({
              showTimeline: [
                makeFragmentData(
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
                ) as any, // eslint-disable-line @typescript-eslint/no-explicit-any -- なぜか型があってない
                makeFragmentData(
                  {
                    __typename: "NicovideoMadRequestedTimelineEvent",
                    createdAt: "2021-01-01T00:00:00.000Z",
                    event: {
                      id: "event:2",
                      user: {
                        id: "user:1",
                        displayName: "User1",
                        name: "user1",
                        icon: "/icon.png",
                      } as any, // eslint-disable-line @typescript-eslint/no-explicit-any -- 面倒なので
                    },
                    request: {
                      id: "request:2",
                      title: "Title 2",
                      sourceId: "sm2057168",
                      thumbnailUrl: "/960x540.jpg",
                      originalUrl: "https://www.nicovideo.jp/watch/sm2057168",
                    },
                  },
                  TimelineEventFragment
                ) as any, // eslint-disable-line @typescript-eslint/no-explicit-any -- なぜか型があってない
                makeFragmentData(
                  {
                    __typename: "NicovideoMadRequestedTimelineEvent",
                    createdAt: "2021-01-01T00:00:00.000Z",
                    event: {
                      id: "event:3",
                      user: {
                        id: "user:1",
                        displayName: "User1",
                        name: "user1",
                        icon: "/icon.png",
                      } as any, // eslint-disable-line @typescript-eslint/no-explicit-any -- 面倒なので
                    },
                    request: {
                      id: "request:3",
                      title: "Title 3",
                      sourceId: "sm2057168",
                      thumbnailUrl: "/960x540.jpg",
                      originalUrl: "https://www.nicovideo.jp/watch/sm2057168",
                    },
                  },
                  TimelineEventFragment
                ) as any, // eslint-disable-line @typescript-eslint/no-explicit-any -- なぜか型があってない
              ],
            })
          )
        ),
      ],
    },
  },
} as Meta<typeof TimelineSegment>;
export default meta;

type Story = StoryObj<typeof meta>;

export const LatestFulfill: Story = {
  name: "最後尾かつ不足なく取得",
  args: {},
};

export const LatestNotFulfill: Story = {
  name: "最後尾だが不足がある",
  args: {},
  parameters: {
    msw: {
      handlers: [
        mswGql.query(Query, (req, res, ctx) =>
          res(
            ctx.data({
              showTimeline: [
                makeFragmentData(
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
                      id: "request:2",
                      title: "Title 2",
                      sourceId: "sm2057168",
                      thumbnailUrl: "/960x540.jpg",
                      originalUrl: "https://www.nicovideo.jp/watch/sm2057168",
                    },
                  },
                  TimelineEventFragment
                ) as any, // eslint-disable-line @typescript-eslint/no-explicit-any -- なぜか型があってない
                makeFragmentData(
                  {
                    __typename: "NicovideoMadRequestedTimelineEvent",
                    createdAt: "2021-01-01T00:00:00.000Z",
                    event: {
                      id: "event:2",
                      user: {
                        id: "user:1",
                        displayName: "User1",
                        name: "user1",
                        icon: "/icon.png",
                      } as any, // eslint-disable-line @typescript-eslint/no-explicit-any -- 面倒なので
                    },
                    request: {
                      id: "request:2",
                      title: "Title 2",
                      sourceId: "sm2057168",
                      thumbnailUrl: "/960x540.jpg",
                      originalUrl: "https://www.nicovideo.jp/watch/sm2057168",
                    },
                  },
                  TimelineEventFragment
                ) as any, // eslint-disable-line @typescript-eslint/no-explicit-any -- なぜか型があってない
              ],
            })
          )
        ),
      ],
    },
  },
};

export const NotLatestFulfiil: Story = {
  name: "最後尾ではないが不足なく取得",
  args: {
    fetchMore: undefined,
  },
};

export const Fetching: Story = {
  name: "取得中",
  args: {},
  parameters: {
    msw: {
      handlers: [
        mswGql.query(Query, (req, res, ctx) => res(ctx.delay("infinite"))),
      ],
    },
  },
};
