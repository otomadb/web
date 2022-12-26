import clsx from "clsx";
import Image from "next/image";
import React from "react";

import { LinkVideo } from "~/components/common/Link";
import { graphql } from "~/gql";
import { VideoList_VideoFragment } from "~/gql/graphql";

graphql(`
  fragment VideoList_Video on Video {
    id
    title
    thumbnailUrl
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
                "@[1280px]/videolist:grid-cols-6",
                "@[1536px]/videolist:grid-cols-8",
              ],
            ],
            ["gap-x-2", "@[768px]/videolist:gap-x-4"],
            ["gap-y-2", "@[768px]/videolist:gap-x-4"]
          )}
        >
          {videos.map(({ id, thumbnailUrl, title }) => (
            <div key={id}>
              <LinkVideo
                videoId={id}
                className={clsx(
                  ["block"],
                  ["border", "border-slate-400"],
                  ["flex", "justify-center"],
                  ["rounded-lg"],
                  ["overflow-hidden"],
                  ["relative"]
                )}
              >
                <Image
                  className={clsx(
                    ["absolute"],
                    ["block"],
                    ["inset-0"],
                    ["h-32"],
                    ["z-0"],
                    ["object-cover"],
                    ["object-center"],
                    ["blur-md"],
                    ["brightness-75"],
                    ["scale-125"]
                  )}
                  src={thumbnailUrl}
                  width={512}
                  height={384}
                  quality={2}
                  alt={title}
                  priority={true}
                />
                <Image
                  className={clsx(
                    ["z-1"],
                    ["w-auto"],
                    ["h-32"],
                    ["mx-auto"],
                    ["object-scale-down"]
                  )}
                  src={thumbnailUrl}
                  width={256}
                  height={192}
                  alt={title}
                  priority={true}
                />
              </LinkVideo>
              <LinkVideo
                videoId={id}
                className={clsx(
                  ["block"],
                  [["px-1"], ["py-1"]],
                  ["text-sm", "@[768px]/videolist:text-xs"]
                )}
              >
                {title}
              </LinkVideo>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
