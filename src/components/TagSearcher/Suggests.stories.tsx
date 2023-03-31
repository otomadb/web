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
        items: [
          {
            ...makeFragmentData(
              {
                name: {
                  id: "n1",
                  primary: false,
                  name: "ぼっち・ざ・まっど！",
                },
                tag: {
                  id: "t1",
                  ...makeFragmentData(
                    {
                      name: "ぼっち・ざ・ろっく！",
                      type: TagType.Copyright,
                      explicitParent: null,
                    },
                    CommonTagFragment
                  ),
                },
              },
              SuggestItemFragment
            ),
          },
          {
            ...makeFragmentData(
              {
                name: { id: "n2", primary: true, name: "後藤ひとり" },
                tag: {
                  id: "t2",
                  ...makeFragmentData(
                    {
                      name: "後藤ひとり",
                      type: TagType.Character,
                      explicitParent: {
                        id: "t1",
                        name: "ぼっち・ざ・ろっく！",
                      },
                    },
                    CommonTagFragment
                  ),
                },
              },
              SuggestItemFragment
            ),
          },
          {
            ...makeFragmentData(
              {
                name: { id: "n3", primary: true, name: "伊地知虹夏" },
                tag: {
                  id: "t3",
                  ...makeFragmentData(
                    {
                      name: "伊地知虹夏",
                      type: TagType.Character,
                      explicitParent: {
                        id: "t1",
                        name: "ぼっち・ざ・ろっく！",
                      },
                    },
                    CommonTagFragment
                  ),
                },
              },
              SuggestItemFragment
            ),
          },
        ],
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
