import { ResultOf } from "@graphql-typed-document-node/core";
import { Meta, StoryObj } from "@storybook/react";
import { graphql } from "msw";

import { MadPageLinkFragment } from "~/app/[locale]/(application)/mads/[serial]/Link";
import { TagPageLinkFragment } from "~/app/[locale]/(application)/tags/[serial]/Link";
import { UserPageLinkFragment } from "~/app/[locale]/(application)/users/[name]/Link";
import { makeFragmentData } from "~/gql";

import { CommonTagFragment } from "../CommonTag";
import { Fragment as UserIconFragment } from "../UserIcon";
import { Fragment as VideoThumbnailFragment } from "../VideoThumbnail";
import SearchNicovideo, { SearchNicovideoQuery } from "./Nicovideo";

const meta = {
  component: SearchNicovideo,
  args: {
    size: "md",
    style: {
      width: 640,
    },
    sourceId: "sm2057168",
  },
  excludeStories: /^\$handler/,
} as Meta<typeof SearchNicovideo>;
export default meta;

export const $handlerNicovideoLoading = graphql.query(
  SearchNicovideoQuery,
  (req, res, ctx) => res(ctx.delay("infinite"))
);
export const Searching: StoryObj<typeof meta> = {
  name: "検索中",
  parameters: {
    msw: {
      handlers: [$handlerNicovideoLoading],
    },
  },
};

const source: Exclude<
  ResultOf<typeof SearchNicovideoQuery>["findNicovideoVideoSource"],
  undefined | null
> = {
  id: "s1",
  sourceId: "sm2057168",
  video: {
    id: "v1",
    title: "Title 1",
    ...makeFragmentData(
      { title: "Title 1", thumbnailUrl: "/thumbnail.jpg" },
      VideoThumbnailFragment
    ),
    ...makeFragmentData({ serial: 1 }, MadPageLinkFragment),
    taggings: {
      nodes: [
        {
          id: "tagging1",
          tag: {
            id: "t1",
            ...makeFragmentData(
              {
                name: "name 1",
                belongTo: { keyword: "character" },
                explicitParent: null,
              },
              CommonTagFragment
            ),
            ...makeFragmentData({ serial: 1 }, TagPageLinkFragment),
          } as (typeof source)["video"]["taggings"]["nodes"][number]["tag"], // TODO: codegenの制約上ごまかしている
        },
        {
          id: "tagging2",
          tag: {
            id: "t2",
            ...makeFragmentData(
              {
                name: "name 2",
                belongTo: { keyword: "character" },
                explicitParent: null,
              },
              CommonTagFragment
            ),
            ...makeFragmentData({ serial: 2 }, TagPageLinkFragment),
          } as (typeof source)["video"]["taggings"]["nodes"][number]["tag"], // TODO: codegenの制約上ごまかしている
        },
      ],
    },
  } as (typeof source)["video"], // TODO: codegenの制約上ごまかしている
};
const request: Exclude<
  ResultOf<typeof SearchNicovideoQuery>["findNicovideoRegistrationRequest"],
  undefined | null
> = {
  id: "r1",
  sourceId: "sm2057168",
  title: "Title 1",
  thumbnailUrl: "/960x540.jpg",
  requestedBy: {
    id: "u1",
    name: "user1",
    ...makeFragmentData(
      { displayName: "User 1", icon: "/icon.png" },
      UserIconFragment
    ),
    ...makeFragmentData({ name: "user1" }, UserPageLinkFragment),
  } as (typeof request)["requestedBy"], // TODO: codegenの制約上ごまかしている
};
export const $handlerSourceAndRequests = graphql.query(
  SearchNicovideoQuery,
  (req, res, ctx) =>
    res(
      ctx.data({
        findNicovideoVideoSource: source,
        findNicovideoRegistrationRequest: request,
      })
    )
);
export const SourceAndRequest: StoryObj<typeof meta> = {
  name: "動画ソースとリクエストの両方がある",
  parameters: { msw: { handlers: [$handlerSourceAndRequests] } },
};

export const $handlerSourceAndNoRequest = graphql.query(
  SearchNicovideoQuery,
  (req, res, ctx) =>
    res(
      ctx.data({
        findNicovideoVideoSource: source,
        findNicovideoRegistrationRequest: null,
      })
    )
);
export const SourceAndNoRequest: StoryObj<typeof meta> = {
  name: "動画ソースはあるがリクエストは無い",
  parameters: { msw: { handlers: [$handlerSourceAndNoRequest] } },
};

export const $handlerNoSourceAndRequest = graphql.query(
  SearchNicovideoQuery,
  (req, res, ctx) =>
    res(
      ctx.data({
        findNicovideoVideoSource: null,
        findNicovideoRegistrationRequest: request,
      })
    )
);
export const NoSourceAndRequest: StoryObj<typeof meta> = {
  name: "動画ソースは無いがリクエストがある",
  parameters: { msw: { handlers: [$handlerNoSourceAndRequest] } },
};

export const $handlerNoSourceAndNoRequest = graphql.query(
  SearchNicovideoQuery,
  (req, res, ctx) =>
    res(
      ctx.data({
        findNicovideoVideoSource: null,
        findNicovideoRegistrationRequest: null,
      })
    )
);
export const NoSourceAndNoRequest: StoryObj<typeof meta> = {
  name: "動画ソースもリクエストも両方ない",
  parameters: { msw: { handlers: [$handlerNoSourceAndNoRequest] } },
};
