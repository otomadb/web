import { action } from "@storybook/addon-actions";
import { Meta, StoryObj } from "@storybook/react";

import { makeFragmentData } from "~/gql";
import { MockedUrqlProvider } from "~/utils/MockedUrqlProvider";

import { Fragment, Semitags } from "./Semitags";

const meta = {
  component: Semitags,
  args: {
    style: { width: 1024, height: 860 },
    selectings: [],
    append: action("append"),
    remove: action("remove"),
  },
  render(args) {
    return (
      <MockedUrqlProvider>
        <Semitags {...args} />
      </MockedUrqlProvider>
    );
  },
} as Meta<typeof Semitags>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    fragment: makeFragmentData(
      {
        findSemitags: {
          nodes: [...new Array(30)].map((_, i) => {
            const id = `semitag:${i + 1}`;
            return {
              id,
              name: `Semitag ${i + 1}`,
              video: {
                id: `video:1`,
                title: `Video 1`,
              },
            };
          }),
        },
      },
      Fragment
    ),
    selectings: ["semitag:3", "semitag:4"],
  },
};

export const Less: Story = {
  args: {
    fragment: makeFragmentData(
      {
        findSemitags: {
          nodes: [...new Array(5)].map((_, i) => {
            const id = `semitag:${i + 1}`;
            return {
              id,
              name: `Semitag ${i + 1}`,
              video: {
                id: `video:1`,
                title: `Video 1`,
              },
            };
          }),
        },
      },
      Fragment
    ),
    selectings: ["semitag:3", "semitag:4"],
  },
};

export const Loading: Story = {
  args: {
    fragment: undefined,
  },
};
