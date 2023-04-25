import { Meta, StoryObj } from "@storybook/react";

import { makeFragmentData } from "~/gql";

import { AlreadyRegistered, Fragment } from "./AlreadyRegistered";

const meta = {
  component: AlreadyRegistered,
  args: {},
} as Meta<typeof AlreadyRegistered>;
export default meta;

export const Primary: StoryObj<typeof meta> = {
  args: {
    fragment: makeFragmentData(
      {
        sourceId: "sm2057168",
        video: {
          title: "M.C.ドナルドはダンスに夢中なのか？最終鬼畜道化師ドナルド・Ｍ",
          thumbnailUrl: "/960x540.jpg",
        },
      },
      Fragment
    ),
  },
};
