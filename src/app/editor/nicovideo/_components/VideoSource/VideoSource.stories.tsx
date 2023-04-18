import { Meta, StoryObj } from "@storybook/react";

import { makeFragmentData } from "~/gql";
import { aNicovideoVideoSource, aVideo } from "~/gql/mock";

import { Fragment, VideoSource } from "./VideoSource";

const meta = {
  component: VideoSource,
  args: {},
  render(args) {
    return <VideoSource {...args} />;
  },
  parameters: {
    msw: { handlers: [] },
  },
} as Meta<typeof VideoSource>;
export default meta;

export const Primary: StoryObj<typeof meta> = {
  args: {
    fragment: makeFragmentData(
      aNicovideoVideoSource({
        sourceId: "sm2057168",
        video: aVideo({
          title: "M.C.ドナルドはダンスに夢中なのか？最終鬼畜道化師ドナルド・Ｍ",
          thumbnailUrl: "/960x540.jpg",
        }),
      }),
      Fragment
    ),
  },
};
