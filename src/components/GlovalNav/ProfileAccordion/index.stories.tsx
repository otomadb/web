import { css } from "@emotion/css";
import { Meta, StoryObj } from "@storybook/react";

import { makeFragmentData } from "~/gql";
import { aUser } from "~/gql/graphql";
import ProfileAccordion, { Fragment } from ".";
import { Fragment as AboutMeFragment } from "./AboutMe";
import Notifications, {
  Fragment as NotificationsFragment,
} from "./Notifications";
import { ResultOf } from "@graphql-typed-document-node/core";

const meta = {
  component: ProfileAccordion,
  args: { style: { width: "256px" } },
} as Meta<typeof ProfileAccordion>;
export default meta;

export const Normal: StoryObj<typeof meta> = {
  name: "通常ユーザ",
  args: {
    fragment: makeFragmentData(
      {
        whoami: {
          name: "user1",
          displayName: "User 1",
          icon: "/512x512.png",
          isEditor: false,
          isAdministrator: false,
        },
        notifications: {
          totalCount: 9,
        },
      },
      Fragment
    ),
  },
};

export const Editor: StoryObj<typeof meta> = {
  name: "編集者",
  args: {
    fragment: makeFragmentData(
      {
        whoami: {
          name: "user1",
          displayName: "User 1",
          icon: "/512x512.png",
          isEditor: true,
          isAdministrator: false,
        },
        notifications: {
          totalCount: 9,
        },
      },
      Fragment
    ),
  },
};

export const Adnimistrator: StoryObj<typeof meta> = {
  name: "管理者",
  args: {
    fragment: makeFragmentData(
      {
        whoami: {
          name: "user1",
          displayName: "User 1",
          icon: "/512x512.png",
          isEditor: true,
          isAdministrator: true,
        },
        notifications: {
          totalCount: 9,
        },
      },
      Fragment
    ),
  },
};
