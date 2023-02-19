import { action } from "@storybook/addon-actions";
import { Meta, StoryObj } from "@storybook/react";
import { graphql } from "msw";
import {
  createClient as createUrqlClient,
  Provider as UrqlProvider,
} from "urql";

import {
  aNicovideoOriginalSource,
  aNicovideoOriginalSourceTagSearchTagsPayload,
  aNicovideoVideoSource,
  aTag,
  aVideo,
  PseudoTagType,
  RegisterNicovideoPage_SourceCheckerDocument,
} from "~/gql/graphql";

import { SourceChecker } from "./SourceChecker";

const meta = {
  component: SourceChecker,
  args: {
    toggleTag: action("toggleTag"),
    setNotyet: action("setSource"),
    setSource: action("setSource"),
  },
  render(args) {
    return (
      <UrqlProvider value={createUrqlClient({ url: "/graphql" })}>
        <SourceChecker {...args} />
      </UrqlProvider>
    );
  },
  parameters: {},
} as Meta<typeof SourceChecker>;
export default meta;

export const Loading: StoryObj<typeof meta> = {
  parameters: {
    msw: {
      handlers: [
        graphql.query(
          RegisterNicovideoPage_SourceCheckerDocument,
          (req, res, ctx) => res(ctx.delay("infinite"))
        ),
      ],
    },
  },
};

export const SourceAlreadyRegistered: StoryObj<typeof meta> = {
  name: "動画が既に登録済み",
  parameters: {
    msw: {
      handlers: [
        graphql.query(
          RegisterNicovideoPage_SourceCheckerDocument,
          (req, res, ctx) =>
            res(
              ctx.data({
                fetchNicovideo: {
                  source: aNicovideoOriginalSource({
                    sourceId: "sm2057168",
                    title:
                      "M.C.ドナルドはダンスに夢中なのか？最終鬼畜道化師ドナルド・Ｍ",
                    thumbnailUrl: "/960x540.jpg",
                    tags: [
                      {
                        name: "ドナルド",
                        searchTags:
                          aNicovideoOriginalSourceTagSearchTagsPayload({
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
                        searchTags:
                          aNicovideoOriginalSourceTagSearchTagsPayload({
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
                        searchTags:
                          aNicovideoOriginalSourceTagSearchTagsPayload({
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
                        searchTags:
                          aNicovideoOriginalSourceTagSearchTagsPayload({
                            items: [],
                          }),
                      },
                      {
                        name: "東方乱々流",
                        searchTags:
                          aNicovideoOriginalSourceTagSearchTagsPayload({
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
                        searchTags:
                          aNicovideoOriginalSourceTagSearchTagsPayload({
                            items: [],
                          }),
                      },
                      {
                        name: "ドナルド教",
                        searchTags:
                          aNicovideoOriginalSourceTagSearchTagsPayload({
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
                findNicovideoVideoSource: aNicovideoVideoSource({
                  sourceId: "sm2057168",
                  video: aVideo({
                    title:
                      "M.C.ドナルドはダンスに夢中なのか？最終鬼畜道化師ドナルド・Ｍ",
                    thumbnailUrl: "/960x540.jpg",
                  }),
                }),
              })
            )
        ),
      ],
    },
  },
};

export const SourceNotYetRegistered: StoryObj<typeof meta> = {
  name: "動画はまだ登録されていない",
  parameters: {
    msw: {
      handlers: [
        graphql.query(
          RegisterNicovideoPage_SourceCheckerDocument,
          (req, res, ctx) =>
            res(
              ctx.data({
                fetchNicovideo: {
                  source: aNicovideoOriginalSource({
                    sourceId: "sm2057168",
                    title:
                      "M.C.ドナルドはダンスに夢中なのか？最終鬼畜道化師ドナルド・Ｍ",
                    thumbnailUrl: "/960x540.jpg",
                    tags: [
                      {
                        name: "ドナルド",
                        searchTags:
                          aNicovideoOriginalSourceTagSearchTagsPayload({
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
                        searchTags:
                          aNicovideoOriginalSourceTagSearchTagsPayload({
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
                        searchTags:
                          aNicovideoOriginalSourceTagSearchTagsPayload({
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
                        searchTags:
                          aNicovideoOriginalSourceTagSearchTagsPayload({
                            items: [],
                          }),
                      },
                      {
                        name: "東方乱々流",
                        searchTags:
                          aNicovideoOriginalSourceTagSearchTagsPayload({
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
                        searchTags:
                          aNicovideoOriginalSourceTagSearchTagsPayload({
                            items: [],
                          }),
                      },
                      {
                        name: "ドナルド教",
                        searchTags:
                          aNicovideoOriginalSourceTagSearchTagsPayload({
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
                findNicovideoVideoSource: null,
              })
            )
        ),
      ],
    },
  },
};
