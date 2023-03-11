import { Meta, StoryObj } from "@storybook/react";

import { makeFragmentData } from "~/gql";
import { aNicovideoVideoSource, aVideo } from "~/gql/graphql";

import { Details, Fragment } from "./Details";

const meta = {
  component: Details,
  args: {},
} as Meta<typeof Details>;
export default meta;

export const Primary: StoryObj<typeof meta> = {
  args: {
    fragment: makeFragmentData(
      aVideo({
        id: "v1",
        title: "M.C.ドナルドはダンスに夢中なのか？最終鬼畜道化師ドナルド・Ｍ",
        thumbnailUrl: "/960x540.jpg",
        nicovideoSources: [
          aNicovideoVideoSource({
            id: "ns1",
            sourceId: "sm2057168",
            embedUrl: "https://embed.nicovideo.jp/watch/sm2057168",
          }),
          aNicovideoVideoSource({
            id: "ns2",
            sourceId: "sm9",
            embedUrl: "https://embed.nicovideo.jp/watch/sm9",
          }),
        ],
      }),
      Fragment
    ),
  },
};
