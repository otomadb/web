import { ResultOf } from "@graphql-typed-document-node/core";
import { Meta, StoryObj } from "@storybook/react";

import { UserLikesPageLinkFragment2 } from "~/app/(v2)/users/[name]/likes/Link";
import { UserMylistsPageLinkFragment } from "~/app/(v2)/users/[name]/mylists/Link";
import { makeFragmentData } from "~/gql";

import SideNav, { SideNavPrimaryFragment } from "./SideNav";

const meta = {
  component: SideNav,
  args: {
    style: {
      width: 288,
      height: 500,
    },
    primaryFragment: makeFragmentData(
      {
        ...makeFragmentData({ name: "user1" }, UserLikesPageLinkFragment2),
        ...makeFragmentData({ name: "user1" }, UserMylistsPageLinkFragment),
      } as ResultOf<typeof SideNavPrimaryFragment>,
      SideNavPrimaryFragment
    ),
  },
} satisfies Meta<typeof SideNav>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {};
