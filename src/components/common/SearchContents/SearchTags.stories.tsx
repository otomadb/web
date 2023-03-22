import { Meta, StoryObj } from "@storybook/react";

import {
  aSearchTagsPayload,
  aTag,
  aTagName,
  aTagSearchItemByName,
} from "~/gql/graphql";

import { SearchTags } from "./SearchTags";

const meta = {
  component: SearchTags,
  args: {},
} as Meta<typeof SearchTags>;
export default meta;

export const Primary: StoryObj<typeof meta> = {
  args: {
    fragment: aSearchTagsPayload({
      items: [
        aTagSearchItemByName({
          name: aTagName({
            name: "name1",
          }),
          tag: aTag({
            id: "t1",
            name: "name1",
          }),
        }),
        aTagSearchItemByName({
          name: aTagName({
            name: "name2",
          }),
          tag: aTag({
            id: "t2",
            name: "Name 2",
          }),
        }),
      ],
    }),
  },
};

export const NoMatch: StoryObj<typeof meta> = {
  args: {
    fragment: aSearchTagsPayload({
      items: [],
    }),
  },
};
