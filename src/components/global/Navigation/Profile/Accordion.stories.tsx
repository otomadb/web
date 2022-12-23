import { css } from "@emotion/css";
import { Meta, StoryObj } from "@storybook/react";

import { Accordion } from "./Accordion";

export default {
  component: Accordion,
  args: {
    className: css`
      width: 192px;
    `,
    user: {
      id: "1",
      name: "sno2wman",
      displayName: "SnO2WMaN",
      icon: "/storybook/512x512.png",
    },
  },
} as Meta<typeof Accordion>;

export const Primary: StoryObj<typeof Accordion> = {
  args: {},
};
