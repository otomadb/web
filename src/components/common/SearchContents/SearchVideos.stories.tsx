import { Meta, StoryObj } from "@storybook/react";

import {
  aSearchVideosPayload,
  aVideo,
  aVideoSearchItemByTitle,
  aVideoTitle,
} from "~/gql/graphql";

import { SearchVideos } from "./SearchVideos";

const meta = {
  component: SearchVideos,
  args: {},
} as Meta<typeof SearchVideos>;
export default meta;

export const Primary: StoryObj<typeof meta> = {
  args: {
    fragment: aSearchVideosPayload({
      items: [
        aVideoSearchItemByTitle({
          title: aVideoTitle({
            title: "title1",
          }),
          video: aVideo({
            id: "v1",
            title: "Title 1",
            thumbnailUrl: "/960x540.jpg",
          }),
        }),
        aVideoSearchItemByTitle({
          title: aVideoTitle({
            title: "title2",
          }),
          video: aVideo({
            id: "v2",
            title: "Title 2",
            thumbnailUrl: "/960x540.jpg",
          }),
        }),
      ],
    }),
  },
};

export const NoMatch: StoryObj<typeof meta> = {
  args: {
    fragment: aSearchVideosPayload({
      items: [],
    }),
  },
};
