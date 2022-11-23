import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
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
            ["flex", ["justify-start"], ["flex-wrap"]],
            ["gap-x-4"],
            ["gap-y-4"]
          )}
        >
          {videos.map(({ id, thumbnailUrl, title }) => (
            <Link
              className={clsx(
                ["block"],
                ["border"],
                ["shadow-md"],
                ["rounded-md"],
                ["w-48"]
              )}
              key={id}
              href={`/videos/${id}`}
            >
              <div className={clsx(["py-2"])}>
                <Image
                  className={clsx(["w-auto"], ["h-auto"])}
                  src={thumbnailUrl}
                  width={192}
                  height={128}
                  alt={title}
                  priority={true}
                />
              </div>
              <div className={clsx(["px-2"], ["py-1"], ["truncate"])}>
                <span className={clsx(["block"], ["text-xs"])}>{title}</span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};
