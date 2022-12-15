import { Meta, StoryObj } from "@storybook/react";

import { PseudoTagType } from "~/gql/graphql";

import { TagsList } from "./List";

export default {
  component: TagsList,
  args: {
    updateTags: () => {
      console.log("Update");
    },
  },
} as Meta<typeof TagsList>;

export const Primary: StoryObj<typeof TagsList> = {
  args: {
    edit: false,
    tags: [
      {
        id: "tag:1",
        name: "Tag 1",
        type: PseudoTagType.Music,
      },
      {
        id: "tag:2",
        name: "Tag 2",
        type: PseudoTagType.Character,
      },
      {
        id: "tag:3",
        name: "Tag 3",
        type: PseudoTagType.Character,
      },
      {
        id: "tag:4",
        name: "Tag 4",
        type: PseudoTagType.Series,
      },
    ],
  },
};
