"use client";

import "client-only";

import clsx from "clsx";
import React, { useMemo } from "react";
import { useQuery } from "urql";

import { getFragment, graphql } from "~/gql";
import {
  Component_ThumbnailFragmentDoc,
  VideoPage_DetailsSectionFragment,
  VideoPage_DetailsSectionFragmentDoc,
  VideoPage_UpstreamDetailsSectionDocument,
} from "~/gql/graphql";

import { Thumbnail } from "../common/Thumbnail";
import { LikeButton } from "./LikeButton";

graphql(`
  fragment VideoPage_DetailsSection on Video {
    id
    title
    ...Component_Thumbnail
  }

  query VideoPage_UpstreamDetailsSection($id: ID!) {
    video(id: $id) {
      id
      ...VideoPage_DetailsSection
    }
  }
`);

export const DetailsSection: React.FC<{
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
  const { id: videoId, title } = video;

  return (
    <section className={clsx(className, ["flex", ["flex-row"]], ["gap-x-8"])}>
      <Thumbnail
        fragment={getFragment(Component_ThumbnailFragmentDoc, video)}
        className={clsx(["w-72"], ["h-48"], ["border", "border-slate-400"])}
        width={512}
        height={384}
      />
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
