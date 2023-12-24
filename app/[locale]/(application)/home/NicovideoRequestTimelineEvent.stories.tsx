import { Meta, StoryObj } from "@storybook/react";

import { makeFragmentData } from "~/gql";

import NicovideoRequestTimelineEvent, {
  NicovideoRequestTimelineEventFragment,
} from "./NicovideoRequestTimelineEvent";
import { TimelineEventWrapperFragment } from "./TimelineEventWrapper";
import {
  mockHasNoRole,
  mockHasRole,
} from "./YoutubeRequestTimelineEvent.stories";

const meta = {
  component: NicovideoRequestTimelineEvent,
  args: {
    style: { width: 720 },
    fragment: makeFragmentData(
      {
        request: {
          id: "request:1",
          title: "Title 1",
          sourceId: "sm2057168",
          thumbnailUrl: "/960x540.jpg",
          originalUrl: "https://www.nicovideo.jp/watch/sm2057168",
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
      NicovideoRequestTimelineEventFragment
    ),
  },
} as Meta<typeof NicovideoRequestTimelineEvent>;
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
