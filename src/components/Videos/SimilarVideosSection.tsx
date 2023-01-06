"use client";

import "client-only";

import clsx from "clsx";
import React, { useMemo } from "react";
import { useQuery } from "urql";

import { VideoList } from "~/components/common/VideoList";
import { getFragment as useFragment, graphql } from "~/gql";
import {
  VideoList_VideoFragmentDoc,
  VideoPage_SimilarVideosSectionFragment,
  VideoPage_SimilarVideosSectionFragmentDoc,
  VideoPage_UpstreamSimilarVideosSectionDocument,
} from "~/gql/graphql";

graphql(`
  fragment VideoPage_SimilarVideosSection on Video {
    id
    similarVideos(input: { limit: 12 }) {
      items {
        to {
          ...VideoList_Video
        }
      }
    }
  }

  query VideoPage_UpstreamSimilarVideosSection($id: ID!) {
    video(id: $id) {
      id
      ...VideoPage_SimilarVideosSection
    }
  }
`);

export const SimilarVideosSection: React.FC<{
  className?: string;
  fallback: VideoPage_SimilarVideosSectionFragment;
}> = ({ className, fallback }) => {
  const [{ data }] = useQuery({
    query: VideoPage_UpstreamSimilarVideosSectionDocument,
    variables: { id: fallback.id },
  });
  const upstream = useFragment(
    VideoPage_SimilarVideosSectionFragmentDoc,
    data?.video
  );

  const video = useMemo(() => upstream || fallback, [fallback, upstream]);
  const { similarVideos } = video;

  const videos = similarVideos.items.map(({ to }) =>
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useFragment(VideoList_VideoFragmentDoc, to)
  );

  return (
    <section className={clsx(className)}>
      <h2 className={clsx(["text-xl"], ["text-slate-900"])}>似ている動画</h2>
      <VideoList className={clsx(["mt-2"])} videos={videos} />
    </section>
  );
};
