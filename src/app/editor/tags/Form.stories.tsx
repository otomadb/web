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
  RegisterTagPage_ExplicitParentTagDocument,
  RegisterTagPage_ImplicitParentTagDocument,
  RegisterTagPage_RegisterTagDocument,
  RegisterTagPage_Semitags_FindSemitagsDocument,
  RegisterTagPage_Semitags_SelectedDocument,
  Semitag,
  TagSearcher_SearchDocument,
  TagType,
} from "~/gql/graphql";

import { RegisterTagForm } from "./Form";

const meta = {
  component: RegisterTagForm,
  args: {
    className: css`
      width: 1024px;
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
                      type: TagType.Character,
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
                      type: TagType.Copyright,
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
                    getTag: aTag({
                      id: "t2",
                      name: "後藤ひとり",
                      type: TagType.Character,
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
                    getTag: aTag({
                      id: "t3",
                      name: "ぼっち・ざ・ろっく！",
                      type: TagType.Copyright,
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
                    getTag: aTag({
                      id: "t2",
                      name: "後藤ひとり",
                      type: TagType.Character,
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
                    getTag: aTag({
                      id: "t3",
                      name: "ぼっち・ざ・ろっく！",
                      type: TagType.Copyright,
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
                  nodes: (() => {
                    const rtn: Semitag[] = [];
                    // if (!req.variables.except.includes("st1"))
                    rtn.push(aSemitag({ id: "st1", name: "Semitag 1" }));
                    // if (!req.variables.except.includes("st2"))
                    rtn.push(aSemitag({ id: "st2", name: "Semitag 2" }));
                    // if (!req.variables.except.includes("st3"))
                    rtn.push(aSemitag({ id: "st3", name: "Semitag 3" }));
                    // if (!req.variables.except.includes("st4"))
                    rtn.push(aSemitag({ id: "st4", name: "Semitag 4" }));
                    // if (!req.variables.except.includes("st5"))
                    rtn.push(aSemitag({ id: "st5", name: "Semitag 5" }));
                    return rtn;
                  })(),
                },
              })
            )
        ),
        graphql.query(
          RegisterTagPage_Semitags_SelectedDocument,
          (req, res, ctx) => {
            switch (req.variables.id) {
              case "st1":
                return res(
                  ctx.data({
                    getSemitag: aSemitag({ id: "st1", name: "Semitag 1" }),
                  })
                );
              case "st2":
                return res(
                  ctx.data({
                    getSemitag: aSemitag({ id: "st2", name: "Semitag 2" }),
                  })
                );
              case "st3":
                return res(
                  ctx.data({
                    getSemitag: aSemitag({ id: "st3", name: "Semitag 3" }),
                  })
                );
              case "st4":
                return res(
                  ctx.data({
                    getSemitag: aSemitag({ id: "st4", name: "Semitag 4" }),
                  })
                );
              case "st5":
                return res(
                  ctx.data({
                    getSemitag: aSemitag({ id: "st5", name: "Semitag" }),
                  })
                );
              default:
                return res(ctx.errors([{ message: "not found" }]));
            }
          }
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
