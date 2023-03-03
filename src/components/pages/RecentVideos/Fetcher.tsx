"use client";

import React, { useEffect, useMemo } from "react";
import { useIntersection } from "react-use";
import { useQuery } from "urql";

import { graphql } from "~/gql";

import { Block } from "./Block";

export const Fetcher: React.FC<{
  after?: string;
  pushAfter(after: string): void;
}> = ({ after, pushAfter }) => {
  const [{ data, fetching }] = useQuery({
    query: graphql(`
      query InfiniteVideosGrid_FetchBlock($first: Int!, $after: String) {
        findVideos(first: $first, after: $after) {
          ...InfiniteVideosGrid_Block
          pageInfo {
            hasNextPage
            endCursor
          }
        }
      }
    `),
    variables: { first: 24, after },
  });

  const intersectionRef = React.useRef(null);
  const intersection = useIntersection(intersectionRef, { threshold: 1 });
  const readnext = useMemo(
    () => !fetching && (!intersection || 1 <= intersection.intersectionRatio),
    [fetching, intersection]
  );
  useEffect(() => {
    if (
      readnext &&
      data?.findVideos.pageInfo.hasNextPage &&
      data.findVideos.pageInfo.endCursor
    ) {
      pushAfter(data.findVideos.pageInfo.endCursor);
    }
  }, [data, pushAfter, readnext]);

  return (
    <div>
      {data && <Block fragment={data.findVideos} />}
      {!readnext && (
        <div ref={intersectionRef}>
          <span>LOADING</span>
        </div>
      )}
    </div>
  );
};
