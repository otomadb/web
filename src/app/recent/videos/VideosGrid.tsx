"use client";

import { ResultOf } from "@graphql-typed-document-node/core";
import clsx from "clsx";
import Image from "next/image";
import React from "react";
import { useQuery } from "urql";

import { LinkTag } from "~/app/tags/[serial]/Link";
import { LinkVideo } from "~/app/videos/[serial]/Link";
import { InfiniteVideosGrid } from "~/components/common/InfiniteVideoGrid";
import { FetcherContainer } from "~/components/common/InfiniteVideoGrid";
import { CommonTag } from "~/components/common/Tag";
import { VideoThumbnail } from "~/components/common/VideoThumbnail";
import { FragmentType, getFragment, graphql } from "~/gql";

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
          ...CommonTag
          ...Link_Tag
        }
      }
    }
  }
`);
const Video: React.FC<{
  className?: string;
  fragment: FragmentType<typeof Fragment>;
}> = ({ className, ...props }) => {
  const fragment = getFragment(Fragment, props.fragment);
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
      <Image
        className={clsx(
          ["-z-1"],
          ["blur-sm", "scale-125", "contrast-75"],
          ["opacity-25"],
          ["absolute"],
          ["inset-0"],
          ["w-full", "h-full"],
          ["object-cover"]
        )}
        src={fragment.thumbnailUrl}
        width={512}
        height={384}
        alt={fragment.title}
      />
      <LinkVideo className={clsx(["flex"])} fragment={fragment}>
        <VideoThumbnail
          fragment={fragment}
          className={clsx(["w-full"], ["h-32"])}
          width={256}
          height={192}
        />
      </LinkVideo>
      <div className={clsx(["mt-1"])}>
        <LinkVideo
          fragment={fragment}
          className={clsx(["text-sm"], ["font-bold"], ["text-slate-900"])}
        >
          {fragment.title}
        </LinkVideo>
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
            <LinkTag
              key={tagging.id}
              fragment={tagging.tag}
              className={clsx(["flex"])}
            >
              <CommonTag
                fragment={tagging.tag}
                className={clsx(["text-xxs"], ["px-1"], ["py-0.5"])}
              />
            </LinkTag>
          ))}
        </div>
      </div>
    </div>
  );
};
