import { Meta, StoryObj } from "@storybook/react";

import { aVideo } from "~/gql/graphql";

import { Inner } from "./Inner";

export default {
  component: Inner,
  args: {},
} as Meta<typeof Inner>;

export const Primary: StoryObj<typeof Inner> = {
  args: {
    fallback: aVideo({
      thumbnailUrl: "/storybook/960x540.jpg",
      title: "M.C.ドナルドはダンスに夢中なのか？最終鬼畜道化師ドナルド・Ｍ",
    }),
  },
};
