import { Meta, StoryObj } from "@storybook/react";

import { CommonTagFragment } from "~/components/CommonTag";
import { makeFragmentData } from "~/gql";

import { SuggestItemFragment } from "./SuggestItem";
import Suggests, { SuggestsFragment } from "./Suggests";

const meta = {
  component: Suggests,
  args: {
    style: { width: 360 },
    size: "medium",
    fragment: makeFragmentData(
      {
        items: [...new Array(3)].map((_, i) => ({
          ...makeFragmentData(
            {
              name: {
                id: `tagname:${i + 1}`,
                primary: true,
                name: `Tag ${i + 1}`,
              },
              tag: {
                id: `tag:${i + 1}`,
                ...makeFragmentData(
                  {
                    name: `Tag ${i + 1}`,
                    belongTo: { keyword: "character" },
                    explicitParent: {
                      id: "tag:0",
                      name: "Tag 0",
                    },
                  },
                  CommonTagFragment
                ),
              },
            },
            SuggestItemFragment
          ),
        })),
      },
      SuggestsFragment
    ),
  },
} as Meta<typeof Suggests>;

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

export const Nothing: Story = {
  name: "検索候補がない",
  args: {
    fragment: makeFragmentData({ items: [] }, SuggestsFragment),
  },
};
