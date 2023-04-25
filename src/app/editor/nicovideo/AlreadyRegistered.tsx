"use client";
import "client-only";

import clsx from "clsx";
import React from "react";

import { LinkVideo } from "~/app/videos/[serial]/Link";
import { VideoThumbnail } from "~/components/VideoThumbnail";
import { FragmentType, graphql, useFragment } from "~/gql";

export const Fragment = graphql(`
  fragment EditorRegisterNicovideoPage_VideoSource on NicovideoVideoSource {
    sourceId
    video {
      ...VideoThumbnail
      ...Link_Video
      title
    }
  }
`);
export const AlreadyRegistered: React.FC<{
  className?: string;
  fragment: FragmentType<typeof Fragment>;
}> = ({ className, ...props }) => {
  const fragment = useFragment(Fragment, props.fragment);

  return (
    <div className={clsx(className, ["flex", "gap-x-4"])}>
      <LinkVideo
        className={clsx(["block"], ["w-64"])}
        fragment={fragment.video}
      >
        <VideoThumbnail width={260} height={200} fragment={fragment.video} />
      </LinkVideo>
      <div>
        <p className={clsx(["text-sm"], ["text-slate-900"])}>
          <span className={clsx(["font-mono"])}>{fragment.sourceId}</span>は
          <LinkVideo className={clsx(["font-bold"])} fragment={fragment.video}>
            {fragment.video.title}
          </LinkVideo>
          として既に登録されています。
        </p>
      </div>
    </div>
  );
};
