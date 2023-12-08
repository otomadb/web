import { action } from "@storybook/addon-actions";
import { Meta, StoryObj } from "@storybook/react";

import { CommonTagFragment } from "~/components/CommonTag";
import { makeFragmentData } from "~/gql";
import { TagType } from "~/gql/graphql";

import { TagButton } from "./Button";

const meta = {
  component: TagButton,
  args: {
    fragment: makeFragmentData(
      {
        id: "t1",
        name: "Tag 1",
        type: TagType.Character,
        explicitParent: { id: "t2", name: "Tag 2" },
      },
      CommonTagFragment
    ),
    tagId: "t1",
    selected: true,
    append: action("append"),
    remove: action("remove"),
    size: "small",
  },
  parameters: {
    layout: "centered",
  },
} as Meta<typeof TagButton>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Selected: Story = {
  args: {
    selected: true,
  },
};

export const Unselected: Story = {
  args: {
    selected: false,
  },
};
