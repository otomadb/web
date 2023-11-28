import { Meta, StoryObj } from "@storybook/react";

import { makeFragmentData } from "~/gql";

import { Pagenation, PagenationFragment } from "./Pagination";

const meta = {
  component: Pagenation,
  args: {
    fragment: makeFragmentData({ serial: 1 }, PagenationFragment),
  },
} satisfies Meta<typeof Pagenation>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    currentPage: 5,
    pageMax: 9,
  },
};
