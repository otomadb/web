"use client";

import clsx from "clsx";
import React, { useMemo, useState } from "react";
import { useQuery } from "urql";

import { DelayedInput } from "~/components/DelayedInput";
import { TagLink, VideoLink } from "~/components/Link";
import { getFragment, graphql } from "~/gql";
import {
  GlobalNav_SearchBox_SearchTagsFragment,
  GlobalNav_SearchBox_SearchTagsFragmentDoc,
  GlobalNav_SearchBox_SearchVideosFragment,
  GlobalNav_SearchBox_SearchVideosFragmentDoc,
  GlobalNav_SearchBoxDocument,
} from "~/gql/graphql";

graphql(`
  fragment GlobalNav_SearchBox_SearchTags on SearchTagsPayload {
    result {
      matchedName
      tag {
        id
        name
        pseudoType
        explicitParent {
          id
          name
        }
      }
    }
  }

  fragment GlobalNav_SearchBox_SearchVideos on SearchVideosPayload {
    result {
      matchedTitle
      video {
        id
        title
      }
    }
  }

  query GlobalNav_SearchBox($query: String!) {
    tags: searchTags(input: { query: $query, limit: 8 }) {
      ...GlobalNav_SearchBox_SearchTags
    }
    videos: searchVideos(input: { query: $query, limit: 4 }) {
      ...GlobalNav_SearchBox_SearchVideos
    }
  }
`);

export const VideosSect: React.FC<{
  className?: string;
  fragment: GlobalNav_SearchBox_SearchVideosFragment;
}> = ({ className, fragment }) => {
  const { result } = fragment;

  return (
    <div className={clsx(className, ["divide-y", "divide-slate-400/75"])}>
      {result.length === 0 && (
        <div className={clsx(["px-4", "py-1"], [["flex"], ["items-center"]])}>
          <span className={clsx(["text-slate-900"], ["text-sm"])}>
            該当なし
          </span>
        </div>
      )}
      {result.map(({ video }) => (
        <VideoLink
          key={video.id}
          videoId={video.id}
          tabIndex={0}
          className={clsx(
            ["px-4", "py-1"],
            [["flex"], ["items-center"]],
            ["bg-sky-100/50", "hover:bg-sky-300/50", "focus:bg-sky-400/50"]
          )}
        >
          <div className={clsx(["flex-grow"], ["truncate"])}>
            <span className={clsx(["text-slate-900"], ["text-sm"])}>
              {video.title}
            </span>
          </div>
        </VideoLink>
      ))}
    </div>
  );
};

export const TagsSect: React.FC<{
  className?: string;
  fragment: GlobalNav_SearchBox_SearchTagsFragment;
}> = ({ className, fragment }) => {
  const { result } = fragment;

  return (
    <div className={clsx(className, ["divide-y", "divide-slate-400/75"])}>
      {result.length === 0 && (
        <div className={clsx(["px-4", "py-1"], [["flex"], ["items-center"]])}>
          <span className={clsx(["text-slate-900"], ["text-sm"])}>
            該当なし
          </span>
        </div>
      )}
      {result.map(({ tag, matchedName }) => (
        <TagLink
          key={tag.id}
          tagId={tag.id}
          tabIndex={0}
          className={clsx(
            [["flex"], ["items-center"]],
            ["divide-x", "border-slate-300/75"],
            ["hover:bg-sky-300/50", "focus:bg-sky-300/50"],
            ["py-2"]
          )}
        >
          <div className={clsx(["flex-shrink-0"], ["w-36"], ["px-2"])}>
            <div
              className={clsx(["text-slate-500"], ["text-xs"], ["text-right"])}
            >
              {matchedName}
            </div>
          </div>
          <div
            className={clsx(
              ["flex-grow"],
              ["flex", "flex-col", "justify-start"],
              ["px-2"]
            )}
          >
            <div
              className={clsx(["text-slate-900"], ["text-sm"], ["font-bold"])}
            >
              {tag.name}
            </div>
            <div className={clsx(["flex"])}>
              <div
                className={clsx(["text-xs"], ["italic"], {
                  "text-copyright-500": tag.pseudoType === "COPYRIGHT",
                  "text-character-500": tag.pseudoType === "CHARACTER",
                  "text-class-500": tag.pseudoType === "CLASS",
                  "text-music-500": tag.pseudoType === "MUSIC",
                  "text-series-500": tag.pseudoType === "SERIES",
                  "text-phrase-500": tag.pseudoType === "PHRASE",
                })}
              >
                {tag.pseudoType}
              </div>
            </div>
          </div>
        </TagLink>
      ))}
    </div>
  );
};

export const SearchResult: React.FC<{
  classname?: string;
  query: string;
}> = ({ classname, query }) => {
  const isQueryEmpty = useMemo(() => query === "", [query]);
  const [result] = useQuery({
    query: GlobalNav_SearchBoxDocument,
    variables: { query },
    pause: isQueryEmpty,
  });
  const { data, fetching } = result;

  const videos = getFragment(
    GlobalNav_SearchBox_SearchVideosFragmentDoc,
    data?.videos
  );
  const tags = getFragment(
    GlobalNav_SearchBox_SearchTagsFragmentDoc,
    data?.tags
  );

  return (
    <div
      className={clsx(
        classname,
        ["shadow-md"],
        ["bg-white/90"],
        ["backdrop-blur-sm"],
        ["rounded-b-md", "border-x", "border-b", "border-slate-300/75"],
        ["px-2"],
        ["py-3"]
      )}
    >
      {isQueryEmpty && (
        <div className={clsx(["px-4", "py-2"])}>
          <p className={clsx(["text-xs"], ["text-slate-500"])}>
            なにか入力してください
          </p>
        </div>
      )}
      {!isQueryEmpty && (
        <div className={clsx(["space-y-2"])}>
          <div className={clsx()}>
            <div
              className={clsx(
                ["text-xs"],
                ["px-4", "py-1"],
                ["text-slate-600"],
                ["border-b", "border-slate-300/75"]
              )}
            >
              タグ
            </div>
            {tags && <TagsSect className={clsx()} fragment={tags} />}
          </div>
          <div className={clsx()}>
            <div
              className={clsx(
                ["text-xs"],
                ["px-4", "py-1"],
                ["text-slate-600"],
                ["border-b", "border-slate-300/75"]
              )}
            >
              動画
            </div>
            {videos && <VideosSect className={clsx()} fragment={videos} />}
          </div>
        </div>
      )}
    </div>
  );
};

export const SearchBox: React.FC<{ className?: string }> = ({ className }) => {
  const [query, setQuery] = useState<string>("");

  return (
    <div className={clsx(className, ["relative"])}>
      <div
        className={clsx(
          ["flex-shrink-0"]
          /*
          css`
            &:focus-within {
              box-shadow: 0 0 0 100vmax rgba(0, 0, 0, 0.125);
            }
          `
          */
        )}
      >
        <DelayedInput
          aria-label="Search box input"
          className={clsx(
            ["peer"],
            ["relative"],
            ["w-full"],
            [["px-4"], ["py-2"]],
            ["text-sm"],
            ["text-slate-900"]
          )}
          onUpdateQuery={(v) => setQuery(v)}
        />
        <SearchResult
          classname={clsx(
            ["peer-focus:visible", "focus-within:visible"],
            ["w-full"],
            [["absolute"], ["z-infinity"], ["top-full"]]
          )}
          query={query}
        />
      </div>
    </div>
  );
};
