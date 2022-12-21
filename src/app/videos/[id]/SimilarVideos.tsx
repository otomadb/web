"use client";

import "client-only";

import React, { useMemo } from "react";
import { useQuery } from "urql";

import { Inner } from "~/components/Videos/SimilarVideos/Inner";
import { getFragment as useFragment, graphql } from "~/gql";
import {
  VideoPage_SimilarVideosFragmentDoc,
  VideoPage_SimilarVideosSectionDocument,
  VideoPageQuery,
} from "~/gql/graphql";

graphql(`
  query VideoPage_SimilarVideosSection($id: ID!) {
    video(id: $id) {
      id
      ...VideoPage_SimilarVideos
    }
  }
`);

export const SimilarVideos: React.FC<{
  className?: string;
  videoId: string;
  fallback: VideoPageQuery["video"];
}> = ({ fallback, videoId, ...props }) => {
  const [{ data }] = useQuery({
    query: VideoPage_SimilarVideosSectionDocument,
    variables: { id: videoId },
  });
  const similar = useFragment(
    VideoPage_SimilarVideosFragmentDoc,
    useMemo(() => {
      return data?.video || fallback;
    }, [data, fallback])
  );
  return <Inner {...props} videoId={videoId} videos={similar} />;
};
