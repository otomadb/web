import { action } from "@storybook/addon-actions";
import { Meta, StoryObj } from "@storybook/react";
import clsx from "clsx";
import { graphql } from "msw";
import {
  createClient as createUrqlClient,
  Provider as UrqlProvider,
} from "urql";

import {
  aResolveSemitagPayload,
  aSearchTagsItem,
  aSearchTagsPayload,
  aSemitag,
  aTag,
  aVideo,
  PseudoTagType,
  TagSearcher_SearchDocument,
  VideoPage_ResolveSemitagDocument,
  VideoPage_SemitagEditor_SemitagDocument,
  VideoPage_SemitagEditor_TagDocument,
} from "~/gql/graphql";

import { SemitagEditor } from "./SemitagEditor";

export default {
  component: SemitagEditor,
  args: {
    className: clsx(["w-80"]),
    semitagId: "semitag:1",
    handleSelected: action("handleSelect"),
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
        graphql.query(VideoPage_SemitagEditor_TagDocument, (req, res, ctx) =>
          res(
            ctx.data({
              tag: aTag({
                id: `tag:1`,
                name: "後藤ひとり",
                pseudoType: PseudoTagType.Character,
                explicitParent: aTag({
                  id: "tag_2",
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
                        id: "tag_2",
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
        graphql.mutation(VideoPage_ResolveSemitagDocument, (req, res, ctx) =>
          res(
            ctx.data({
              resovleSemitag: aResolveSemitagPayload({
                semitag: aSemitag({
                  id: "semitag:1",
                  video: aVideo({
                    id: "video_1",
                  }),
                }),
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
