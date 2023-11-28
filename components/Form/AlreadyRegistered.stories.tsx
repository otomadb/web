import { action } from "@storybook/addon-actions";
import { Meta, StoryObj } from "@storybook/react";

import { MadPageLinkFragment as VideoLinkFragment } from "~/app/(v2)/mads/[serial]/Link";
import AlreadyRegistered, {
  Fragment,
} from "~/components/Form/AlreadyRegistered";
import { Fragment as VideoThumbnailFragment } from "~/components/VideoThumbnail";
import { makeFragmentData } from "~/gql";

const meta = {
  component: AlreadyRegistered,
  args: {},
} as Meta<typeof AlreadyRegistered>;
export default meta;

export const Primary: StoryObj<typeof meta> = {
  args: {
    handleCancel: action("handleCancel"),
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
            {
              title: "Title 1",
              thumbnailUrl: "/960x540.jpg",
            },
            VideoThumbnailFragment
          ),
        } as never, // TODO: Fix type for merging makeFragmentData
      },
      Fragment
    ),
  },
};
