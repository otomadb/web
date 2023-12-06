import { ResultOf } from "@graphql-typed-document-node/core";
import { Meta, StoryObj } from "@storybook/react";

import { MadPageLinkFragment } from "~/app/(v2)/mads/[serial]/Link";
import { makeFragmentData } from "~/gql";

import { Fragment as VideoThumbnailFragment } from "../VideoThumbnail";
import CommonMadBlock, { CommonMadBlockFragment } from ".";

export const $mockCommonMadBlockFragment = ({
  id,
  title,
  serial,
}: {
  id: string;
  title: string;
  serial: number;
}) =>
  makeFragmentData(
    {
      id,
      title,
      taggings: {
        nodes: [],
      },
      ...makeFragmentData({ serial }, MadPageLinkFragment),
      ...makeFragmentData(
        { title, thumbnailUrl: "/thumbnail.jpg" },
        VideoThumbnailFragment
      ),
    } as ResultOf<typeof CommonMadBlockFragment>,
    CommonMadBlockFragment
  );

const meta = {
  component: CommonMadBlock,
  args: {
    fragment: $mockCommonMadBlockFragment({
      id: "video:1",
      title: "Video 1",
      serial: 1,
    }),
  },
  excludeStories: /^\$/,
} satisfies Meta<typeof CommonMadBlock>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Loading: Story = {
  name: "読み込み中",
};
