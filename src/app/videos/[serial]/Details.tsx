import clsx from "clsx";
import React from "react";

import { LinkVideoEvents } from "~/app/videos/[serial]/events/Link";
import { VideoThumbnail } from "~/components/common/VideoThumbnail";
import { FragmentType, getFragment as useFragment, graphql } from "~/gql";

import { LikeButton } from "./LikeButton";

export const Fragment = graphql(`
  fragment VideoPage_DetailsSection on Video {
    ...VideoThumbnail
    ...Link_VideoEvents
    id
    title
    nicovideoSources {
      id
      sourceId
      embedUrl
    }
  }
`);
export const Details: React.FC<{
  className?: string;
  fragment: FragmentType<typeof Fragment>;
}> = ({ className, ...props }) => {
  const fragment = useFragment(Fragment, props.fragment);
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
