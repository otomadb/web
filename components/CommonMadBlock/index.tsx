"use client";

import clsx from "clsx";
import { useState } from "react";

import { MadPageLink } from "~/app/(v2)/mads/[serial]/Link";
import CommonTagLink from "~/components/CommonTagLink";
import { VideoThumbnail } from "~/components/VideoThumbnail";
import { FragmentType, graphql, useFragment } from "~/gql";

import LikeSwitch, { LikeSwitchFragment } from "./LikeSwitch";

export const CommonMadBlockFragment = graphql(`
  fragment CommonMadBlock on Video {
    ...Link_Video
    ...VideoThumbnail
    id
    title
    taggings(first: 3) {
      nodes {
        id
        tag {
          ...CommonTagLink
        }
      }
    }
  }
`);
export default function CommonMadBlock({
  classNames,
  style,
  likeable,
  ...props
}: {
  classNames?: string;
  style?: React.CSSProperties;
  fragment: FragmentType<typeof CommonMadBlockFragment>;
  size?: "small" | "medium";
  likeable?: FragmentType<typeof LikeSwitchFragment>;
}) {
  const fragment = useFragment(CommonMadBlockFragment, props.fragment);
  const [activate, setActivate] = useState(false);

  return (
    <div
      onMouseOver={() => {
        setActivate(true);
      }}
      style={style}
      className={clsx(
        classNames,
        "overflow-hidden rounded border border-obsidian-lighter bg-obsidian-primary"
      )}
    >
      <div className={clsx("group/thumbnail relative")}>
        <MadPageLink fragment={fragment} className={clsx("z-0 block")}>
          <VideoThumbnail
            fragment={fragment}
            className={clsx("h-32 w-full")}
            imageSize="medium"
          />
        </MadPageLink>
        {likeable && (
          <LikeSwitch
            activate={activate}
            fragment={likeable}
            className={clsx(
              "absolute bottom-2 right-2 z-1 opacity-0 transition-opacity duration-75 group-hover/thumbnail:opacity-100"
            )}
          />
        )}
      </div>
      <div className={clsx("flex flex-col gap-y-2 p-2")}>
        <MadPageLink
          fragment={fragment}
          className={clsx(
            "line-clamp-1 text-xs font-bold text-snow-primary hover:text-vivid-primary hover:underline"
          )}
        >
          {fragment.title}
        </MadPageLink>
        <div className={clsx([])}>
          {fragment.taggings.nodes.length === 0 && (
            <div className={clsx("text-xxs text-slate-500")}>
              タグ付けがありません
            </div>
          )}
          <div className={clsx("flex flex-wrap gap-0.5")}>
            {fragment.taggings.nodes.map((tagging) => (
              <CommonTagLink
                key={tagging.id}
                fragment={tagging.tag}
                size="xs"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
