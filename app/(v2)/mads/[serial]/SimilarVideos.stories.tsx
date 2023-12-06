import { Meta, StoryObj } from "@storybook/react";

import { $mockCommonMadBlockFragment } from "~/components/CommonMadBlock/index.stories";
import { makeFragmentData } from "~/gql";

import {
  SimilarVideosFragment,
  SimilarVideosPresentation,
} from "./SimilarVideos";

const meta = {
  component: SimilarVideosPresentation,
} satisfies Meta<typeof SimilarVideosPresentation>;
export default meta;

type Story = StoryObj<typeof meta>;

export const NoSimilar: Story = {
  name: "似ている動画が存在しない",
  args: {
    fragment: makeFragmentData({ items: [] }, SimilarVideosFragment),
  },
};

export const Similars: Story = {
  name: "似ている動画が存在する",
  args: {
    fragment: makeFragmentData(
      {
        items: [...new Array(12)].map((_, i) => ({
          to: {
            id: `video:${i}`,
            ...$mockCommonMadBlockFragment({
              id: `video:${i}`,
              title: `Video ${i}`,
              serial: i,
            }),
          },
        })),
      },
      SimilarVideosFragment
    ),
  },
};
