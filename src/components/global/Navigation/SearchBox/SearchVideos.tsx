"use client";
import clsx from "clsx";
import React from "react";

import { LinkVideo } from "~/components/common/Link";
import { Thumbnail } from "~/components/common/Thumbnail";
import { getFragment, graphql } from "~/gql";
import {
  Component_ThumbnailFragmentDoc,
  GlobalNav_SearchBox_SearchVideosFragment,
  GlobalNav_SearchBox_SearchVideosItemFragment,
  GlobalNav_SearchBox_SearchVideosItemFragmentDoc,
} from "~/gql/graphql";

graphql(`
  fragment GlobalNav_SearchBox_SearchVideosItem on SearchVideosItem {
    matchedTitle
    video {
      id
      serial
      title
      ...Component_Thumbnail
    }
  }
`);
export const SearchVideosItem: React.FC<{
  className?: string;
  fragment: GlobalNav_SearchBox_SearchVideosItemFragment;
}> = ({ className, fragment }) => {
  const { matchedTitle, video } = fragment;
  return (
    <LinkVideo
      key={video.id}
      serial={video.serial}
      tabIndex={0}
      className={clsx(
        className,
        ["py-2"],
        ["flex", ["items-center"]],
        ["hover:bg-sky-300/50", "focus:bg-sky-400/50"],
        ["divide-x", "border-slate-300/75"]
      )}
      onClick={(e) => {
        e.currentTarget.blur();
      }}
    >
      <div className={clsx(["flex-shrink-0"], ["px-2"])}>
        <Thumbnail
          fragment={getFragment(Component_ThumbnailFragmentDoc, video)}
          className={clsx(["w-[80px]"], ["h-[60px]"])}
          width={80}
          height={60}
          Wrapper={(props) => <div {...props} />}
        />
      </div>
      <div
        className={clsx(
          ["flex-grow"],
          ["flex", "flex-col", "justify-center"],
          ["px-2"]
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
  fragment GlobalNav_SearchBox_SearchVideos on SearchVideosPayload {
    items {
      ...GlobalNav_SearchBox_SearchVideosItem
    }
  }
`);
export const SearchVideos: React.FC<{
  className?: string;
  fragment: GlobalNav_SearchBox_SearchVideosFragment;
}> = ({ className, fragment }) => {
  const items = getFragment(
    GlobalNav_SearchBox_SearchVideosItemFragmentDoc,
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
