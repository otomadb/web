"use client";
import "client-only";

import clsx from "clsx";
import React from "react";

import { LinkVideo } from "~/app/mads/[serial]/Link";
import { VideoThumbnail } from "~/components/VideoThumbnail";
import { FragmentType, graphql, useFragment } from "~/gql";

import { RedButton } from "../Button";

export const Fragment = graphql(`
  fragment Form_VideoAlreadyRegistered on VideoSource {
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
export default function AlreadyRegistered({
  className,
  style,
  handleCancel,
  ...props
}: {
  className?: string;
  style?: React.CSSProperties;
  fragment: FragmentType<typeof Fragment>;
  handleCancel(): void;
}) {
  const fragment = useFragment(Fragment, props.fragment);

  return (
    <div
      className={clsx(className, ["flex", "flex-col"], ["gap-y-4"])}
      style={style}
    >
      <div className={clsx(["flex", "gap-x-4"])}>
        <LinkVideo className={clsx(["block"])} fragment={fragment.video}>
          <VideoThumbnail
            fragment={fragment.video}
            imageSize="small"
            className={clsx(["w-48"], ["h-32"])}
          />
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
      <div>
        <RedButton
          type="button"
          className={clsx(["ml-auto"], ["px-4"], ["py-1"])}
          onClick={(e) => {
            e.preventDefault();
            handleCancel();
          }}
        >
          戻る
        </RedButton>
      </div>
    </div>
  );
}
