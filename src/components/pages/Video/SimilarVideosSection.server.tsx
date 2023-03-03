import "server-only";

import clsx from "clsx";
import React from "react";

import { VideoList } from "~/components/common/VideoList";
import { graphql, useFragment } from "~/gql";
import { fetchGql } from "~/gql/fetch";
import {
  VideoList_VideoFragmentDoc,
  VideoPage_SimilarVideosSectionFragmentDoc,
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
`);
export const SimilarVideosSection = async ({
  className,
  videoId,
}: {
  className?: string;
  videoId: string;
}) => {
  const { getVideo } = await fetchGql(
    graphql(`
      query VideoPage_SimilarVideosSection($id: ID!) {
        getVideo(id: $id) {
          id
          ...VideoPage_SimilarVideosSection
        }
      }
    `),
    { id: videoId },
    { next: { revalidate: 0 } }
  );

  const videos = useFragment(
    VideoPage_SimilarVideosSectionFragmentDoc,
    getVideo
  ).similarVideos.items.map(({ to }) =>
    useFragment(VideoList_VideoFragmentDoc, to)
  );

  return (
    <section className={clsx(className)}>
      <h2 className={clsx(["text-xl"], ["text-slate-900"])}>似ている動画</h2>
      <VideoList className={clsx(["mt-2"])} videos={videos} />
    </section>
  );
};
