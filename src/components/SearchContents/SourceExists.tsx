"use client";
import clsx from "clsx";
import React from "react";

import { LinkVideo } from "~/app/mads/[serial]/Link";
import { CommonTag } from "~/components/CommonTag";
import { VideoThumbnail } from "~/components/VideoThumbnail";
import { FragmentType, graphql, useFragment } from "~/gql";

const Fragment = graphql(`
  fragment SearchContents_NicovideoVideoSourceExists on NicovideoVideoSource {
    id
    sourceId
    video {
      id
      title
      ...VideoThumbnail
      ...Link_Video
      taggings(first: 3) {
        nodes {
          id
          tag {
            id
            ...Link_Tag
            ...CommonTag
          }
        }
      }
    }
  }
`);
export const SourceExists: React.FC<{
  className?: string;
  fragment: FragmentType<typeof Fragment>;
}> = ({ className, ...props }) => {
  const fragment = useFragment(Fragment, props.fragment);

  return (
    <LinkVideo
      fragment={fragment.video}
      onClick={(e) => {
        e.currentTarget.blur();
      }}
      className={clsx(
        className,
        ["px-2"],
        ["py-2"],
        ["flex", "gap-x-4"],
        ["hover:bg-sky-300/50", "focus:bg-sky-400/50"]
      )}
    >
      <div className={clsx(["flex-shrink-0"])}>
        <VideoThumbnail
          className={clsx(["w-36"], ["h-18"])}
          fragment={fragment.video}
        />
      </div>
      <div
        className={clsx(["flex-grow"], ["flex", "flex-col", "justify-center"])}
      >
        <div className={clsx(["flex"])}>
          <p className={clsx(["text-slate-500"], ["text-xs"])}>
            <span className={clsx(["font-mono"])}>{fragment.sourceId}</span>
            は既に登録されています。
          </p>
        </div>
        <div className={clsx(["flex"])}>
          <p className={clsx(["text-slate-900"], ["text-sm"], ["font-bold"])}>
            {fragment.video.title}
          </p>
        </div>
        <div className={clsx(["mt-2"], ["flex-grow"], ["flex"])}>
          {fragment.video.taggings.nodes.length === 0 && (
            <p className={clsx(["text-xs", "text-slate-400"])}>
              タグ付けがありません。
            </p>
          )}
          <div className={clsx(["flex", "flex-wrap", "gap-x-1"])}>
            {fragment.video.taggings.nodes.map((tagging) => (
              <div key={tagging.id} className={clsx()}>
                <CommonTag
                  fragment={tagging.tag}
                  className={clsx(["text-xs"], ["px-1"], ["py-0.5"])}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </LinkVideo>
  );
};
