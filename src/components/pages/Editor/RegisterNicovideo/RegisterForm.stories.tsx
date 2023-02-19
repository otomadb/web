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
  aRegisterVideoSucceededPayload,
  aSearchTagsItem,
  aTag,
  aVideo,
  PseudoTagType,
  RegisterNicovideoPage_RegisterForm_RegisterVideoDocument,
  RegisterNicovideoPage_RegisterForm_TagDocument,
  RegisterNicovideoPage_SourceCheckerDocument,
  TagSearcher_SearchDocument,
} from "~/gql/graphql";

import { RegisterForm } from "./RegisterForm";

const meta = {
  component: RegisterForm,
  args: {
    clearSourceId: action("clearSourceId"),
  },
  render(args) {
    return (
      <UrqlProvider value={createUrqlClient({ url: "/graphql" })}>
        <RegisterForm {...args} />
      </UrqlProvider>
    );
  },
  parameters: {},
} as Meta<typeof RegisterForm>;
export default meta;

export const NoSourceId: StoryObj<typeof meta> = {
  args: {
    sourceId: undefined,
  },
};
export const Primary: StoryObj<typeof meta> = {
  args: {
    sourceId: "sm2057168",
  },
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
        graphql.query(
          RegisterNicovideoPage_RegisterForm_TagDocument,
          (req, res, ctx) => {
            switch (req.variables.id) {
              case "t1":
                return res(
                  ctx.data({
                    tag: aTag({
                      id: "t1",
                      name: "ドナルド・マクドナルド",
                      explicitParent: null,
                      pseudoType: PseudoTagType.Character,
                    }),
                  })
                );
              case "t2":
                return res(
                  ctx.data({
                    tag: aTag({
                      id: "t2",
                      name: "U.N.オーエンは彼女なのか？",
                      explicitParent: null,
                      pseudoType: PseudoTagType.Music,
                    }),
                  })
                );
              case "t3":
                return res(
                  ctx.data({
                    tag: aTag({
                      id: "t3",
                      name: "最終鬼畜妹フランドール・Ｓ",
                      explicitParent: null,
                      pseudoType: PseudoTagType.Music,
                    }),
                  })
                );
              case "t4":
                return res(
                  ctx.data({
                    tag: aTag({
                      id: "t4",
                      name: "東方Project",
                      explicitParent: null,
                      pseudoType: PseudoTagType.Unknown,
                    }),
                  })
                );
              default:
                return res(ctx.errors([{ message: "not found" }]));
            }
          }
        ),
        graphql.query(TagSearcher_SearchDocument, (req, res, ctx) =>
          res(
            ctx.data({
              searchTags: {
                items: [
                  aSearchTagsItem({
                    matchedName: "ドナルド・マクドナルド",
                    tag: aTag({
                      id: "t1",
                      name: "ドナルド・マクドナルド",
                      explicitParent: null,
                      pseudoType: PseudoTagType.Character,
                    }),
                  }),
                  aSearchTagsItem({
                    matchedName: "U.N.オーエンは彼女なのか？",
                    tag: aTag({
                      id: "t2",
                      name: "U.N.オーエンは彼女なのか？",
                      explicitParent: null,
                      pseudoType: PseudoTagType.Music,
                    }),
                  }),
                  aSearchTagsItem({
                    matchedName: "最終鬼畜妹フランドール・Ｓ",
                    tag: aTag({
                      id: "t3",
                      name: "最終鬼畜妹フランドール・Ｓ",
                      explicitParent: null,
                      pseudoType: PseudoTagType.Music,
                    }),
                  }),
                ],
              },
            })
          )
        ),
        graphql.mutation(
          RegisterNicovideoPage_RegisterForm_RegisterVideoDocument,
          (req, res, ctx) => {
            return res(
              ctx.data({
                registerVideo: aRegisterVideoSucceededPayload({
                  __typename: "RegisterVideoSucceededPayload",
                  video: aVideo({}),
                }),
              })
            );
          }
        ),
      ],
    },
  },
};
