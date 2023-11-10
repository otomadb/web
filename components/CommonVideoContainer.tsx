import clsx from "clsx";
import React from "react";

import { MadPageLink } from "~/app/(application)/mads/[serial]/Link";
import { LinkTag } from "~/app/(application)/tags/[serial]/Link";
import CommonTag from "~/components/CommonTag";
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
      className={clsx(
        className,
        ["bg-slate-50"],
        ["border", "border-slate-300"],
        ["rounded"],
        ["px-2"],
        ["py-2"],
        ["flex", "flex-col"]
      )}
    >
      <MadPageLink className={clsx(["flex"])} fragment={fragment}>
        <VideoThumbnail
          fragment={fragment}
          className={clsx(["w-full"], ["h-32"])}
          imageSize="large"
        />
      </MadPageLink>
      <div className={clsx(["mt-1"], ["line-clamp-2"])}>
        <MadPageLink
          fragment={fragment}
          className={clsx(["text-sm"], ["font-bold"], ["text-slate-900"])}
        >
          {fragment.title}
        </MadPageLink>
      </div>
      <div className={clsx(["mt-1"])}>
        {fragment.taggings.nodes.length === 0 && (
          <div className={clsx(["text-xxs"], ["text-slate-500"])}>
            タグ付けがありません
          </div>
        )}
        <div
          className={clsx(
            ["flex"],
            ["flex-wrap"],
            ["gap-x-0.5"],
            ["gap-y-0.5"]
          )}
        >
          {fragment.taggings.nodes.map((tagging) => (
            <LinkTag
              key={tagging.id}
              fragment={tagging.tag}
              className={clsx(["flex"])}
            >
              <CommonTag size="xs" fragment={tagging.tag} />
            </LinkTag>
          ))}
        </div>
      </div>
    </div>
  );
};
