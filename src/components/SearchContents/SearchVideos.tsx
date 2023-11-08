"use client";
import "client-only";

import clsx from "clsx";
import React from "react";

import { LinkVideo } from "~/app/mads/[serial]/Link";
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
      className={clsx(className, [
        "flex items-center gap-x-4 p-2 hover:bg-sky-300/50 focus:bg-sky-400/50",
      ])}
      onClick={(e) => {
        e.currentTarget.blur();
      }}
      tabIndex={0}
      fragment={video}
    >
      <div className={clsx("shrink-0")}>
        <VideoThumbnail
          className={clsx("h-16 w-32")}
          imageSize="small"
          fragment={video}
        />
      </div>
      <div className={clsx(["flex grow flex-col justify-center gap-y-1 py-1"])}>
        <div className={clsx("text-sm font-bold text-slate-900")}>
          {title.title}
        </div>
        <div className={clsx("text-xs text-slate-500")}>{video.title}</div>
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
        <div className={clsx("px-4 py-2")}>
          <p className={clsx("text-xs text-slate-500")}>該当なし</p>
        </div>
      )}
      <div className={clsx("divide-y divide-slate-400/75")}>
        {items.map((fragment, i) => (
          <SearchVideosItem key={i} fragment={fragment} />
        ))}
      </div>
    </div>
  );
};
