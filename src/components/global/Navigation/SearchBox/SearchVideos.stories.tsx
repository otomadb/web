import { StoryObj } from "@storybook/react";
import clsx from "clsx";

import { aSearchVideosItem, aSearchVideosPayload, aVideo } from "~/gql/graphql";

import { SearchVideos } from "./SearchVideos";

export default {
  component: SearchVideos,
  args: {
    className: clsx(["w-[584px]"]),
  },
};

export const NoRegistration: StoryObj<typeof SearchVideos> = {
  name: "マイリストへの登録がない",
  args: {
    fragment: aSearchVideosPayload({
      items: [
        aSearchVideosItem({
          matchedTitle: "match title",
          video: aVideo({
            id: "video_1",
            title: "title",
            thumbnailUrl: "/storybook/960x540.jpg",
          }),
        }),
      ],
    }),
  },
};
