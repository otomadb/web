import clsx from "clsx";
import Image from "next/image";
import React from "react";

import { LikeButton } from "./LikeButton";

export const VideoDetailsSection: React.FC<{
  title: string;
  thumbnailUrl: string;
  videoId: string;
}> = ({ title, thumbnailUrl, videoId }) => {
  return (
    <section
      className={clsx(["flex", ["flex-col", "lg:flex-row"]], ["gap-x-4"])}
    >
      <div>
        <Image
          className={clsx(["object-scale-down"], ["h-40"])}
          src={thumbnailUrl}
          width={260}
          height={200}
          alt={title}
          priority={true}
        />
      </div>
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
