"use client";

import { ResultOf } from "@graphql-typed-document-node/core";
import clsx from "clsx";
import React from "react";
import { useQuery } from "urql";

import CommonTagLink from "~/components/CommonTagLink";
import { InfiniteVideosGrid } from "~/components/InfiniteVideoGrid";
import { FetcherContainer } from "~/components/InfiniteVideoGrid";
import { VideoThumbnail } from "~/components/VideoThumbnail";
import { FragmentType, graphql, useFragment } from "~/gql";

import { MadPageLink } from "../../(v2)/mads/[serial]/Link";

export const VideoGrid: React.FC<{ initAfter?: string }> = ({ initAfter }) => (
  <InfiniteVideosGrid
    initAfter={initAfter}
    Fetcher={(props) => <Fetcher {...props} />}
  />
);

const Query = graphql(`
  query RecentVideosPage_VideosGrid_Block($first: Int!, $after: String) {
    findVideos(first: $first, after: $after) {
      nodes {
        id
        ...RecentVideosPage_VideosGrid_Video
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
`);
const Fetcher: React.FC<{
  after?: string;
  pushAfter(after: string): void;
}> = ({ after, pushAfter }) =>
  FetcherContainer<ResultOf<typeof Query>["findVideos"]["nodes"][number]>({
    pushAfter,
    useQuery() {
      const [{ data, fetching }] = useQuery({
        query: Query,
        variables: { first: 12, after },
      });
      return {
        fetching,
        data: {
          nodes: data?.findVideos.nodes,
          pageInfo: data?.findVideos.pageInfo,
        },
      };
    },
    Item({ node }) {
      return <Video fragment={node} />;
    },
  });

const Fragment = graphql(`
  fragment RecentVideosPage_VideosGrid_Video on Video {
    ...Link_Video
    ...VideoThumbnail
    title
    thumbnailUrl
    taggings(first: 3) {
      nodes {
        id
        tag {
          ...CommonTagLink
        }
      }
    }
  }
`);
const Video: React.FC<{
  className?: string;
  fragment: FragmentType<typeof Fragment>;
}> = ({ className, ...props }) => {
  const fragment = useFragment(Fragment, props.fragment);
  return (
    <div
      className={clsx(
        className,
        ["relative"],
        ["overflow-hidden"],
        ["rounded"],
        ["border"],
        ["px-2"],
        ["py-2"],
        ["flex", "flex-col"]
      )}
    >
      <MadPageLink className={clsx(["flex"])} fragment={fragment}>
        <VideoThumbnail
          fragment={fragment}
          className={clsx(["w-full"], ["h-32"])}
          imageSize="medium"
        />
      </MadPageLink>
      <div className={clsx(["mt-1"])}>
        <MadPageLink
          fragment={fragment}
          className={clsx(["text-sm"], ["font-bold"], ["text-slate-900"])}
        >
          {fragment.title}
        </MadPageLink>
      </div>
      <div className={clsx(["mt-1"])}>
        {fragment.taggings.nodes.length === 0 && (
          <div className={clsx(["text-xxs"], ["text-slate-500"])}>
            タグ付けがありません
          </div>
        )}
        <div
          className={clsx(
            ["flex"],
            ["flex-wrap"],
            ["gap-x-0.5"],
            ["gap-y-0.5"]
          )}
        >
          {fragment.taggings.nodes.map((tagging) => (
            <CommonTagLink key={tagging.id} size="xs" fragment={tagging.tag} />
          ))}
        </div>
      </div>
    </div>
  );
};
