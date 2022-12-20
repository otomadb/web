"use client";

import "client-only";

import clsx from "clsx";
import React, { useMemo } from "react";
import { useQuery } from "urql";

import { SectionInner } from "~/components/Videos/Tags/SectionInner";
import { getFragment as useFragment, graphql } from "~/gql";
import {
  VideoPage_TagsSectionDocument,
  VideoPage_VideoTagsFragmentDoc,
  VideoPageQuery,
} from "~/gql/graphql";

graphql(`
  query VideoPage_TagsSection($id: ID!) {
    video(id: $id) {
      id
      ...VideoPage_VideoTags
      ...VideoPage_VideoSimilarVideos
    }
  }
`);

export const Tags: React.FC<{
  className?: string;
  videoId: string;
  fallback: VideoPageQuery["video"];
}> = ({ className, videoId, fallback }) => {
  const [{ data }] = useQuery({
    query: VideoPage_TagsSectionDocument,
    variables: { id: videoId },
  });
  const tags = useFragment(
    VideoPage_VideoTagsFragmentDoc,
    useMemo(() => data?.video || fallback, [data?.video, fallback])
  );

  return (
    <SectionInner className={clsx(className)} videoId={videoId} tags={tags} />
  );
};
