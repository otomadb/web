import { action } from "@storybook/addon-actions";
import { Meta, StoryObj } from "@storybook/react";

import { makeFragmentData } from "~/gql";
import {
  aNicovideoOriginalSource,
  aNicovideoOriginalSourceTagSearchTagsPayload,
  aTag,
  aTagSearchItemByName,
  TagType,
} from "~/gql/graphql";

import { RegisterContext } from "../Context";
import { Fragment, Original } from "./Original";

const meta = {
  component: Original,
  args: {
    toggleTag: action("toggleTag"),
  },
  render(args) {
    return (
      <RegisterContext.Provider
        value={{
          setTitle: action("setTitle"),
          setSourceId: action("setSourceId"),
          setThumbnailUrl: action("setThumbnailUrl"),
          setRequestId: action("setNicovideoRequestId"),
          toggleSemitag: action("toggleSemitag"),
          toggleTag: action("toggleTag"),
        }}
      >
        <Original {...args} />
      </RegisterContext.Provider>
    );
  },
  parameters: {
    msw: { handlers: [] },
  },
} as Meta<typeof Original>;
export default meta;

export const Primary: StoryObj<typeof meta> = {
  args: {
    fragment: makeFragmentData(
      aNicovideoOriginalSource({
        sourceId: "sm2057168",
        title: "M.C.ドナルドはダンスに夢中なのか？最終鬼畜道化師ドナルド・Ｍ",
        thumbnailUrl: "/960x540.jpg",
        tags: [
          {
            name: "ドナルド",
            searchTags: aNicovideoOriginalSourceTagSearchTagsPayload({
              items: [
                aTagSearchItemByName({
                  tag: aTag({
                    id: "t1",
                    name: "ドナルド・マクドナルド",
                    explicitParent: null,
                    type: TagType.Character,
                  }),
                }),
              ],
            }),
          },
          {
            name: "U.N.オーエンは彼女なのか？",
            searchTags: aNicovideoOriginalSourceTagSearchTagsPayload({
              items: [
                aTagSearchItemByName({
                  tag: aTag({
                    id: "t2",
                    name: "U.N.オーエンは彼女なのか？",
                    explicitParent: null,
                    type: TagType.Music,
                  }),
                }),
              ],
            }),
          },
          {
            name: "最終鬼畜妹フランドール・Ｓ",
            searchTags: aNicovideoOriginalSourceTagSearchTagsPayload({
              items: [
                aTagSearchItemByName({
                  tag: aTag({
                    id: "t3",
                    name: "最終鬼畜妹フランドール・Ｓ",
                    explicitParent: null,
                    type: TagType.Music,
                  }),
                }),
              ],
            }),
          },
          {
            name: "エンターテイメント",
            searchTags: aNicovideoOriginalSourceTagSearchTagsPayload({
              items: [],
            }),
          },
          {
            name: "東方乱々流",
            searchTags: aNicovideoOriginalSourceTagSearchTagsPayload({
              items: [
                aTagSearchItemByName({
                  tag: aTag({
                    id: "t1",
                    name: "ドナルド・マクドナルド",
                    explicitParent: null,
                    type: TagType.Character,
                  }),
                }),
                aTagSearchItemByName({
                  tag: aTag({
                    id: "t4",
                    name: "東方Project",
                    explicitParent: null,
                    type: TagType.Unknown,
                  }),
                }),
              ],
            }),
          },
          {
            name: "音mad",
            searchTags: aNicovideoOriginalSourceTagSearchTagsPayload({
              items: [],
            }),
          },
          {
            name: "ドナルド教",
            searchTags: aNicovideoOriginalSourceTagSearchTagsPayload({
              items: [
                aTagSearchItemByName({
                  tag: aTag({
                    id: "t1",
                    name: "ドナルド・マクドナルド",
                    explicitParent: null,
                    type: TagType.Character,
                  }),
                }),
              ],
            }),
          },
        ],
      }),
      Fragment
    ),
  },
};
