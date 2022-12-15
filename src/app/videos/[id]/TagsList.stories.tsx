import { Meta, StoryObj } from "@storybook/react";

import { TagsList } from "./TagsSection";

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
  },
};
