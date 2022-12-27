"use client";

import "client-only";

import clsx from "clsx";
import Image from "next/image";
import React, { useMemo } from "react";
import { useQuery } from "urql";

import { getFragment, graphql } from "~/gql";
import {
  VideoPage_DetailsSectionFragment,
  VideoPage_DetailsSectionFragmentDoc,
  VideoPage_UpstreamDetailsSectionDocument,
} from "~/gql/graphql";

import { LikeButton } from "./LikeButton";

graphql(`
  fragment VideoPage_DetailsSection on Video {
    id
    title
    thumbnailUrl
  }

  query VideoPage_UpstreamDetailsSection($id: ID!) {
    video(id: $id) {
      id
      ...VideoPage_DetailsSection
    }
  }
`);

export const Inner: React.FC<{
  className?: string;
  fallback: VideoPage_DetailsSectionFragment;
}> = ({ className, fallback }) => {
  const [{ data }] = useQuery({
    query: VideoPage_UpstreamDetailsSectionDocument,
    variables: { id: fallback.id },
  });
  const upstream = getFragment(
    VideoPage_DetailsSectionFragmentDoc,
    data?.video
  );

  const video = useMemo(() => fallback || upstream, [fallback, upstream]);
  const { id: videoId, thumbnailUrl, title } = video;

  return (
    <section className={clsx(className, ["flex", ["flex-row"]], ["gap-x-8"])}>
      <div
        className={clsx(
          ["border", "border-slate-400"],
          ["flex-shrink-0"],
          ["w-64", "h-48"],
          ["flex", "justify-center"],
          ["relative"],
          ["rounded-lg"],
          ["overflow-hidden"]
        )}
      >
        <Image
          className={clsx(
            ["z-0"],
            ["absolute"],
            ["inset-0"],
            ["w-full", "h-full"],
            ["object-cover", "object-center"],
            ["blur-md", "brightness-75", "scale-125"]
          )}
          src={thumbnailUrl}
          width={512}
          height={384}
          alt={title}
          priority={true}
        />
        <Image
          className={clsx(
            ["z-1"],
            ["relative"],
            ["object-scale-down"],
            ["w-full", "h-auto"]
          )}
          src={thumbnailUrl}
          width={256}
          height={192}
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
