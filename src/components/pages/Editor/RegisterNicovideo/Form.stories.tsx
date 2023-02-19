import { css } from "@emotion/css";
import { Meta, StoryObj } from "@storybook/react";
import { userEvent, within } from "@storybook/testing-library";
import { graphql } from "msw";
import {
  createClient as createUrqlClient,
  Provider as UrqlProvider,
} from "urql";

import {
  aNicovideoOriginalSource,
  aNicovideoOriginalSourceTagSearchTagsPayload,
  aTag,
  aVideo,
  PseudoTagType,
  RegisterNicovideoPage_RegisterForm_RegisterVideoDocument,
  RegisterNicovideoPage_RegisterForm_TagDocument,
  RegisterNicovideoPage_SourceCheckerDocument,
} from "~/gql/graphql";

import { Form } from "./Form";

const meta = {
  component: Form,
  args: {
    className: css`
      width: 1024px;
    `,
  },
  render(args) {
    return (
      <UrqlProvider value={createUrqlClient({ url: "/graphql" })}>
        <Form {...args} />
      </UrqlProvider>
    );
  },
  parameters: {
    layout: "centered",
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
        graphql.mutation(
          RegisterNicovideoPage_RegisterForm_RegisterVideoDocument,
          (req, res, ctx) => {
            return res(
              ctx.data({
                registerVideo: {
                  __typename: "RegisterVideoSucceededPayload",
                  video: aVideo({
                    id: "v1",
                    title: req.variables.input.primaryTitle,
                    thumbnailUrl: req.variables.input.primaryThumbnail,
                  }),
                },
              })
            );
          }
        ),
      ],
    },
  },
} as Meta<typeof Form>;
export default meta;

export const WrongSourceId: StoryObj<typeof meta> = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.type(
      canvas.getByLabelText("ニコニコ動画の動画ID"),
      "wrong"
    );
    await userEvent.click(canvas.getByLabelText("ニコニコ動画からの検索"));
  },
};

export const OkSourceId: StoryObj<typeof meta> = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.type(
      canvas.getByLabelText("ニコニコ動画の動画ID"),
      "sm2057168"
    );
    await userEvent.click(canvas.getByLabelText("ニコニコ動画からの検索"));
  },
};
