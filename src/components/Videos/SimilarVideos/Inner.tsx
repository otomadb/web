"use client";

import "client-only";

import clsx from "clsx";
import React from "react";

import { VideoList } from "~/components/common/VideoList";
import { getFragment, graphql } from "~/gql";
import {
  VideoList_VideoFragmentDoc,
  VideoPage_SimilarVideosFragment,
} from "~/gql/graphql";

graphql(`
  fragment VideoPage_SimilarVideos on Video {
    similarVideos(input: { limit: 12 }) {
      items {
        video {
          ...VideoList_Video
        }
      }
    }
  }
`);

export const Inner: React.FC<{
  className?: string;
  videoId: string;
  videos: VideoPage_SimilarVideosFragment;
}> = ({ className, videos }) => {
  const similarVideos = getFragment(
    VideoList_VideoFragmentDoc,
    videos.similarVideos.items.map(({ video }) => video)
  );

  return (
    <section className={clsx(className)}>
      <h2 className={clsx(["text-xl"], ["text-slate-900"])}>似ている動画</h2>
      <VideoList className={clsx(["mt-2"])} videos={similarVideos} />
    </section>
  );
};
