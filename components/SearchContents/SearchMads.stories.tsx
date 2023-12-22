import { Meta, StoryObj } from "@storybook/react";
import { graphql } from "msw";

import { MadPageLinkFragment } from "~/app/[locale]/(application)/mads/[serial]/Link";
import { makeFragmentData } from "~/gql";

import { Fragment } from "../VideoThumbnail";
import SearchMads, { SearchMadsQuery } from "./SearchMads";

const meta = {
  component: SearchMads,
  args: {
    size: "md",
    style: {
      width: 640,
    },
  },
  excludeStories: /^\$handler/,
} as Meta<typeof SearchMads>;
export default meta;

export const $handlerMadsSearching = graphql.query(
  SearchMadsQuery,
  (req, res, ctx) => res(ctx.delay("infinite"))
);
export const Searching: StoryObj<typeof meta> = {
  name: "検索中",
  parameters: {
    msw: {
      handlers: [$handlerMadsSearching],
    },
  },
};

export const $handlerSomeMadsHit = graphql.query(
  SearchMadsQuery,
  (req, res, ctx) =>
    res(
      ctx.data({
        searchVideos: {
          items: [
            {
              title: { title: "title1" },
              video: {
                id: "v1",
                title: "Title 1",
                ...makeFragmentData({ serial: 1 }, MadPageLinkFragment),
                ...makeFragmentData(
                  { title: "Title 1", thumbnailUrl: "/thumbnail.jpg" },
                  Fragment
                ),
              } as any, // eslint-disable-line @typescript-eslint/no-explicit-any -- codegenが悪い
            },
            {
              title: { title: "title2" },
              video: {
                id: "v2",
                title: "Title 2",
                ...makeFragmentData({ serial: 2 }, MadPageLinkFragment),
                ...makeFragmentData(
                  { title: "Title 2", thumbnailUrl: "/thumbnail.jpg" },
                  Fragment
                ),
              } as any, // eslint-disable-line @typescript-eslint/no-explicit-any -- codegenが悪い
            },
          ],
        },
      })
    )
);
export const SomeMadsHit: StoryObj<typeof meta> = {
  name: "何件かヒットした場合",
  parameters: { msw: { handlers: [$handlerSomeMadsHit] } },
};

export const NoMatch: StoryObj<typeof meta> = {
  name: "何もヒットしない場合",
  parameters: {
    msw: {
      handlers: [
        graphql.query(SearchMadsQuery, (req, res, ctx) =>
          res(ctx.data({ searchVideos: { items: [] } }))
        ),
      ],
    },
  },
};
