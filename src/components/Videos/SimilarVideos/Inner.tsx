"use client";

import "client-only";

import clsx from "clsx";
import Image from "next/image";
import React from "react";

import { VideoLink } from "~/components/common/Link";
import { graphql } from "~/gql";
import { VideoPage_SimilarVideosFragment } from "~/gql/graphql";

graphql(`
  fragment VideoPage_SimilarVideos on Video {
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

export const Inner: React.FC<{
  className?: string;
  videoId: string;
  videos: VideoPage_SimilarVideosFragment;
}> = ({ className, videos }) => {
  return (
    <section className={clsx(className)}>
      <h2 className={clsx(["text-xl"], ["text-slate-900"])}>似ている動画</h2>
      <div
        className={clsx(
          ["mt-2"],
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
    </section>
  );
};
