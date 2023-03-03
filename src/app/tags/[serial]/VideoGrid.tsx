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

export const VideoGrid: React.FC<{ tagId: string; initAfter?: string }> = ({
  tagId,
  initAfter,
}) => (
  <InfiniteVideosGrid
    initAfter={initAfter}
    Fetcher={(props) => <Fetcher tagId={tagId} {...props} />}
  />
);

const Query = graphql(`
  query TagPage_TaggedVideosGrid_Block(
    $tagId: ID!
    $first: Int!
    $after: String
  ) {
    getTag(id: $tagId) {
      taggedVideos(first: $first, after: $after) {
        nodes {
          id
          video {
            ...TagPage_TaggedVideosGrid_Video
          }
        }
        pageInfo {
          hasNextPage
          endCursor
        }
      }
    }
  }
`);
const Fetcher: React.FC<{
  tagId: string;
  after?: string;
  pushAfter(after: string): void;
}> = ({ tagId, after, pushAfter }) =>
  FetcherContainer<
    ResultOf<typeof Query>["getTag"]["taggedVideos"]["nodes"][number]
  >({
    pushAfter,
    useQuery() {
      const [{ data, fetching }] = useQuery({
        query: Query,
        variables: { tagId, first: 12, after },
      });
      return {
        fetching,
        data: {
          nodes: data?.getTag.taggedVideos.nodes,
          pageInfo: data?.getTag.taggedVideos.pageInfo,
        },
      };
    },
    Item({ node }) {
      return <Video fragment={node.video} />;
    },
  });

const Fragment = graphql(`
  fragment TagPage_TaggedVideosGrid_Video on Video {
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
