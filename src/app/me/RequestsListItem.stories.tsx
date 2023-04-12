import { ResultOf } from "@graphql-typed-document-node/core";
import { Meta, StoryObj } from "@storybook/react";

import { Fragment as NicovideoRegistrationRequestPageLinkFragment } from "~/app/requests/nicovideo/[sourceId]/Link";
import { Fragment as UserPageLinkFragment } from "~/app/users/[name]/Link";
import { Fragment as UserIconFragment } from "~/components/UserIcon";
import { makeFragmentData } from "~/gql";

import { Fragment, ListItem } from "./RequestsListItem";

const meta = {
  component: ListItem,
  args: {
    style: { width: "256px" },
  },
} as Meta<typeof ListItem>;
export default meta;

export const Primary: StoryObj<typeof meta> = {
  args: {
    fragment: makeFragmentData(
      {
        ...makeFragmentData(
          { sourceId: `sm1` },
          NicovideoRegistrationRequestPageLinkFragment
        ),
        title: `Title 1`,
        sourceId: `sm1`,
        thumbnailUrl: "/960x540.jpg",
        requestedBy: {
          ...makeFragmentData({ name: "user1" }, UserPageLinkFragment),
          ...makeFragmentData(
            { icon: "/512x512.png", name: "user1", displayName: "User 1" },
            UserIconFragment
          ),
          id: "u1",
          displayName: "User 1",
        } as ResultOf<typeof Fragment>["requestedBy"], // TODO: makeFragmentDataのマージは出来ないのか？
      },
      Fragment
    ),
  },
};
