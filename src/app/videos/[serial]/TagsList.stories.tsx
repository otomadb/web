import { Meta, StoryObj } from "@storybook/react";

import { makeFragmentData } from "~/gql";
import { aTag, aVideoTag, aVideoTagConnection, TagType } from "~/gql/graphql";

import { Fragment, TagsList } from "./TagsList";

const meta = {
  component: TagsList,
  args: {},
} as Meta<typeof TagsList>;
export default meta;

export const Primary: StoryObj<typeof meta> = {
  args: {
    fragment: makeFragmentData(
      aVideoTagConnection({
        nodes: [
          aVideoTag({
            tag: aTag({
              id: "t1",
              name: "Tag 1",
              explicitParent: null,
              type: TagType.Music,
            }),
          }),
          aVideoTag({
            tag: aTag({
              id: "t2",
              name: "Tag 2",
              explicitParent: aTag({ id: "t2.1", name: "Tag 2.1" }),
              type: TagType.Character,
            }),
          }),
          aVideoTag({
            tag: aTag({
              id: "t3",
              name: "Tag 3",
              explicitParent: aTag({ id: "t3.1", name: "Tag 3.1" }),
              type: TagType.Phrase,
            }),
          }),
        ],
      }),
      Fragment
    ),
  },
};
