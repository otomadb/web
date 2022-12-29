import { action } from "@storybook/addon-actions";
import { Meta, StoryObj } from "@storybook/react";
import clsx from "clsx";
import { graphql } from "msw";
import {
  createClient as createUrqlClient,
  Provider as UrqlProvider,
} from "urql";

import {
  aSearchTagsItem,
  aSearchTagsPayload,
  aSemitag,
  aTag,
  Component_TagDocument,
  PseudoTagType,
  TagSearcher_SearchDocument,
  VideoPage_SemitagEditor_SemitagDocument,
} from "~/gql/graphql";

import { SemitagEditor } from "./SemitagEditor";

export default {
  component: SemitagEditor,
  args: {
    className: clsx(["w-80"]),
    handleSelect: action("handleSelect"),
  },
  render(args) {
    return (
      <UrqlProvider value={createUrqlClient({ url: "/graphql" })}>
        <SemitagEditor {...args} />
      </UrqlProvider>
    );
  },
  parameters: {
    layout: "centered",
    msw: {
      handlers: [
        graphql.query(
          VideoPage_SemitagEditor_SemitagDocument,
          (req, res, ctx) =>
            res(
              ctx.data({
                semitag: aSemitag({
                  id: "semitag:1",
                  name: "後藤ひとり(ぼっち・ざ・ろっく！)",
                }),
              })
            )
        ),
        graphql.query(Component_TagDocument, (req, res, ctx) =>
          res(
            ctx.data({
              tag: aTag({
                id: `tag:1`,
                name: "後藤ひとり",
                pseudoType: PseudoTagType.Character,
                explicitParent: aTag({
                  id: "tag:2",
                  name: "ぼっち・ざ・ろっく！",
                }),
              }),
            })
          )
        ),
        graphql.query(TagSearcher_SearchDocument, (req, res, ctx) =>
          res(
            ctx.data({
              searchTags: aSearchTagsPayload({
                items: [
                  aSearchTagsItem({
                    matchedName: "後藤ひとり",
                    tag: aTag({
                      id: `tag:1`,
                      name: "後藤ひとり",
                      pseudoType: PseudoTagType.Character,
                      explicitParent: aTag({
                        id: "tag:2",
                        name: "ぼっち・ざ・ろっく！",
                      }),
                    }),
                  }),
                  aSearchTagsItem({
                    matchedName: "ぼっち・ざ・ろっく！",
                    tag: aTag({
                      id: `tag:2`,
                      name: "ぼっち・ざ・ろっく！",
                      pseudoType: PseudoTagType.Copyright,
                      explicitParent: null,
                    }),
                  }),
                  aSearchTagsItem({
                    matchedName: "ドナルド",
                    tag: aTag({
                      id: `tag:3`,
                      name: "ドナルド・マクドナルド",
                      pseudoType: PseudoTagType.Character,
                      explicitParent: null,
                    }),
                  }),
                ],
              }),
            })
          )
        ),
      ],
    },
  },
} as Meta<typeof SemitagEditor>;

export const Primary: StoryObj<typeof SemitagEditor> = {
  args: {},
};
