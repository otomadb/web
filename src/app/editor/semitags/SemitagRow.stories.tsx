import { Meta, StoryObj } from "@storybook/react";

import { Fragment as CommonTagFragment } from "~/components/CommonTag";
import { makeFragmentData } from "~/gql";
import { TagType } from "~/gql/graphql";

import SemitagRow, { Fragment } from "./SemitagRow";

const meta = {
  component: SemitagRow,
  args: {},
  parameters: {},
} as Meta<typeof SemitagRow>;
export default meta;

export const NotSelected: StoryObj<typeof meta> = {
  args: {
    fragment: makeFragmentData(
      {
        id: "s1",
        name: "Semitag 1",
        video: {
          id: "",
          title: "",
        },
        suggestTags: {
          __typename: "SemitagSuggestTagsPayload",
          items: [
            {
              name: { id: "t1name", name: "Tag 1", primary: true },
              tag: {
                id: "t1",
                ...makeFragmentData(
                  { name: "Tag 1", type: TagType.Music, explicitParent: null },
                  CommonTagFragment
                ),
              },
            },
            {
              name: { id: "t2name", name: "Tag 2", primary: true },
              tag: {
                id: "t2",
                ...makeFragmentData(
                  { name: "Tag 2", type: TagType.Music, explicitParent: null },
                  CommonTagFragment
                ),
              },
            },
            {
              name: { id: "t3name", name: "Tag 3", primary: true },
              tag: {
                id: "t3",
                ...makeFragmentData(
                  { name: "Tag 3", type: TagType.Music, explicitParent: null },
                  CommonTagFragment
                ),
              },
            },
          ],
        },
      },
      Fragment
    ),
  },
};
