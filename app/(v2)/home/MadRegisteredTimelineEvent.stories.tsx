import { Meta, StoryObj } from "@storybook/react";

import { CommonMadBlockFragment } from "~/components/CommonMadBlock";
import { LikeSwitchFragment } from "~/components/CommonMadBlock/LikeSwitch";
import { Fragment as VideoThumbnailFragment } from "~/components/VideoThumbnail";
import { makeFragmentData } from "~/gql";

import { MadPageLinkFragment } from "../mads/[serial]/Link";
import {
  MadRegisteredTimelineEvent,
  MadRegisteredTimelineEventFragment,
} from "./MadRegisteredTimelineEvent";
import { TimelineEventWrapperFragment } from "./TimelineEventWrapper";

const meta = {
  component: MadRegisteredTimelineEvent,
  args: { style: { width: 720 } },
} as Meta<typeof MadRegisteredTimelineEvent>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    fragment: makeFragmentData(
      {
        video: {
          nicovideoSources: [
            {
              id: "nicovideoSource:1",
              url: "https://www.nicovideo.jp/watch/sm2057168",
            },
          ],
          youtubeSources: [
            {
              id: "youtubeSource:1",
              url: "https://www.youtube.com/watch?v=Q16KpquGsIc",
            },
          ],
          bilibiliSources: [
            {
              id: "bilibiliSources:1",
              url: "https://www.bilibili.com/video/BV1xx411c7mu",
            },
          ],
          soundcloudSources: [
            {
              id: "soundcloudSource:1",
              url: "https://soundcloud.com/keigoooo/hyperflip-donaldcore",
            },
          ],
          ...makeFragmentData(
            {
              id: "mad:1",
              title: "Title 1",
              taggings: { nodes: [] },
              ...makeFragmentData({ serial: 1 }, MadPageLinkFragment),
              ...makeFragmentData(
                {
                  title: "Title 1",
                  thumbnailUrl: "/thumbnail.jpg",
                },
                VideoThumbnailFragment
              ),
            } as any,
            CommonMadBlockFragment
          ),
          ...makeFragmentData({ id: "mad:1" } as any, LikeSwitchFragment),
        } as any,
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
      MadRegisteredTimelineEventFragment
    ),
  },
};
