"use client";
import clsx from "clsx";
import React from "react";
import { useQuery } from "urql";

import { graphql } from "~/gql";

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
      className={clsx(classname, [
        "rounded-b-md border-x border-b border-slate-300/75 bg-white/90 px-2 py-3 shadow-md backdrop-blur-sm",
      ])}
    >
      <div className={clsx("flex flex-col gap-y-2")}>
        <div className={clsx()}>
          <div
            className={clsx([
              "border-b border-slate-300/75 px-4 py-1 text-xs text-slate-600",
            ])}
          >
            タグ
          </div>
          {data?.searchTags && (
            <SearchTags className={clsx()} fragment={data.searchTags} />
          )}
        </div>
        <div className={clsx()}>
          <div
            className={clsx([
              "border-b border-slate-300/75 px-4 py-1 text-xs text-slate-600",
            ])}
          >
            動画
          </div>
          {data?.searchVideos && (
            <SearchVideos className={clsx()} fragment={data.searchVideos} />
          )}
        </div>
        {regexNicovideoSourceID.test(query) && (
          <div className={clsx()}>
            <div
              className={clsx([
                "border-b border-slate-300/75 px-4 py-1 text-xs text-slate-600",
              ])}
            >
              ニコニコ動画の
              <span className={clsx("font-mono")}>{query}</span>
              の検索
            </div>
            <SearchNicovideo className={clsx()} sourceId={query} />
          </div>
        )}
      </div>
    </div>
  );
};
