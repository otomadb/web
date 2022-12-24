import clsx from "clsx";
import Image from "next/image";
import React from "react";

import { LinkVideo } from "~/components/common/Link";

export const VideoList: React.FC<{
  className?: string;
  videos: { id: string; thumbnailUrl: string; title: string }[];
}> = ({ className, videos }) => {
  return (
    <div className={clsx(className)}>
      {videos.length === 0 && <span>動画が存在しません。</span>}
      {0 < videos.length && (
        <div
          className={clsx(
            ["w-full"],
            ["gap-x-4"],
            ["gap-y-4"],
            ["grid", ["grid-cols-3", "md:grid-cols-4", "lg:grid-cols-6"]]
          )}
        >
          {videos.map(({ id, thumbnailUrl, title }) => (
            <div key={id}>
              <LinkVideo videoId={id} className={clsx(["block"])}>
                <Image
                  className={clsx(["w-full"], ["h-auto"], ["rounded-lg"])}
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
                  ["px-1"],
                  ["py-1"],
                  ["text-sm"],
                  ["line-clamp-2"]
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
