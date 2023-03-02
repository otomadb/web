import clsx from "clsx";
import React from "react";

import { LinkVideo } from "~/app/videos/[serial]/Link";
import { VideoThumbnail } from "~/components/common/VideoThumbnail";
import { FragmentType, getFragment, graphql } from "~/gql";

const Fragment = graphql(`
  fragment InfiniteVideosGrid_Video on Video {
    ...Link_Video
    ...VideoThumbnail
    title
  }
`);
export const Video: React.FC<{
  className?: string;
  fragment: FragmentType<typeof Fragment>;
}> = ({ className, ...props }) => {
  const fragment = getFragment(Fragment, props.fragment);
  return (
    <div className={clsx(className)}>
      <LinkVideo fragment={fragment}>
        <VideoThumbnail
          fragment={fragment}
          className={clsx(["w-full"], ["h-32"], ["border", "border-slate-400"])}
          width={256}
          height={192}
        />
      </LinkVideo>
      <LinkVideo
        fragment={fragment}
        className={clsx(
          ["block"],
          [["px-1"], ["py-1"]],
          ["text-sm", "@[768px]/videolist:text-xs"]
        )}
      >
        {fragment.title}
      </LinkVideo>
    </div>
  );
};
