"use client";

import { ResultOf } from "@graphql-typed-document-node/core";
import clsx from "clsx";
import React from "react";
import { useQuery } from "urql";

import { LinkVideo } from "~/app/videos/[serial]/Link";
import { InfiniteVideosGrid } from "~/components/common/InfiniteVideoGrid";
import { FetcherContainer } from "~/components/common/InfiniteVideoGrid";
import { VideoThumbnail } from "~/components/common/VideoThumbnail";
import { FragmentType, getFragment, graphql } from "~/gql";

export const VideoGrid: React.FC<{ initAfter?: string }> = ({ initAfter }) => (
  <InfiniteVideosGrid
    initAfter={initAfter}
    Fetcher={(props) => <Fetcher {...props} />}
  />
);

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
const Fetcher: React.FC<{
  after?: string;
  pushAfter(after: string): void;
}> = ({ after, pushAfter }) =>
  FetcherContainer<ResultOf<typeof Query>["findVideos"]["nodes"][number]>({
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
    Item({ node }) {
      return <Video fragment={node} />;
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
    <div
      className={clsx(className, ["border"], ["rounded"], ["px-2"], ["py-2"])}
    >
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
          className={clsx([["px-1"], ["py-1"]], ["text-xs"])}
        >
          {fragment.title}
        </LinkVideo>
      </div>
    </div>
  );
};
