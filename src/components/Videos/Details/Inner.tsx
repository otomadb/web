import clsx from "clsx";
import Image from "next/image";
import React from "react";

import { graphql } from "~/gql";
import { VideoPage_DetailsFragment } from "~/gql/graphql";

import { LikeButton } from "./LikeButton";

graphql(`
  fragment VideoPage_Details on Video {
    title
    thumbnailUrl
  }
`);

export const Inner: React.FC<{
  className?: string;
  videoId: string;
  details: VideoPage_DetailsFragment;
}> = ({ className, videoId, details }) => {
  const { thumbnailUrl, title } = details;

  return (
    <section
      className={clsx(
        className,
        ["flex", ["flex-col", "lg:flex-row"]],
        ["gap-x-4"]
      )}
    >
      <div>
        <Image
          className={clsx(["object-scale-down"], ["h-40"])}
          src={thumbnailUrl}
          width={260}
          height={200}
          alt={title}
          priority={true}
        />
      </div>
      <div className={clsx(["flex-grow"], ["py-2"])}>
        <h1
          className={clsx(
            ["text-lg", "lg:text-xl"],
            ["font-bold"],
            ["text-slate-900"]
          )}
        >
          {title}
        </h1>
        <LikeButton className={clsx(["mt-2"])} videoId={videoId} />
      </div>
    </section>
  );
};
