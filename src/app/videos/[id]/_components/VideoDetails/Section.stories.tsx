import { Meta, StoryObj } from "@storybook/react";

import { VideoDetailsSection } from "./Section";

export default {
  component: VideoDetailsSection,
  args: {},
} as Meta<typeof VideoDetailsSection>;

export const Primary: StoryObj<typeof VideoDetailsSection> = {
  args: {
    thumbnailUrl: "/storybook/960x540.jpg",
    title: "M.C.ドナルドはダンスに夢中なのか？最終鬼畜道化師ドナルド・Ｍ",
  },
};
