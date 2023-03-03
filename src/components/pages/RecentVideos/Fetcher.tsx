"use client";

import { ResultOf } from "@graphql-typed-document-node/core";
import clsx from "clsx";
import React from "react";
import { useQuery } from "urql";

import { LinkVideo } from "~/app/videos/[serial]/Link";
import { FetcherContainer } from "~/components/common/InfiniteVideoGrid";
import { VideoThumbnail } from "~/components/common/VideoThumbnail";
import { FragmentType, getFragment, graphql } from "~/gql";

const Query = graphql(`
  query InfiniteVideosGrid_FetchBlock($first: Int!, $after: String) {
    findVideos(first: $first, after: $after) {
      nodes {
        id
        ...InfiniteVideosGrid_Video
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
`);
export const Fetcher: React.FC<{
  after?: string;
  pushAfter(after: string): void;
}> = ({ after, pushAfter }) =>
  FetcherContainer<ResultOf<typeof Query>["findVideos"]["nodes"]>({
    pushAfter,
    useQuery() {
      const [{ data }] = useQuery({
        query: Query,
        variables: { first: 12, after },
      });
      return {
        nodes: data?.findVideos.nodes,
        pageInfo: data?.findVideos.pageInfo,
      };
    },
    Presentation({ nodes }) {
      return (
        <>
          {nodes.map((node) => (
            <Video key={node.id} fragment={node} />
          ))}
        </>
      );
    },
  });

const Fragment = graphql(`
  fragment InfiniteVideosGrid_Video on Video {
    ...Link_Video
    ...VideoThumbnail
    title
  }
`);
const Video: React.FC<{
  className?: string;
  fragment: FragmentType<typeof Fragment>;
}> = ({ className, ...props }) => {
  const fragment = getFragment(Fragment, props.fragment);
  return (
    <div className={clsx(className)}>
      <LinkVideo fragment={fragment}>
        <VideoThumbnail
          fragment={fragment}
          className={clsx(["w-full"], ["h-32"], ["border", "border-slate-400"])}
          width={256}
          height={192}
        />
      </LinkVideo>
      <LinkVideo
        fragment={fragment}
        className={clsx(
          ["block"],
          [["px-1"], ["py-1"]],
          ["text-sm", "@[768px]/videolist:text-xs"]
        )}
      >
        {fragment.title}
      </LinkVideo>
    </div>
  );
};
