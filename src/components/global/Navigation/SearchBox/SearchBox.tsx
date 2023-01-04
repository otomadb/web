"use client";

import { css } from "@emotion/css";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import React, { useMemo, useState } from "react";
import { useQuery } from "urql";

import { DelayedInput } from "~/components/common/DelayedInput";
import { getFragment, graphql } from "~/gql";
import {
  GlobalNav_SearchBox_SearchTagsFragmentDoc,
  GlobalNav_SearchBox_SearchVideosFragmentDoc,
  GlobalNav_SearchBoxDocument,
} from "~/gql/graphql";

import { SearchTags } from "./SearchTags";
import { SearchVideos } from "./SearchVideos";

graphql(`
  query GlobalNav_SearchBox($query: String!) {
    tags: searchTags(input: { query: $query, limit: 6 }) {
      ...GlobalNav_SearchBox_SearchTags
    }
    videos: searchVideos(input: { query: $query, limit: 3 }) {
      ...GlobalNav_SearchBox_SearchVideos
    }
  }
`);
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
  const { data } = result;

  const videos = getFragment(
    GlobalNav_SearchBox_SearchVideosFragmentDoc,
    data?.videos
  );
  const tags = getFragment(
    GlobalNav_SearchBox_SearchTagsFragmentDoc,
    data?.tags
  );

  if (isQueryEmpty) return null;

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
          {tags && <SearchTags className={clsx()} fragment={tags} />}
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
          {videos && <SearchVideos className={clsx()} fragment={videos} />}
        </div>
      </div>
    </div>
  );
};

export const SearchBox: React.FC<{ className?: string }> = ({ className }) => {
  const [query, setQuery] = useState<string>("");

  return (
    <form
      className={clsx(
        className,
        ["group"],
        ["relative"],
        ["w-full"],
        ["border"],
        ["bg-white"],
        css`
          &:focus-within {
            box-shadow: 0 0 0 100vmax rgba(0, 0, 0, 0.125);
          }
        `
      )}
    >
      <div
        className={clsx(
          ["absolute"],
          ["pl-4"],
          ["inset-y-0"],
          ["flex", "items-center"],
          ["pointer-events-none"]
        )}
      >
        <MagnifyingGlassIcon className={clsx(["w-4"], ["h-4"])} />
      </div>
      <DelayedInput
        className={clsx(
          ["w-full"],
          [["pl-10"], ["pr-4"], ["py-3"]],
          ["text-sm"],
          ["text-slate-900"]
        )}
        type="search"
        aria-label="Search box input"
        debounce={50}
        onUpdateQuery={(v) => setQuery(v)}
        placeholder="何かしらを検索"
      />
      <SearchResult
        classname={clsx(
          ["invisible", "group-focus-within:visible"],
          ["w-full"],
          [["absolute"], ["z-infinity"], ["top-full"]]
        )}
        query={query}
      />
    </form>
  );
};
