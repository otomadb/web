import { css } from "@emotion/css";
import { action } from "@storybook/addon-actions";
import { Meta, StoryObj } from "@storybook/react";
import { screen, userEvent } from "@storybook/testing-library";
import { graphql } from "msw";
import {
  createClient as createUrqlClient,
  Provider as UrqlProvider,
} from "urql";

import { aTag, VideoPage_TagEditor_SearchBoxDocument } from "~/gql/graphql";

import { TagAdder } from "./TagAdder";

export default {
  component: TagAdder,
  args: {
    className: css`
      width: 240px;
    `,
    handleSelect() {
      action("select-tag");
    },
  },
  render(args) {
    return (
      <UrqlProvider value={createUrqlClient({ url: "/graphql" })}>
        <TagAdder {...args} />
      </UrqlProvider>
    );
  },
} as Meta<typeof TagAdder>;

export const Primary: StoryObj<typeof TagAdder> = {
  parameters: {
    msw: {
      handlers: [
        graphql.query(VideoPage_TagEditor_SearchBoxDocument, (req, res, ctx) =>
          res(
            ctx.data({
              searchTags: {
                result: [
                  {
                    matchedName: "タグ1",
                    tag: aTag({
                      id: "tag:1",
                      name: "タグ1",
                      explicitParent: undefined,
                    }),
                  },
                  {
                    matchedName: "タグ2",
                    tag: aTag({
                      id: "tag:2",
                      name: "タグ2",
                      canTagTo: false,
                      explicitParent: undefined,
                    }),
                  },
                  {
                    matchedName: "タグ3",
                    tag: aTag({
                      id: "tag:3",
                      name: "Tag3",
                      explicitParent: undefined,
                    }),
                  },
                  {
                    matchedName: "後藤ひとり",
                    tag: aTag({
                      id: "tag:4",
                      name: "後藤ひとり",
                      explicitParent: aTag({ name: "ぼっち・ざ・ろっく！" }),
                    }),
                  },
                ],
              },
            })
          )
        ),
      ],
    },
  },
};

export const Searching: StoryObj<typeof TagAdder> = {
  name: "検索中",
  parameters: {
    msw: {
      handlers: [
        graphql.query(VideoPage_TagEditor_SearchBoxDocument, (req, res, ctx) =>
          res(ctx.delay("infinite"))
        ),
      ],
    },
  },
  play: async () => {
    await userEvent.type(screen.getByLabelText("タグの名前を入力"), "ドナルド");
  },
};
