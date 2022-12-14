import { Meta, StoryObj } from "@storybook/react";

import { TagsList } from "./TagsList";

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
    tags: [
      {
        id: "tag1",
        name: "タグ1",
        type: "CHARACTER",
        explicitParent: null,
      },
      {
        id: "tag2",
        name: "タグ2",
        type: "MUSIC",
        explicitParent: null,
      },
    ],
    edit: false,
  },
};
