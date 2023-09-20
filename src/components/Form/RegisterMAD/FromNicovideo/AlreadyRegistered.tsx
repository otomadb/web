"use client";
import "client-only";

import clsx from "clsx";
import React from "react";

import { LinkVideo } from "~/app/mads/[serial]/Link";
import { VideoThumbnail } from "~/components/VideoThumbnail";
import { FragmentType, graphql, useFragment } from "~/gql";

export const Fragment = graphql(`
  fragment RegisterFromNicovideoForm_VideoSource on NicovideoVideoSource {
    id
    sourceId
    video {
      id
      title
      ...Link_Video
      ...VideoThumbnail
    }
  }
`);
export const AlreadyRegistered: React.FC<{
  className?: string;
  style?: React.CSSProperties;
  fragment: FragmentType<typeof Fragment>;
}> = ({ className, style, ...props }) => {
  const fragment = useFragment(Fragment, props.fragment);

  return (
    <div className={clsx(className, ["flex", "gap-x-4"])} style={style}>
      <LinkVideo className={clsx(["block"])} fragment={fragment.video}>
        <VideoThumbnail fragment={fragment.video} imageSize="medium" />
      </LinkVideo>
      <div>
        <p className={clsx(["text-sm"], ["text-slate-400"])}>
          <span className={clsx(["font-mono"], ["text-slate-300"])}>
            {fragment.sourceId}
          </span>
          は
          <LinkVideo
            className={clsx(["font-bold"], ["text-slate-300"])}
            fragment={fragment.video}
          >
            {fragment.video.title}
          </LinkVideo>
          として既に登録されています。
        </p>
      </div>
    </div>
  );
};
