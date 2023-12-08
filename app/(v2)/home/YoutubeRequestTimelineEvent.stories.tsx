import { Meta, StoryObj } from "@storybook/react";
import { graphql as mswGql } from "msw";

import { $UseHarRoleQuery } from "~/components/useHasRole";
import { makeFragmentData } from "~/gql";

import { TimelineEventWrapperFragment } from "./TimelineEventWrapper";
import YoutubeRequestTimelineEvent, {
  YoutubeRequestTimelineEventFragment,
} from "./YoutubeRequestTimelineEvent";

export const mockHasRole = [
  mswGql.query($UseHarRoleQuery, (req, res, ctx) =>
    res(ctx.data({ whoami: { id: "user:1", hasRole: true } }))
  ),
];

export const mockHasNoRole = [
  mswGql.query($UseHarRoleQuery, (req, res, ctx) =>
    res(ctx.data({ whoami: { id: "user:1", hasRole: false } }))
  ),
];

const meta = {
  component: YoutubeRequestTimelineEvent,
  excludeStories: /^mock/,
  args: {
    style: { width: 720 },
    fragment: makeFragmentData(
      {
        request: {
          id: "request:1",
          title: "Title 1",
          sourceId: "Q16KpquGsIc",
          thumbnailUrl: "/960x540.jpg",
          originalUrl: "https://www.youtube.com/watch?v=Q16KpquGsIc",
        },
        ...makeFragmentData(
          {
            createdAt: "2021-01-01T00:00:00.000Z",
            event: {
              id: "event:1",
              user: {
                id: "user:1",
                displayName: "User1",
                name: "user1",
                icon: "/icon.png",
              } as any,
            },
          } as any,
          TimelineEventWrapperFragment
        ),
      } as any,
      YoutubeRequestTimelineEventFragment
    ),
  },
} as Meta<typeof YoutubeRequestTimelineEvent>;
export default meta;

type Story = StoryObj<typeof meta>;

export const NotEditor: Story = {
  name: "編集者権限なし",

  parameters: {
    msw: {
      handlers: {
        roles: mockHasNoRole,
      },
    },
  },
};

export const Editor: Story = {
  name: "編集者権限あり",

  parameters: {
    msw: {
      handlers: {
        roles: mockHasRole,
      },
    },
  },
};
