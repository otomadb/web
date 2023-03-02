import clsx from "clsx";
import React from "react";

import { LinkVideo } from "~/app/videos/[serial]/Link";
import { VideoThumbnail } from "~/components/common/VideoThumbnail";
import { FragmentType, getFragment, graphql } from "~/gql";

const Fragment = graphql(`
  fragment VideoGrid_Item on Video {
    ...Link_Video
    ...VideoThumbnail
    title
  }
`);
export const VideoCmp: React.FC<{
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

const FFF = graphql(`
  fragment VideoGrid on VideoConnection {
    nodes {
      id
      ...VideoGrid_Item
    }
  }
`);
export const VideoGrid: React.FC<{
  className?: string;
  fragment: FragmentType<typeof FFF>;
}> = ({ className, ...props }) => {
  const fragment = getFragment(FFF, props.fragment);
  return (
    <div className={clsx(className, ["@container/videolist"])}>
      {fragment.nodes.length === 0 && <span>動画が存在しません。</span>}
      <div
        className={clsx(
          ["w-full"],
          [
            "grid",
            [
              "grid-cols-1",
              "@[384px]/videolist:grid-cols-2",
              "@[512px]/videolist:grid-cols-3",
              "@[768px]/videolist:grid-cols-4",
              "@[1024px]/videolist:grid-cols-6",
              "@[1536px]/videolist:grid-cols-8",
            ],
          ],
          ["gap-x-2", "@[768px]/videolist:gap-x-4"],
          ["gap-y-2", "@[768px]/videolist:gap-x-4"]
        )}
      >
        {fragment.nodes.map((video) => (
          <VideoCmp fragment={video} key={video.id} />
        ))}
      </div>
    </div>
  );
};
