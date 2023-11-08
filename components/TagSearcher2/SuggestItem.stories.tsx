import { Meta, StoryObj } from "@storybook/react";

import { Fragment as CommonTagFragment } from "~/components/CommonTag";
import { makeFragmentData } from "~/gql";
import { TagType } from "~/gql/graphql";

import SuggestItem, { Fragment } from "./SuggestItem";

const meta = {
  component: SuggestItem,
  args: {
    style: { width: "320px" },
    size: "medium",
    fragment: makeFragmentData(
      {
        name: {
          id: "tagname:1",
          primary: true,
          name: "Tag 1",
        },
        tag: {
          id: "tag:1",
          ...makeFragmentData(
            {
              name: "Tag 1",
              type: TagType.Character,
              explicitParent: {
                id: "tag:0",
                name: "Tag 0",
              },
            },
            CommonTagFragment
          ),
        },
      },
      Fragment
    ),
  },
} as Meta<typeof SuggestItem>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Small: Story = {
  args: {
    style: { width: 240 },
    size: "small",
  },
};

export const Medium: Story = {
  args: {
    size: "medium",
  },
};

export const Large: Story = {
  args: {
    style: { width: 480 },
    size: "large",
  },
};

export const メインのタグ名ではない: Story = {
  args: {
    fragment: makeFragmentData(
      {
        name: {
          id: "tagname:2",
          primary: false,
          name: "Alt Tag 1",
        },
        tag: {
          id: "tag:1",
          ...makeFragmentData(
            {
              name: "Tag 1",
              type: TagType.Character,
              explicitParent: {
                id: "tag:0",
                name: "Tag 0",
              },
            },
            CommonTagFragment
          ),
        },
      },
      Fragment
    ),
  },
};
