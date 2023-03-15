import { css } from "@emotion/css";
import { Meta, StoryObj } from "@storybook/react";

import {
  aMylistRegistration,
  aTag,
  aVideo,
  aVideoTag,
  aVideoTagConnection,
} from "~/gql/graphql";

import { RegistrationsListItem } from "./RegistrationsListItem";

export default {
  component: RegistrationsListItem,
  args: {
    className: css`
      width: 1024px;
    `,
    fragment: aMylistRegistration({
      id: "mylistRegistration:1",
      note: "これはサンプル文章です",
      video: aVideo({
        id: "video_1",
        title: "Video1",
        thumbnailUrl: "/storybook/960x540.jpg",
        taggings: aVideoTagConnection({
          nodes: [
            aVideoTag({
              tag: aTag({
                id: "tag_1",
                name: "child",
                explicitParent: aTag({
                  id: "tag_2",
                  name: "parent",
                }),
              }),
            }),
          ],
        }),
      }),
    }),
  },
  parameters: {
    layout: "centered",
  },
} as Meta<typeof RegistrationsListItem>;

export const W768: StoryObj<typeof RegistrationsListItem> = {
  name: "width: 768px",
  args: {
    className: css`
      width: 768px;
    `,
  },
};

export const W1024: StoryObj<typeof RegistrationsListItem> = {
  name: "width: 1024px",
  args: {
    className: css`
      width: 1024px;
    `,
  },
};

export const NoNote: StoryObj<typeof RegistrationsListItem> = {
  args: {
    fragment: aMylistRegistration({
      id: "mylistRegistration:1",
      note: null,
      video: aVideo({
        id: "video_1",
        title: "Video1",
        thumbnailUrl: "/storybook/960x540.jpg",
        taggings: aVideoTagConnection({
          nodes: [
            aVideoTag({
              tag: aTag({
                id: "tag_1",
                name: "child",
                explicitParent: aTag({ id: "tag_2", name: "parent" }),
              }),
            }),
          ],
        }),
      }),
    }),
  },
};
