"use client";

import "client-only";

import React, { useMemo } from "react";
import { useQuery } from "urql";

import { Inner } from "~/components/Videos/VideoDetails/Inner";
import { getFragment as useFragment, graphql } from "~/gql";
import {
  VideoPage_DetailsFragmentDoc,
  VideoPage_DetailsSectionDocument,
  VideoPageQuery,
} from "~/gql/graphql";

graphql(`
  query VideoPage_DetailsSection($id: ID!) {
    video(id: $id) {
      id
      ...VideoPage_Details
    }
  }
`);

export const Details: React.FC<{
  className?: string;
  videoId: string;
  fallback: VideoPageQuery["video"];
}> = ({ fallback, videoId, ...props }) => {
  const [{ data }] = useQuery({
    query: VideoPage_DetailsSectionDocument,
    variables: { id: videoId },
  });
  const details = useFragment(
    VideoPage_DetailsFragmentDoc,
    useMemo(() => {
      return data?.video || fallback;
    }, [data, fallback])
  );
  return <Inner {...props} videoId={videoId} details={details} />;
};
