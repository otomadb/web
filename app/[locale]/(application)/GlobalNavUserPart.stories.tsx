import { Meta, StoryObj } from "@storybook/react";

import { makeFragmentData } from "~/gql";

import GlobalNav, { GlobalNavUserPartFragment } from "./GlobalNavUserPart";

const meta = {
  component: GlobalNav,
  args: {
    style: {
      width: 1024,
      height: 64,
    },
  },
} as Meta<typeof GlobalNav>;

export default meta;

export const NotLoggedIn: StoryObj<typeof meta> = {
  name: "未ログイン",
  args: {
    fragment: makeFragmentData({ viewer: null }, GlobalNavUserPartFragment),
  },
};

export const LoggedInWithNoNotification: StoryObj<typeof meta> = {
  name: "ログイン済みで通知なし",
  args: {
    fragment: makeFragmentData(
      {
        viewer: {
          name: "user1",
          displayName: "User 1",
          icon: "/512x512.png",
          notifications: {
            totalCount: 0,
          },
        },
      },
      GlobalNavUserPartFragment
    ),
  },
};

export const LoggedInWithSomeNotifications: StoryObj<typeof meta> = {
  name: "ログイン済みで何件かの通知あり",
  args: {
    fragment: makeFragmentData(
      {
        viewer: {
          name: "user1",
          displayName: "User 1",
          icon: "/512x512.png",
          notifications: {
            totalCount: 9,
          },
        },
      },
      GlobalNavUserPartFragment
    ),
  },
};
