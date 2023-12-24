import { ResultOf } from "@graphql-typed-document-node/core";
import { Meta, StoryObj } from "@storybook/react";

import { Fragment as UserIconFragment } from "~/components/UserIcon";
import { makeFragmentData } from "~/gql";

import { UserPageLinkFragment } from "../users/[name]/Link";
import NicovideoRegistrationRequestRejecting, {
  NicovideoRegistrationRequestRejectingFragment,
} from "./NicovideoRegistrationRequestRejecting";

export const $mockNicovideoRegistrationRequestRejectingFragment =
  makeFragmentData(
    {
      watched: false,
      createdAt: "2023-01-01T00:00:00.000Z",
      rejecting: {
        rejectedBy: {
          id: "u1",
          ...makeFragmentData(
            {
              displayName: "User 1",
              icon: "/512x512.png",
            },
            UserIconFragment
          ),
          ...makeFragmentData({ name: "user1" }, UserPageLinkFragment),
        } as ResultOf<
          typeof NicovideoRegistrationRequestRejectingFragment
        >["rejecting"]["rejectedBy"],
        request: {
          id: "r1",
          sourceId: "sm1",
          title: "Title 1",
        },
      },
    },
    NicovideoRegistrationRequestRejectingFragment
  );

const meta = {
  component: NicovideoRegistrationRequestRejecting,
  args: {
    style: { width: 512 },
    fragment: $mockNicovideoRegistrationRequestRejectingFragment,
  },
  excludeStories: /^\$mock/,
} as Meta<typeof NicovideoRegistrationRequestRejecting>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {};
