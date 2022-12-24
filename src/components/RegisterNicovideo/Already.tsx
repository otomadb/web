import clsx from "clsx";
import Image from "next/image";
import React from "react";

import { LinkVideo } from "../common/Link";

export const Already: React.FC<{
  className?: string;
  source: {
    sourceId: string;
    video: { id: string; title: string; thumbnailUrl: string };
  };
}> = ({ className, source }) => (
  <div className={clsx(className, ["mt-4"], ["flex", ["flex-col"]])}>
    <LinkVideo videoId={source.video.id}>
      <Image
        className={clsx(["object-scale-down"], ["h-32"])}
        src={source.video.thumbnailUrl}
        width={260}
        height={200}
        alt={source.video.title}
        priority={true}
      />
    </LinkVideo>
    <p className={clsx(["mt-2"], ["text-sm"], ["text-slate-700"])}>
      <span className={clsx(["font-mono"])}>{source.sourceId}</span>は
      <LinkVideo
        videoId={source.video.id}
        className={clsx(["font-bold"], ["text-slate-900"])}
      >
        {source.video.title}
      </LinkVideo>
      として既に登録されています。
    </p>
  </div>
);
