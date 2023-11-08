import { Meta, StoryObj } from "@storybook/react";

import { makeFragmentData } from "~/gql";

import Component, { Fragment } from "./Notifications";

export default {
  component: Component,
  args: { style: { width: "256px" } },
} as Meta<typeof Component>;

export const SomeNotifications: StoryObj<typeof Component> = {
  name: "何件かの通知がある",
  args: {
    fragment: makeFragmentData({ notifications: { totalCount: 9 } }, Fragment),
  },
};

export const NoNotifications: StoryObj<typeof Component> = {
  name: "通知はない",
  args: {
    fragment: makeFragmentData({ notifications: { totalCount: 0 } }, Fragment),
  },
};
