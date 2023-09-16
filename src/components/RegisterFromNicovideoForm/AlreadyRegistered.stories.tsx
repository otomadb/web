import { Meta, StoryObj } from "@storybook/react";

import { Fragment as VideoLinkFragment } from "~/app/mads/[serial]/Link";
import { Fragment as VideoThumbnailFragment } from "~/components/VideoThumbnail";
import { makeFragmentData } from "~/gql";

import { AlreadyRegistered, Fragment } from "./AlreadyRegistered";
const meta = {
  component: AlreadyRegistered,
  args: {},
} as Meta<typeof AlreadyRegistered>;
export default meta;

export const Primary: StoryObj<typeof meta> = {
  args: {
    style: { width: 640 },
    fragment: makeFragmentData(
      {
        id: "source:1",
        sourceId: "sm2057168",
        video: {
          id: "video:1",
          title: "Title 1",
          ...makeFragmentData({ serial: 1 }, VideoLinkFragment),
          ...makeFragmentData(
            { serial: 1, title: "Title 1" },
            VideoThumbnailFragment
          ),
        } as never, // TODO: Fix type for merging makeFragmentData
      },
      Fragment
    ),
  },
};
