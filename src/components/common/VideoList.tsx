import clsx from "clsx";
import React from "react";

import { LinkVideo } from "~/app/videos/[serial]/Link";
import { getFragment, graphql } from "~/gql";
import {
  Component_ThumbnailFragmentDoc,
  Link_VideoFragmentDoc,
  VideoList_VideoFragment,
} from "~/gql/graphql";

import { Thumbnail } from "./Thumbnail";

graphql(`
  fragment VideoList_Video on Video {
    id
    title
    ...Component_Thumbnail
    ...Link_Video
  }
`);

export const VideoList: React.FC<{
  className?: string;
  videos: readonly VideoList_VideoFragment[];
}> = ({ className, videos }) => {
  return (
    <div className={clsx(className, ["@container/videolist"])}>
      {videos.length === 0 && <span>動画が存在しません。</span>}
      {0 < videos.length && (
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
          {videos.map((video) => (
            <div key={video.id}>
              <Thumbnail
                fragment={getFragment(Component_ThumbnailFragmentDoc, video)}
                className={clsx(
                  ["w-full"],
                  ["h-32"],
                  ["border", "border-slate-400"]
                )}
                width={256}
                height={192}
              />
              <LinkVideo
                className={clsx(
                  ["block"],
                  [["px-1"], ["py-1"]],
                  ["text-sm", "@[768px]/videolist:text-xs"]
                )}
                fragment={getFragment(Link_VideoFragmentDoc, video)}
              >
                {video.title}
              </LinkVideo>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
