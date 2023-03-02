import "server-only";

import clsx from "clsx";
import React from "react";

import { LinkVideoEvents } from "~/app/videos/[serial]/events/Link";
import { VideoThumbnail } from "~/components/common/Thumbnail";
import { graphql } from "~/gql";
import { VideoPage_DetailsSectionFragment } from "~/gql/graphql";

import { LikeButton } from "./LikeButton";

graphql(`
  fragment VideoPage_DetailsSection on Video {
    ...VideoThumbnail
    id
    title
    ...Link_VideoEvents
  }
`);

export const DetailsSection: React.FC<{
  className?: string;
  fragment: VideoPage_DetailsSectionFragment;
}> = ({ className, fragment }) => {
  return (
    <section className={clsx(className, ["flex", ["flex-row"]], ["gap-x-8"])}>
      <VideoThumbnail
        fragment={fragment}
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
          {fragment.title}
        </h1>
        <LikeButton className={clsx(["mt-2"])} videoId={fragment.id} />
        <LinkVideoEvents fragment={fragment}>編集履歴を見る</LinkVideoEvents>
      </div>
    </section>
  );
};
