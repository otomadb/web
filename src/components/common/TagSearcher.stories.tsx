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
  aSearchTagsPayload,
  aTag,
  aTagName,
  aTagSearchItemByName,
  TagSearcher_SearchDocument,
  TagType,
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
        graphql.query(TagSearcher_SearchDocument, (req, res, ctx) =>
          res(
            ctx.data({
              searchTags: aSearchTagsPayload({
                items: [
                  aTagSearchItemByName({
                    name: aTagName({
                      name: "後藤ひとり",
                    }),
                    tag: aTag({
                      id: `tag:1`,
                      name: "後藤ひとり",
                      type: TagType.Character,
                      explicitParent: aTag({
                        id: "tag_2",
                        name: "ぼっち・ざ・ろっく！",
                      }),
                    }),
                  }),
                  aTagSearchItemByName({
                    name: aTagName({
                      name: "ぼっち・ざ・ろっく！",
                    }),
                    tag: aTag({
                      id: `tag:2`,
                      name: "ぼっち・ざ・ろっく！",
                      type: TagType.Copyright,
                      explicitParent: null,
                    }),
                  }),
                  aTagSearchItemByName({
                    name: aTagName({
                      name: "ドナルド",
                    }),
                    tag: aTag({
                      id: `tag:3`,
                      name: "ドナルド・マクドナルド",
                      type: TagType.Character,
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

export const SomethingInput: StoryObj<typeof TagSearcher> = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.type(canvas.getByPlaceholderText("タグの名前"), "あ");
  },
};

export const Searching: StoryObj<typeof TagSearcher> = {
  args: {},
  parameters: {
    layout: "centered",
    msw: {
      handlers: [
        graphql.query(TagSearcher_SearchDocument, (req, res, ctx) =>
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

export const Nothing: StoryObj<typeof TagSearcher> = {
  args: {},
  parameters: {
    layout: "centered",
    msw: {
      handlers: [
        graphql.query(TagSearcher_SearchDocument, (req, res, ctx) =>
          res(
            ctx.data({
              searchTags: aSearchTagsPayload({
                items: [],
              }),
            })
          )
        ),
      ],
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.type(canvas.getByPlaceholderText("タグの名前"), "あ");
  },
};

export const Select: StoryObj<typeof TagSearcher> = {
  args: {},
  parameters: {
    layout: "centered",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.type(canvas.getByPlaceholderText("タグの名前"), "あ");

    const items = await canvas.findAllByLabelText("検索候補");
    await userEvent.click(items[0]);
  },
};
