import clsx from "clsx";
import React from "react";

import { LinkVideo } from "~/app/mads/[serial]/Link";
import { LinkTag } from "~/app/tags/[serial]/Link";
import { CommonTag } from "~/components/CommonTag";
import { VideoThumbnail } from "~/components/VideoThumbnail";
import { FragmentType, graphql, useFragment } from "~/gql";

export const Fragment = graphql(`
  fragment CommonVideoContainer on Video {
    ...Link_Video
    ...VideoThumbnail
    title
    thumbnailUrl
    taggings(first: 3) {
      nodes {
        id
        tag {
          ...CommonTag
          ...Link_Tag
        }
      }
    }
  }
`);
export const CommonVideoContainer: React.FC<{
  className?: string;
  fragment: FragmentType<typeof Fragment>;
}> = ({ className, ...props }) => {
  const fragment = useFragment(Fragment, props.fragment);
  return (
    <div
      className={clsx(className, [
        "flex flex-col rounded border border-slate-300 bg-slate-50 p-2",
      ])}
    >
      <LinkVideo className={clsx("flex")} fragment={fragment}>
        <VideoThumbnail
          fragment={fragment}
          className={clsx("h-32 w-full")}
          imageSize="large"
        />
      </LinkVideo>
      <div className={clsx("mt-1 line-clamp-2")}>
        <LinkVideo
          fragment={fragment}
          className={clsx("text-sm font-bold text-slate-900")}
        >
          {fragment.title}
        </LinkVideo>
      </div>
      <div className={clsx("mt-1")}>
        {fragment.taggings.nodes.length === 0 && (
          <div className={clsx("text-xxs text-slate-500")}>
            タグ付けがありません
          </div>
        )}
        <div className={clsx(["flex flex-wrap gap-0.5"])}>
          {fragment.taggings.nodes.map((tagging) => (
            <LinkTag
              key={tagging.id}
              fragment={tagging.tag}
              className={clsx("flex")}
            >
              <CommonTag
                fragment={tagging.tag}
                className={clsx("px-1 py-0.5 text-xxs")}
              />
            </LinkTag>
          ))}
        </div>
      </div>
    </div>
  );
};
