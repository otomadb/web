import { Meta, StoryObj } from "@storybook/react";

import { Fragment as UserIconFragment } from "~/components/UserIcon";
import { makeFragmentData } from "~/gql";

import UserIndicator, { Fragment } from "./UserIndicator";

const meta = {
  component: UserIndicator,
  args: {
    style: {
      width: 32,
      height: 32,
    },
  },
} as Meta<typeof UserIndicator>;
export default meta;

export const SomeNotifications: StoryObj<typeof meta> = {
  name: "何件かの通知がある",
  args: {
    fragment: makeFragmentData(
      {
        ...makeFragmentData(
          { icon: "/512x512.png", displayName: "SnO2WMaN" },
          UserIconFragment
        ),
        notifications: {
          totalCount: 9,
        },
      },
      Fragment
    ),
  },
};

export const NoNotifications: StoryObj<typeof meta> = {
  name: "通知はない",
  args: {
    fragment: makeFragmentData(
      {
        ...makeFragmentData(
          { icon: "/512x512.png", displayName: "SnO2WmaN" },
          UserIconFragment
        ),
        notifications: {
          totalCount: 0,
        },
      },
      Fragment
    ),
  },
};
