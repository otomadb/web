import { Meta, StoryObj } from "@storybook/react";
import clsx from "clsx";
import { graphql } from "msw";
import {
  createClient as createUrqlClient,
  Provider as UrqlProvider,
} from "urql";

import {
  aSearchTagsItem,
  aSemitag,
  aTag,
  PseudoTagType,
  RegisterTagPage_ExplicitParentTagDocument,
  RegisterTagPage_ImplicitParentTagDocument,
  RegisterTagPage_RegisterTagDocument,
  RegisterTagPage_Semitags_FindSemitagsDocument,
  TagSearcher_SearchDocument,
} from "~/gql/graphql";

import { RegisterTagForm } from "./Form";

const meta = {
  component: RegisterTagForm,
  args: {
    className: clsx(["w-[1024px]"]),
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
        graphql.mutation(
          RegisterTagPage_RegisterTagDocument,
          (req, res, ctx) => {
            return res(
              ctx.data({
                registerTag: {
                  __typename: "RegisterTagSucceededPayload",
                  tag: aTag({
                    id: "t1",
                    name: req.variables.input.primaryName,
                    explicitParent: aTag({ id: "tag_2", name: "仮" }),
                  }),
                },
              })
            );
          }
        ),
        graphql.query(TagSearcher_SearchDocument, (req, res, ctx) =>
          res(
            ctx.data({
              searchTags: {
                items: [
                  aSearchTagsItem({
                    matchedName: "後藤ひとり",
                    tag: aTag({
                      id: "t2",
                      name: "後藤ひとり",
                      pseudoType: PseudoTagType.Character,
                      explicitParent: aTag({
                        id: "t3",
                        name: "ぼっち・ざ・ろっく！",
                      }),
                    }),
                  }),
                  aSearchTagsItem({
                    matchedName: "ぼっち・ざ・ろっく！",
                    tag: aTag({
                      id: "t3",
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
        graphql.query(
          RegisterTagPage_ExplicitParentTagDocument,
          (req, res, ctx) => {
            switch (req.variables.id) {
              case "t2":
                return res(
                  ctx.data({
                    tag: aTag({
                      id: "t2",
                      name: "後藤ひとり",
                      pseudoType: PseudoTagType.Character,
                      explicitParent: aTag({
                        id: "t3",
                        name: "ぼっち・ざ・ろっく！",
                      }),
                    }),
                  })
                );
              case "t3":
                return res(
                  ctx.data({
                    tag: aTag({
                      id: "t3",
                      name: "ぼっち・ざ・ろっく！",
                      pseudoType: PseudoTagType.Copyright,
                      explicitParent: null,
                    }),
                  })
                );
            }
          }
        ),
        graphql.query(
          RegisterTagPage_ImplicitParentTagDocument,
          (req, res, ctx) => {
            switch (req.variables.id) {
              case "t2":
                return res(
                  ctx.data({
                    tag: aTag({
                      id: "t2",
                      name: "後藤ひとり",
                      pseudoType: PseudoTagType.Character,
                      explicitParent: aTag({
                        id: "t3",
                        name: "ぼっち・ざ・ろっく！",
                      }),
                    }),
                  })
                );
              case "t3":
                return res(
                  ctx.data({
                    tag: aTag({
                      id: "t3",
                      name: "ぼっち・ざ・ろっく！",
                      pseudoType: PseudoTagType.Copyright,
                      explicitParent: null,
                    }),
                  })
                );
            }
          }
        ),
        graphql.query(
          RegisterTagPage_Semitags_FindSemitagsDocument,
          (req, res, ctx) =>
            res(
              ctx.data({
                findSemitags: {
                  nodes: [...new Array(5)]
                    .map((_, i) => i + 1)
                    .filter(
                      (i) => !req.variables.except.includes(`semitag:${i}`)
                    )
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
      ],
    },
  },
} as Meta<typeof RegisterTagForm>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};
