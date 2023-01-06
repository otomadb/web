import { css } from "@emotion/css";
import { Meta, StoryObj } from "@storybook/react";

import { aMylistRegistration, aVideo } from "~/gql/graphql";

import { Registeration } from "./Registeration";

export default {
  component: Registeration,
  args: {
    registration: aMylistRegistration({
      id: "mylistRegistration:1",
      note: "これはサンプル文章です",
      video: aVideo({
        id: "video:1",
        title: "Video1",
        thumbnailUrl: "/storybook/960x540.jpg",
      }),
    }),
  },
} as Meta<typeof Registeration>;

export const W1024: StoryObj<typeof Registeration> = {
  name: "width: 1024px",
  args: {
    className: css`
      width: 1024px;
    `,
  },
};
