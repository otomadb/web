import { Meta, StoryObj } from "@storybook/react";

import { Fragment as UserPageLinkFragment } from "~/app/users/[name]/Link";
import { Fragment as UserIconFragment } from "~/components/UserIcon";
import { UserDisplayNameLinkFragment } from "~/components/UserLink/UserDisplayNameLink";
import { UserIconLinkFragment } from "~/components/UserLink/UserIconLink";
import { makeFragmentData } from "~/gql";

import ListItem, { Fragment } from "./RequestsListItem";

const meta = {
  component: ListItem,
  args: {
    style: { width: 256 },
    PageLink: ({ children, ...props }) => <span {...props}>{children}</span>,
  },
} as Meta<typeof ListItem>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    fragment: makeFragmentData(
      {
        title: `Title 1`,
        thumbnailUrl: "/960x540.jpg",
        requestedBy: {
          id: "user:1",
          ...makeFragmentData(
            {
              displayName: "User1",
              ...makeFragmentData({ name: "user1" }, UserPageLinkFragment),
            },
            UserDisplayNameLinkFragment
          ),
          ...makeFragmentData(
            {
              ...makeFragmentData({ name: "user1" }, UserPageLinkFragment),
              ...makeFragmentData(
                { displayName: "User1", icon: "/512x512.png" },
                UserIconFragment
              ),
            } as never,
            UserIconLinkFragment
          ),
        } as never,
      },
      Fragment
    ),
  },
};
