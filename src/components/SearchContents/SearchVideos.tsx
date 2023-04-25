"use client";
import "client-only";

import clsx from "clsx";
import React from "react";

import { LinkVideo } from "~/app/videos/[serial]/Link";
import { VideoThumbnail } from "~/components/VideoThumbnail";
import { FragmentType, graphql, useFragment } from "~/gql";

const ItemFragment = graphql(`
  fragment SearchContents_SearchVideosItem on VideoSearchItemByTitle {
    title {
      title
    }
    video {
      id
      title
      ...VideoThumbnail
      ...Link_Video
    }
  }
`);
const SearchVideosItem: React.FC<{
  className?: string;
  fragment: FragmentType<typeof ItemFragment>;
}> = ({ className, ...props }) => {
  const { title, video } = useFragment(ItemFragment, props.fragment);
  return (
    <LinkVideo
      key={video.id}
      className={clsx(
        className,
        ["px-2"],
        ["py-2"],
        ["flex", ["items-center"], ["gap-x-4"]],
        ["hover:bg-sky-300/50", "focus:bg-sky-400/50"]
      )}
      onClick={(e) => {
        e.currentTarget.blur();
      }}
      tabIndex={0}
      fragment={video}
    >
      <div className={clsx(["flex-shrink-0"])}>
        <VideoThumbnail className={clsx(["w-32"], ["h-16"])} fragment={video} />
      </div>
      <div
        className={clsx(
          ["flex-grow"],
          ["py-1"],
          ["flex", "flex-col", "gap-y-1", "justify-center"]
        )}
      >
        <div className={clsx(["text-slate-900"], ["text-sm"], ["font-bold"])}>
          {title.title}
        </div>
        <div className={clsx(["text-slate-500"], ["text-xs"])}>
          {video.title}
        </div>
      </div>
    </LinkVideo>
  );
};

export const Fragment = graphql(`
  fragment SearchContents_SearchVideos on SearchVideosPayload {
    items {
      ...SearchContents_SearchVideosItem
    }
  }
`);
export const SearchVideos: React.FC<{
  className?: string;
  fragment: FragmentType<typeof Fragment>;
}> = ({ className, ...props }) => {
  const { items } = useFragment(Fragment, props.fragment);

  return (
    <div className={clsx(className)}>
      {items.length === 0 && (
        <div className={clsx(["px-4", "py-2"])}>
          <p className={clsx(["text-xs"], ["text-slate-500"])}>該当なし</p>
        </div>
      )}
      <div className={clsx(["divide-y", "divide-slate-400/75"])}>
        {items.map((fragment, i) => (
          <SearchVideosItem key={i} fragment={fragment} />
        ))}
      </div>
    </div>
  );
};
