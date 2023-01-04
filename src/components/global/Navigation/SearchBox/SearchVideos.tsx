"use client";
import clsx from "clsx";
import React from "react";

import { LinkVideo } from "~/components/common/Link";
import { Thumbnail } from "~/components/common/Thumbnail";
import { getFragment, graphql } from "~/gql";
import {
  Component_ThumbnailFragmentDoc,
  GlobalNav_SearchBox_SearchVideosFragment,
} from "~/gql/graphql";

graphql(`
  fragment GlobalNav_SearchBox_SearchVideos on SearchVideosPayload {
    items {
      matchedTitle
      video {
        id
        title
        ...Component_Thumbnail
      }
    }
  }
`);
export const SearchVideos: React.FC<{
  className?: string;
  fragment: GlobalNav_SearchBox_SearchVideosFragment;
}> = ({ className, fragment }) => {
  const { items } = fragment;

  return (
    <div className={clsx(className)}>
      {items.length === 0 && (
        <div className={clsx(["px-4", "py-2"])}>
          <p className={clsx(["text-xs"], ["text-slate-500"])}>該当なし</p>
        </div>
      )}
      <div className={clsx(["divide-y", "divide-slate-400/75"])}>
        {items.map(({ video, matchedTitle }) => (
          <LinkVideo
            key={video.id}
            videoId={video.id}
            tabIndex={0}
            className={clsx(
              ["py-2"],
              ["flex", ["items-stretch"]],
              ["hover:bg-sky-300/50", "focus:bg-sky-400/50"],
              ["divide-x", "border-slate-300/75"]
            )}
          >
            <Thumbnail
              fragment={getFragment(Component_ThumbnailFragmentDoc, video)}
              className={clsx(
                ["flex-shrink-0"],
                ["h-16"],
                ["border", "border-slate-400"]
              )}
              width={192}
              height={144}
              Wrapper={(props) => <div {...props} />}
            />
            <div
              className={clsx(
                ["flex-grow"],
                ["flex", "flex-col", "justify-center"],
                ["px-2"]
              )}
            >
              <div
                className={clsx(["text-slate-900"], ["text-sm"], ["font-bold"])}
              >
                {matchedTitle}
              </div>
              <div className={clsx(["text-slate-500"], ["text-xs"])}>
                {video.title}
              </div>
            </div>
          </LinkVideo>
        ))}
      </div>
    </div>
  );
};
