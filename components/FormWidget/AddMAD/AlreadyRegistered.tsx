"use client";

import clsx from "clsx";
import React from "react";

import { MadPageLink } from "~/app/(v2)/mads/[serial]/Link";
import Button from "~/components/Button";
import { VideoThumbnail } from "~/components/VideoThumbnail";
import { FragmentType, graphql, useFragment } from "~/gql";

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
    <div className={clsx(className, "flex flex-col gap-y-4")} style={style}>
      <div className={clsx("flex gap-x-4")}>
        <MadPageLink className={clsx("block")} fragment={fragment.video}>
          <VideoThumbnail
            fragment={fragment.video}
            imageSize="small"
            className={clsx("h-32 w-48")}
          />
        </MadPageLink>
        <div>
          <p className={clsx("text-sm text-slate-400")}>
            <span className={clsx("font-mono text-slate-300")}>
              {fragment.sourceId}
            </span>
            は
            <MadPageLink
              className={clsx("font-bold text-slate-300")}
              fragment={fragment.video}
            >
              {fragment.video.title}
            </MadPageLink>
            として既に登録されています。
          </p>
        </div>
      </div>
      <div>
        <Button
          className={clsx("ml-auto")}
          onClick={() => {
            handleCancel();
          }}
          text="戻る"
          size="medium"
          color="green"
        />
      </div>
    </div>
  );
}
