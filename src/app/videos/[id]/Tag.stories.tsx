import { Meta, StoryObj } from "@storybook/react";

import { Tag } from "./Tag";

export default {
  component: Tag,
  args: {},
} as Meta<typeof Tag>;

export const Character: StoryObj<typeof Tag> = {
  args: {
    id: "tag:1",
    name: "キャラクター",
    type: "CHARACTER",
  },
};

export const Class: StoryObj<typeof Tag> = {
  args: {
    id: "tag:1",
    name: "クラス",
    type: "CLASS",
  },
};

export const Copyright: StoryObj<typeof Tag> = {
  args: {
    id: "tag:1",
    name: "作品",
    type: "COPYRIGHT",
  },
};

export const Event: StoryObj<typeof Tag> = {
  args: {
    id: "tag:1",
    name: "イベント",
    type: "EVENT",
  },
};

export const Music: StoryObj<typeof Tag> = {
  args: {
    id: "tag:1",
    name: "曲",
    type: "MUSIC",
  },
};
