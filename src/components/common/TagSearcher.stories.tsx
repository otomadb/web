import { css } from "@emotion/css";
import { action } from "@storybook/addon-actions";
import { Meta, StoryObj } from "@storybook/react";
import { userEvent, within } from "@storybook/testing-library";
import { graphql } from "msw";
import {
  createClient as createUrqlClient,
  Provider as UrqlProvider,
} from "urql";

import {
  aSearchTagsItem,
  aSearchTagsPayload,
  aTag,
  PseudoTagType,
  TagSearcher_SearchTagsDocument,
} from "~/gql/graphql";

import { TagSearcher } from "./TagSearcher";

export default {
  component: TagSearcher,
  args: {
    className: css`
      width: 320px;
    `,
    handleSelect: action("handleSelect"),
  },
  render(args) {
    return (
      <UrqlProvider value={createUrqlClient({ url: "/graphql" })}>
        <TagSearcher {...args} />
      </UrqlProvider>
    );
  },
  parameters: {
    layout: "centered",
    msw: {
      handlers: [
        graphql.query(TagSearcher_SearchTagsDocument, (req, res, ctx) =>
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
} as Meta<typeof TagSearcher>;

export const Primary: StoryObj<typeof TagSearcher> = {
  args: {},
};

export const Searching: StoryObj<typeof TagSearcher> = {
  args: {},
  parameters: {
    layout: "centered",
    msw: {
      handlers: [
        graphql.query(TagSearcher_SearchTagsDocument, (req, res, ctx) =>
          res(ctx.delay("infinite"))
        ),
      ],
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await userEvent.type(canvas.getByPlaceholderText("タグの名前"), "あ");
  },
};
