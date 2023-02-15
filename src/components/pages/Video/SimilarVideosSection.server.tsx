import "server-only";

import clsx from "clsx";
import React from "react";

import { VideoList } from "~/components/common/VideoList";
import { getFragment, graphql } from "~/gql";
import {
  VideoList_VideoFragmentDoc,
  VideoPage_SimilarVideosSectionFragmentDoc,
} from "~/gql/graphql";
import { gqlRequest } from "~/utils/gqlRequest";

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
`);

export const SimilarVideosSection = async ({
  className,
  videoId,
}: {
  className?: string;
  videoId: string;
}) => {
  const { video } = await gqlRequest(
    graphql(`
      query VideoPage_SimilarVideosSection($id: ID!) {
        video(id: $id) {
          id
          ...VideoPage_SimilarVideosSection
        }
      }
    `),
    { id: videoId }
  );

  const videos = getFragment(
    VideoPage_SimilarVideosSectionFragmentDoc,
    video
  ).similarVideos.items.map(({ to }) =>
    getFragment(VideoList_VideoFragmentDoc, to)
  );

  return (
    <section className={clsx(className)}>
      <h2 className={clsx(["text-xl"], ["text-slate-900"])}>似ている動画</h2>
      <VideoList className={clsx(["mt-2"])} videos={videos} />
    </section>
  );
};
