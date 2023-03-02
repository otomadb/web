"use client";
import "client-only";

import clsx from "clsx";
import React from "react";

import { LinkVideo } from "~/app/videos/[serial]/Link";
import { getFragment, graphql } from "~/gql";
import {
  SearchContents_SearchVideosFragment,
  SearchContents_SearchVideosItemFragment,
  SearchContents_SearchVideosItemFragmentDoc,
  VideoThumbnailFragmentDoc,
} from "~/gql/graphql";

import { VideoThumbnail } from "../Thumbnail";

graphql(`
  fragment SearchContents_SearchVideosItem on SearchVideosItem {
    matchedTitle
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
  fragment: SearchContents_SearchVideosItemFragment;
}> = ({ className, fragment }) => {
  const { matchedTitle, video } = fragment;
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
        <VideoThumbnail
          className={clsx(["w-32"], ["h-16"])}
          fragment={getFragment(VideoThumbnailFragmentDoc, video)}
        />
      </div>
      <div
        className={clsx(
          ["flex-grow"],
          ["py-1"],
          ["flex", "flex-col", "gap-y-1", "justify-center"]
        )}
      >
        <div className={clsx(["text-slate-900"], ["text-sm"], ["font-bold"])}>
          {matchedTitle}
        </div>
        <div className={clsx(["text-slate-500"], ["text-xs"])}>
          {video.title}
        </div>
      </div>
    </LinkVideo>
  );
};

graphql(`
  fragment SearchContents_SearchVideos on SearchVideosPayload {
    items {
      ...SearchContents_SearchVideosItem
    }
  }
`);
export const SearchVideos: React.FC<{
  className?: string;
  fragment: SearchContents_SearchVideosFragment;
}> = ({ className, fragment }) => {
  const items = getFragment(
    SearchContents_SearchVideosItemFragmentDoc,
    fragment.items
  );

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
