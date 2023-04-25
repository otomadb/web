import { Meta, StoryObj } from "@storybook/react";

import { makeFragmentData } from "~/gql";

import { Fragment, SearchVideos } from "./SearchVideos";

const meta = {
  component: SearchVideos,
  args: {},
} as Meta<typeof SearchVideos>;
export default meta;

export const Primary: StoryObj<typeof meta> = {
  args: {
    fragment: makeFragmentData(
      {
        items: [
          {
            title: {
              title: "title1",
            },
            video: {
              id: "v1",
              title: "Title 1",
              thumbnailUrl: "/960x540.jpg",
            },
          },
          {
            title: {
              title: "title2",
            },
            video: {
              id: "v2",
              title: "Title 2",
              thumbnailUrl: "/960x540.jpg",
            },
          },
        ],
      },
      Fragment
    ),
  },
};

export const NoMatch: StoryObj<typeof meta> = {
  args: {
    fragment: makeFragmentData(
      {
        items: [],
      },
      Fragment
    ),
  },
};
