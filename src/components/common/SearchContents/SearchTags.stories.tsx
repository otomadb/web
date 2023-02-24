import { Meta, StoryObj } from "@storybook/react";

import { aSearchTagsItem, aSearchTagsPayload, aTag } from "~/gql/graphql";

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
        aSearchTagsItem({
          matchedName: "name1",
          tag: aTag({
            id: "t1",
          }),
        }),
        aSearchTagsItem({
          matchedName: "name2",
          tag: aTag({
            id: "t2",
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
