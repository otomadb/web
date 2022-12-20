"use client";

import "client-only";

import clsx from "clsx";
import Image from "next/image";
import React, { useMemo } from "react";
import { useQuery } from "urql";

import { VideoLink } from "~/components/common/Link";
import { getFragment, graphql } from "~/gql";
import {
  VideoPage_SimilarVideosSectionDocument,
  VideoPage_VideoSimilarVideosFragment,
  VideoPage_VideoSimilarVideosFragmentDoc,
  VideoPageQuery,
} from "~/gql/graphql";

graphql(`
  fragment VideoPage_VideoSimilarVideos on Video {
    similarVideos(input: { limit: 12 }) {
      items {
        video {
          id
          title
          thumbnailUrl
        }
      }
    }
  }
`);

export const Sct: React.FC<{
  className?: string;
  videoId: string;
  fallback: VideoPageQuery["video"];
}> = ({ className, fallback, videoId }) => {
  const [{ data }] = useQuery({
    query: VideoPage_SimilarVideosSectionDocument,
    variables: { id: videoId },
  });

  const similar = getFragment(
    VideoPage_VideoSimilarVideosFragmentDoc,
    useMemo(() => {
      return data?.video || fallback;
    }, [data, fallback])
  );
  return (
    <SectionInner className={clsx(className)} videoId={videoId} tags={tags} />
  );
};

export const SectionInner: React.FC<{
  className?: string;
  videoId: string;
  videos: VideoPage_VideoSimilarVideosFragment;
}> = ({ className, videoId, videos }) => {
  return (
    <div
      className={clsx(
        className,
        ["grid"],
        ["grid-cols-2", "md:grid-cols-3", "lg:grid-cols-6"],
        ["gap-x-4"],
        ["gap-y-2"]
      )}
    >
      {videos.similarVideos.items.map(
        ({ video: { id, title, thumbnailUrl } }) => (
          <div key={id}>
            <VideoLink videoId={id} className={clsx(["block"])}>
              <Image
                className={clsx(["w-full"], ["h-auto"], ["rounded-lg"])}
                src={thumbnailUrl}
                width={256}
                height={192}
                alt={title}
                priority={true}
              />
            </VideoLink>
            <VideoLink
              videoId={id}
              className={clsx(
                ["block"],
                ["px-1"],
                ["py-1"],
                ["text-xs"],
                ["line-clamp-2"]
              )}
            >
              {title}
            </VideoLink>
          </div>
        )
      )}
    </div>
  );
};
