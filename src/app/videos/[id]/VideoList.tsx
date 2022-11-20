import clsx from "clsx";
import Image from "next/image";
import React from "react";

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
            ["grid", ["grid-cols-4", "md:grid-cols-6", "lg:grid-cols-8"]],
            ["gap-x-4"],
            ["gap-y-4"]
          )}
        >
          {videos.map(({ id, thumbnailUrl, title }) => (
            <a
              className={clsx(
                ["block"],
                ["border"],
                ["shadow-md"],
                ["rounded-md"]
              )}
              key={id}
              href={`/videos/${id}`}
            >
              <div className={clsx(["py-2"])}>
                <Image
                  className={clsx(["object-scale-down"], ["h-auto"])}
                  src={thumbnailUrl}
                  width={180}
                  height={140}
                  alt={title}
                  priority={true}
                />
              </div>
              <div className={clsx(["px-2"], ["py-1"])}>
                <span className={clsx(["block"], ["text-xs"], ["truncate"])}>
                  {title}
                </span>
              </div>
            </a>
          ))}
        </div>
      )}
    </div>
  );
};
