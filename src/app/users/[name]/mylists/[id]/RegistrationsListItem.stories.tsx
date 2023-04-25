import { Meta, StoryObj } from "@storybook/react";

import { makeFragmentData } from "~/gql";

import { Fragment, RegistrationsListItem } from "./RegistrationsListItem";

const meta = {
  component: RegistrationsListItem,
} as Meta<typeof RegistrationsListItem>;
export default meta;

export const Primary: StoryObj<typeof meta> = {
  args: {
    fragment: makeFragmentData(
      {
        id: "mylistRegistration:1",
        note: "これはサンプル文章です",
        video: {
          id: "video_1",
          title: "Video1",
          thumbnailUrl: "/960x540.jpg",
          taggings: {
            nodes: [
              {
                tag: {
                  id: "tag_1",
                  name: "child",
                  explicitParent: {
                    id: "tag_2",
                    name: "parent",
                  },
                },
              },
            ],
          },
        },
      },
      Fragment
    ),
  },
};

export const NoNote: StoryObj<typeof meta> = {
  args: {
    fragment: makeFragmentData(
      {
        id: "mylistRegistration:1",
        note: null,
        video: {
          id: "video_1",
          title: "Video1",
          thumbnailUrl: "/960x540.jpg",
          taggings: {
            nodes: [
              {
                tag: {
                  id: "tag_1",
                  name: "child",
                  explicitParent: {
                    id: "tag_2",
                    name: "parent",
                  },
                },
              },
            ],
          },
        },
      },
      Fragment
    ),
  },
};
