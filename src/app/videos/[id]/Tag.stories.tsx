import { Meta, StoryObj } from "@storybook/react";

import { PseudoTagType } from "~/gql/graphql";

import { Tag } from "./Tag";

export default {
  component: Tag,
  args: {},
} as Meta<typeof Tag>;

export const Character: StoryObj<typeof Tag> = {
  args: {
    tag: {
      id: "tag:1",
      name: "キャラクター",
      type: PseudoTagType.Character,
      explicitParent: undefined,
    },
  },
};

export const Class: StoryObj<typeof Tag> = {
  args: {
    tag: {
      id: "tag:1",
      name: "クラス",
      type: PseudoTagType.Class,
      explicitParent: undefined,
    },
  },
};

export const Copyright: StoryObj<typeof Tag> = {
  args: {
    tag: {
      id: "tag:1",
      name: "作品",
      type: PseudoTagType.Copyright,
      explicitParent: undefined,
    },
  },
};

export const Event: StoryObj<typeof Tag> = {
  args: {
    tag: {
      id: "tag:1",
      name: "イベント",
      type: PseudoTagType.Event,
      explicitParent: undefined,
    },
  },
};

export const Music: StoryObj<typeof Tag> = {
  args: {
    tag: {
      id: "tag:1",
      name: "曲",
      type: PseudoTagType.Music,
      explicitParent: undefined,
    },
  },
};
