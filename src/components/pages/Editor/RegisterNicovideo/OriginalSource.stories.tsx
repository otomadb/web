import { action } from "@storybook/addon-actions";
import { Meta, StoryObj } from "@storybook/react";
import {
  createClient as createUrqlClient,
  Provider as UrqlProvider,
} from "urql";

import {
  aNicovideoOriginalSource,
  aNicovideoOriginalSourceTagSearchTagsPayload,
  aTag,
  PseudoTagType,
} from "~/gql/graphql";

import { OriginalSource } from "./OriginalSource";

const meta = {
  component: OriginalSource,
  args: {
    toggleTag: action("toggleTag"),
  },
  render(args) {
    return (
      <UrqlProvider value={createUrqlClient({ url: "/graphql" })}>
        <OriginalSource {...args} />
      </UrqlProvider>
    );
  },
  parameters: {
    msw: { handlers: [] },
  },
} as Meta<typeof OriginalSource>;
export default meta;

export const Primary: StoryObj<typeof meta> = {
  args: {
    fragment: aNicovideoOriginalSource({
      sourceId: "sm2057168",
      title: "M.C.ドナルドはダンスに夢中なのか？最終鬼畜道化師ドナルド・Ｍ",
      thumbnailUrl: "/960x540.jpg",
      tags: [
        {
          name: "ドナルド",
          searchTags: aNicovideoOriginalSourceTagSearchTagsPayload({
            items: [
              {
                tag: aTag({
                  id: "t1",
                  name: "ドナルド・マクドナルド",
                  explicitParent: null,
                  pseudoType: PseudoTagType.Character,
                }),
              },
            ],
          }),
        },
        {
          name: "U.N.オーエンは彼女なのか？",
          searchTags: aNicovideoOriginalSourceTagSearchTagsPayload({
            items: [
              {
                tag: aTag({
                  id: "t2",
                  name: "U.N.オーエンは彼女なのか？",
                  explicitParent: null,
                  pseudoType: PseudoTagType.Music,
                }),
              },
            ],
          }),
        },
        {
          name: "最終鬼畜妹フランドール・Ｓ",
          searchTags: aNicovideoOriginalSourceTagSearchTagsPayload({
            items: [
              {
                tag: aTag({
                  id: "t3",
                  name: "最終鬼畜妹フランドール・Ｓ",
                  explicitParent: null,
                  pseudoType: PseudoTagType.Music,
                }),
              },
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
              {
                tag: aTag({
                  id: "t1",
                  name: "ドナルド・マクドナルド",
                  explicitParent: null,
                  pseudoType: PseudoTagType.Character,
                }),
              },
              {
                tag: aTag({
                  id: "t4",
                  name: "東方Project",
                  explicitParent: null,
                  pseudoType: PseudoTagType.Unknown,
                }),
              },
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
              {
                tag: aTag({
                  id: "t1",
                  name: "ドナルド・マクドナルド",
                  explicitParent: null,
                  pseudoType: PseudoTagType.Character,
                }),
              },
            ],
          }),
        },
      ],
    }),
  },
};
