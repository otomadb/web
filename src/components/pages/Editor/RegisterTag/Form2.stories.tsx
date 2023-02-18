import { Meta, StoryObj } from "@storybook/react";
import clsx from "clsx";
import { graphql } from "msw";
import {
  createClient as createUrqlClient,
  Provider as UrqlProvider,
} from "urql";

import {
  aSearchTagsItem,
  aTag,
  PseudoTagType,
  RegisterTag_RegisterTagDocument,
  RegisterTagPage_ExplicitParentTagDocument,
  RegisterTagPage_ImplicitParentTagDocument,
  TagSearcher_SearchDocument,
} from "~/gql/graphql";

import { RegisterTagForm } from "./Form2";

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
        graphql.mutation(RegisterTag_RegisterTagDocument, (req, res, ctx) => {
          return res(
            ctx.data({
              registerTag: {
                __typename: "RegisterTagSucceededPayload",
                tag: aTag({
                  id: "t1",
                  name: req.variables.primaryName,
                  explicitParent: aTag({ id: "tag_2", name: "仮" }),
                }),
              },
            })
          );
        }),
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
      ],
    },
  },
} as Meta<typeof RegisterTagForm>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};
