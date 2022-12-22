"use client";

import "client-only";

import React, { useMemo } from "react";
import { useQuery } from "urql";

import { Inner } from "~/components/Videos/Semitags/Inner";
import { getFragment as useFragment, graphql } from "~/gql";
import {
  VideoPage_SemitagsFragmentDoc,
  VideoPage_SemitagsSectionDocument,
  VideoPageQuery,
} from "~/gql/graphql";

graphql(`
  query VideoPage_SemitagsSection($id: ID!) {
    video(id: $id) {
      id
      ...VideoPage_Semitags
    }
  }
`);

export const Semitags: React.FC<{
  className?: string;
  fallback: VideoPageQuery["video"];
}> = ({ fallback, ...props }) => {
  const [{ data }] = useQuery({
    query: VideoPage_SemitagsSectionDocument,
    variables: { id: fallback.id },
  });
  const tags = useFragment(
    VideoPage_SemitagsFragmentDoc,
    useMemo(() => data?.video || fallback, [data?.video, fallback])
  );
  return <Inner {...props} videoId={fallback.id} tags={tags} />;
};
