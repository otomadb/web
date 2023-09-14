import { action } from "@storybook/addon-actions";
import { Meta, StoryObj } from "@storybook/react";

import { Fragment as CommonTagFragment } from "~/components/CommonTag";
import { makeFragmentData } from "~/gql";
import { TagType } from "~/gql/graphql";

import { Fragment as SuggestItemFragment } from "./SuggestItem";
import Suggests, { Fragment } from "./Suggests";

const meta = {
  component: Suggests,
  render: (args) => <Suggests {...args} style={{ width: "320px" }} />,
  args: {
    handleSelect: action("handleSelect"),
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
            SuggestItemFragment
          ),
        })),
      },
      Fragment
    ),
  },
} as Meta<typeof Suggests>;

export default meta;

export const Primary: StoryObj<typeof meta> = {};

export const Nothing: StoryObj<typeof meta> = {
  name: "検索候補がない",
  args: {
    fragment: makeFragmentData({ items: [] }, Fragment),
  },
};
