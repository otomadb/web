import { css } from "@emotion/css";
import { Meta, StoryObj } from "@storybook/react";

import { aUser } from "~/gql/graphql";

import { Accordion } from "./Accordion";

export default {
  component: Accordion,
  args: {
    className: css`
      width: 256px;
    `,
  },
} as Meta<typeof Accordion>;

export const Normal: StoryObj<typeof Accordion> = {
  name: "通常ユーザ",
  args: {
    fragment: aUser({
      id: "1",
      name: "sno2wman",
      displayName: "SnO2WMaN",
      icon: "/storybook/512x512.png",
      isEditor: false,
      isAdministrator: false,
    }),
  },
};

export const Editor: StoryObj<typeof Accordion> = {
  name: "編集者",
  args: {
    fragment: aUser({
      id: "1",
      name: "sno2wman",
      displayName: "SnO2WMaN",
      icon: "/storybook/512x512.png",
      isEditor: true,
      isAdministrator: false,
    }),
  },
};

export const Adnimistrator: StoryObj<typeof Accordion> = {
  name: "管理者",
  args: {
    fragment: aUser({
      id: "1",
      name: "sno2wman",
      displayName: "SnO2WMaN",
      icon: "/storybook/512x512.png",
      isEditor: true,
      isAdministrator: true,
    }),
  },
};
