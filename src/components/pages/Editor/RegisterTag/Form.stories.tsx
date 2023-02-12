import { css } from "@emotion/css";
import { Meta, StoryObj } from "@storybook/react";
import { graphql } from "msw";
import {
  createClient as createUrqlClient,
  Provider as UrqlProvider,
} from "urql";

import {
  aSearchTagsItem,
  aSemitag,
  aTag,
  aVideo,
  PseudoTagType,
  RegisterTag_FindSemitagsDocument,
  RegisterTag_GetParentTagDocument,
  RegisterTag_GetSemitagDocument,
  RegisterTag_RegisterTagDocument,
  RegisterTag_SearchTagsDocument,
} from "~/gql/graphql";

import { RegisterTagForm } from "./Form";

export default {
  component: RegisterTagForm,
  args: {
    className: css`
      width: 960px;
    `,
  },
  render(args) {
    return (
      <UrqlProvider value={createUrqlClient({ url: "/graphql" })}>
        <RegisterTagForm {...args} />
      </UrqlProvider>
    );
  },
  parameters: {
    layout: "centered",
    msw: {
      handlers: [
        graphql.mutation(RegisterTag_RegisterTagDocument, (req, res, ctx) =>
          res(
            ctx.data({
              registerTag: {
                __typename: "RegisterTagSucceededPayload",
                tag: aTag({
                  id: "tag_1",
                  name: req.variables.primaryName,
                  explicitParent: aTag({
                    id: "tag_2",
                    name: "仮",
                  }),
                }),
              },
            })
          )
        ),
        graphql.query(RegisterTag_SearchTagsDocument, (req, res, ctx) =>
          res(
            ctx.data({
              searchTags: {
                items: [
                  aSearchTagsItem({
                    matchedName: "後藤ひとり",
                    tag: aTag({
                      id: "tag_1",
                      name: "後藤ひとり",
                      pseudoType: PseudoTagType.Character,
                      explicitParent: aTag({
                        id: "tag_2",
                        name: "ぼっち・ざ・ろっく！",
                      }),
                    }),
                  }),
                  aSearchTagsItem({
                    matchedName: "ぼっち・ざ・ろっく！",
                    tag: aTag({
                      id: "tag_3",
                      name: "ぼっち・ざ・ろっく！",
                      pseudoType: PseudoTagType.Copyright,
                      explicitParent: null,
                    }),
                  }),
                ],
              },
            })
          )
        ),
        graphql.query(RegisterTag_GetSemitagDocument, (req, res, ctx) =>
          res(
            ctx.data({
              semitag: aSemitag({
                id: "semitag:1",
                name: "ドナルド・マクドナルド",
                video: aVideo({
                  id: "video_1",
                  title:
                    "M.C.ドナルドはダンスに夢中なのか？最終鬼畜道化師ドナルド・Ｍ",
                  thumbnailUrl: "/storybook/960x540.jpg",
                }),
              }),
            })
          )
        ),
        graphql.query(RegisterTag_FindSemitagsDocument, (req, res, ctx) =>
          res(
            ctx.data({
              findSemitags: {
                nodes: [...new Array(30)]
                  .map((_, i) => i + 1)
                  .filter((i) => !req.variables.except.includes(`semitag:${i}`))
                  .map((i) =>
                    aSemitag({
                      id: `semitag:${i}`,
                      name: `semitag ${i}`,
                    })
                  ),
                /*[
                aSemitag({
                  id: "semitag:1",
                  name: "ドナルド・マクドナルド",
                  video: aVideo({
                    id: "video_1",
                    title:
                      "M.C.ドナルドはダンスに夢中なのか？最終鬼畜道化師ドナルド・Ｍ",
                    thumbnailUrl: "/storybook/960x540.jpg",
                  }),
                }),
                aSemitag({
                  id: "semitag:2",
                  name: "U.N.オーエンは彼女なのか？",
                  video: aVideo({
                    id: "video_1",
                    title:
                      "M.C.ドナルドはダンスに夢中なのか？最終鬼畜道化師ドナルド・Ｍ",
                    thumbnailUrl: "/storybook/960x540.jpg",
                  }),
                }),
                aSemitag({
                  id: "semitag:3",
                  name: "最終鬼畜妹フランドール・Ｓ",
                  video: aVideo({
                    id: "video_1",
                    title:
                      "M.C.ドナルドはダンスに夢中なのか？最終鬼畜道化師ドナルド・Ｍ",
                    thumbnailUrl: "/storybook/960x540.jpg",
                  }),
                }),
              ],
                */
              },
            })
          )
        ),
        graphql.query(RegisterTag_GetParentTagDocument, (req, res, ctx) =>
          res(
            ctx.data({
              tag: aTag({
                id: "tag_1",
                name: "後藤ひとり",
                explicitParent: aTag({
                  id: "tag_2",
                  name: "ぼっち・ざ・ろっく！",
                }),
              }),
            })
          )
        ),
      ],
    },
  },
} as Meta<typeof RegisterTagForm>;

export const Primary: StoryObj<typeof RegisterTagForm> = {
  args: {},
};
