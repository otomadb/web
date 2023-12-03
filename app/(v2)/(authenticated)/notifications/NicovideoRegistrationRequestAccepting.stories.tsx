import { ResultOf } from "@graphql-typed-document-node/core";
import { Meta, StoryObj } from "@storybook/react";

import { MadPageLinkFragment as VideoPageLinkFragment } from "~/app/(v2)/mads/[serial]/Link";
import { Fragment as UserIconFragment } from "~/components/UserIcon";
import { Fragment as VideoThumbnailFragment } from "~/components/VideoThumbnail";
import { makeFragmentData } from "~/gql";

import { UserPageLinkFragment } from "../../users/[name]/Link";
import NicovideoRegistrationRequestAccepting, {
  NicovideoRegistrationRequestAcceptingFragment,
} from "./NicovideoRegistrationRequestAccepting";

export const $mockNicovideoRegistrationRequestAcceptingFragment =
  makeFragmentData(
    {
      watched: false,
      createdAt: "2023-01-01T00:00:00.000Z",
      accepting: {
        acceptedBy: {
          id: "u1",
          ...makeFragmentData(
            { displayName: "User 1", icon: "/512x512.png" },
            UserIconFragment
          ),
          ...makeFragmentData({ name: "user1" }, UserPageLinkFragment),
        } as ResultOf<
          typeof NicovideoRegistrationRequestAcceptingFragment
        >["accepting"]["acceptedBy"],
        request: {
          id: "r1",
          sourceId: "sm1",
          title: "Title 1",
        },
        video: {
          id: "v1",
          ...makeFragmentData(
            {
              serial: 1,
            },
            VideoPageLinkFragment
          ),
          ...makeFragmentData(
            {
              thumbnailUrl: "/960x540.jpg",
              title: "Title 1",
            },
            VideoThumbnailFragment
          ),
        } as ResultOf<
          typeof NicovideoRegistrationRequestAcceptingFragment
        >["accepting"]["video"],
      },
    },
    NicovideoRegistrationRequestAcceptingFragment
  );

const meta = {
  component: NicovideoRegistrationRequestAccepting,
  args: {
    style: { width: 512 },
    fragment: $mockNicovideoRegistrationRequestAcceptingFragment,
  },
  excludeStories: /^\$mock/,
} as Meta<typeof NicovideoRegistrationRequestAccepting>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {};
