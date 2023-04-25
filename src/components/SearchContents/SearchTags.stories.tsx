import { Meta, StoryObj } from "@storybook/react";

import { makeFragmentData } from "~/gql";

import { Fragment, SearchTags } from "./SearchTags";

const meta = {
  component: SearchTags,
  args: {},
} as Meta<typeof SearchTags>;
export default meta;

export const Primary: StoryObj<typeof meta> = {
  args: {
    fragment: makeFragmentData(
      {
        items: [
          {
            name: {
              name: "name1",
            },
            tag: {
              id: "t1",
              name: "name1",
            },
          },
          {
            name: {
              name: "name2",
            },
            tag: {
              id: "t2",
              name: "Name 2",
            },
          },
        ],
      },
      Fragment
    ),
  },
};

export const NoMatch: StoryObj<typeof meta> = {
  args: {
    fragment: makeFragmentData(
      {
        items: [],
      },
      Fragment
    ),
  },
};
