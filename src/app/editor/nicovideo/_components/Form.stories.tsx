import { action } from "@storybook/addon-actions";
import { Meta, StoryObj } from "@storybook/react";
import { graphql } from "msw";
import {
  createClient as createUrqlClient,
  Provider as UrqlProvider,
} from "urql";

import { SourceIdContext } from "~/components/NicovideoSourceIdForm/SourceIdProvider";
import { mockTagSearcher } from "~/components/TagSearcher/index.mocks";
import {} from "~/components/TagSearcher/SearchBox";
import { makeFragmentData } from "~/gql";
import {
  RegisterNicovideoPage_RegisterForm_Confirm_TagDocument,
  RegisterNicovideoPage_RegisterForm_RegisterVideoDocument,
  RegisterNicovideoPage_SourceCheckerDocument,
  TagType,
} from "~/gql/graphql";
import {
  aNicovideoOriginalSource,
  aNicovideoOriginalSourceTagSearchTagsPayload,
  aTag,
  aTagSearchItemByName,
} from "~/gql/mock";

import { RegisterForm } from "./Form";
import { Fragment as SucceededToastFragment } from "./SucceededToast";

const meta = {
  component: RegisterForm,
  args: {
    clearSourceId: action("clearSourceId"),
  },
  render(args) {
    return (
      <UrqlProvider
        value={createUrqlClient({ url: "/graphql", exchanges: [] })}
      >
        <SourceIdContext.Provider
          value={{
            sourceId: "sm2057168",
            setSourceId: action("setSourceId"),
            clearSourceId: action("clearSourceId"),
          }}
        >
          <RegisterForm {...args} />
        </SourceIdContext.Provider>
      </UrqlProvider>
    );
  },
  parameters: {},
} as Meta<typeof RegisterForm>;
export default meta;

export const NoSourceId: StoryObj<typeof meta> = {};
export const Primary: StoryObj<typeof meta> = {
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
                        searchTags:
                          aNicovideoOriginalSourceTagSearchTagsPayload({
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
                        searchTags:
                          aNicovideoOriginalSourceTagSearchTagsPayload({
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
                },
                findNicovideoVideoSource: null,
              })
            )
        ),
        graphql.query(
          RegisterNicovideoPage_RegisterForm_Confirm_TagDocument,
          (req, res, ctx) => {
            switch (req.variables.id) {
              case "t1":
                return res(
                  ctx.data({
                    getTag: aTag({
                      id: "t1",
                      name: "ドナルド・マクドナルド",
                      explicitParent: null,
                      type: TagType.Character,
                    }),
                  })
                );
              case "t2":
                return res(
                  ctx.data({
                    getTag: aTag({
                      id: "t2",
                      name: "U.N.オーエンは彼女なのか？",
                      explicitParent: null,
                      type: TagType.Music,
                    }),
                  })
                );
              case "t3":
                return res(
                  ctx.data({
                    getTag: aTag({
                      id: "t3",
                      name: "最終鬼畜妹フランドール・Ｓ",
                      explicitParent: null,
                      type: TagType.Music,
                    }),
                  })
                );
              case "t4":
                return res(
                  ctx.data({
                    getTag: aTag({
                      id: "t4",
                      name: "東方Project",
                      explicitParent: null,
                      type: TagType.Unknown,
                    }),
                  })
                );
              default:
                return res(ctx.errors([{ message: "not found" }]));
            }
          }
        ),
        mockTagSearcher,
        graphql.mutation(
          RegisterNicovideoPage_RegisterForm_RegisterVideoDocument,
          (req, res, ctx) => {
            return res(
              ctx.data({
                registerVideoFromNicovideo: {
                  __typename: "RegisterVideoFromNicovideoSucceededPayload",
                  ...makeFragmentData(
                    {
                      video: {
                        id: "v1",
                        title: req.variables.input.primaryTitle,
                        thumbnailUrl: req.variables.input.primaryThumbnailUrl,
                      },
                    },
                    SucceededToastFragment
                  ),
                },
              })
            );
          }
        ),
      ],
    },
  },
};
