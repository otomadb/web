import { Meta, StoryObj } from "@storybook/react";

import { aVideo } from "~/gql/graphql";

import { DetailsSection } from "./DetailsSection";

export default {
  component: DetailsSection,
  args: {},
} as Meta<typeof DetailsSection>;

export const Primary: StoryObj<typeof DetailsSection> = {
  args: {
    fallback: aVideo({
      thumbnailUrl: "/storybook/960x540.jpg",
      title: "M.C.ドナルドはダンスに夢中なのか？最終鬼畜道化師ドナルド・Ｍ",
    }),
  },
};
