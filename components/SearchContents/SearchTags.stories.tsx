import { Meta, StoryObj } from "@storybook/react";
import { graphql } from "msw";

import { TagPageLinkFragment } from "~/app/(v2)/tags/[serial]/Link";
import { makeFragmentData } from "~/gql";
import { TagType } from "~/gql/graphql";
import { MockedUrqlProvider } from "~/utils/MockedUrqlProvider";

import { CommonTagFragment } from "../CommonTag";
import SearchTags, { SearchTagsQuery } from "./SearchTags";

const meta = {
  component: SearchTags,
  args: {
    size: "md",
    style: {
      width: 640,
    },
  },
  render(args) {
    return (
      <MockedUrqlProvider>
        <SearchTags {...args} />
      </MockedUrqlProvider>
    );
  },
  excludeStories: /^\$handler/,
} as Meta<typeof SearchTags>;
export default meta;

export const $handlerTagsSearching = graphql.query(
  SearchTagsQuery,
  (req, res, ctx) => res(ctx.delay("infinite"))
);
export const Loading: StoryObj<typeof meta> = {
  name: "検索中",
  parameters: {
    msw: {
      handlers: [$handlerTagsSearching],
    },
  },
};

export const $handlerSomeTagsHit = graphql.query(
  SearchTagsQuery,
  (req, res, ctx) =>
    res(
      ctx.data({
        searchTags: {
          items: [
            {
              name: { name: "name1" },
              tag: {
                ...makeFragmentData({ serial: 1 }, TagPageLinkFragment),
                ...makeFragmentData(
                  {
                    name: "Name 1",
                    type: TagType.Character,
                    explicitParent: null,
                  },
                  CommonTagFragment
                ),
              } as any, // eslint-disable-line @typescript-eslint/no-explicit-any -- codegenが悪い
            },
            {
              name: { name: "name2" },
              tag: {
                ...makeFragmentData({ serial: 2 }, TagPageLinkFragment),
                ...makeFragmentData(
                  {
                    name: "Name 2",
                    type: TagType.Character,
                    explicitParent: null,
                  },
                  CommonTagFragment
                ),
              } as any, // eslint-disable-line @typescript-eslint/no-explicit-any -- codegenが悪い
            },
          ],
        },
      })
    )
);
export const SomeTagsHit: StoryObj<typeof meta> = {
  name: "何件かヒットした場合",
  parameters: { msw: { handlers: [$handlerSomeTagsHit] } },
};

export const NoTagsHit: StoryObj<typeof meta> = {
  name: "何もヒットしない場合",
  parameters: {
    msw: {
      handlers: [
        graphql.query(SearchTagsQuery, (req, res, ctx) =>
          res(ctx.data({ searchTags: { items: [] } }))
        ),
      ],
    },
  },
};
