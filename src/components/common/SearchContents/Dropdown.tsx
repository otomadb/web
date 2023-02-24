"use client";
import clsx from "clsx";
import React from "react";
import { useQuery } from "urql";

import { getFragment, graphql } from "~/gql";
import {
  SearchContents_SearchTagsFragmentDoc,
  SearchContents_SearchVideosFragmentDoc,
} from "~/gql/graphql";

import { SearchNicovideo } from "./Nicovideo";
import { SearchTags } from "./SearchTags";
import { SearchVideos } from "./SearchVideos";

export const regexNicovideoSourceID = /sm\d+/;

export const Dropdown: React.FC<{
  classname?: string;
  query: string;
}> = ({ classname, query }) => {
  const [{ data }] = useQuery({
    query: graphql(`
      query SearchContents($query: String!) {
        searchTags(input: { query: $query, limit: 6 }) {
          ...SearchContents_SearchTags
        }
        searchVideos(input: { query: $query, limit: 3 }) {
          ...SearchContents_SearchVideos
        }
      }
    `),
    variables: { query },
  });

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
      <div className={clsx(["flex", "flex-col", "gap-y-2"])}>
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
          {data?.searchTags && (
            <SearchTags
              className={clsx()}
              fragment={getFragment(
                SearchContents_SearchTagsFragmentDoc,
                data.searchTags
              )}
            />
          )}
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
          {data?.searchVideos && (
            <SearchVideos
              className={clsx()}
              fragment={getFragment(
                SearchContents_SearchVideosFragmentDoc,
                data.searchVideos
              )}
            />
          )}
        </div>
        {regexNicovideoSourceID.test(query) && (
          <div className={clsx()}>
            <div
              className={clsx(
                ["text-xs"],
                ["px-4", "py-1"],
                ["text-slate-600"],
                ["border-b", "border-slate-300/75"]
              )}
            >
              ニコニコ動画の
              <span className={clsx(["font-mono"])}>{query}</span>
              の検索
            </div>
            <SearchNicovideo className={clsx()} sourceId={query} />
          </div>
        )}
      </div>
    </div>
  );
};
