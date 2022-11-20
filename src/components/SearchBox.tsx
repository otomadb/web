"use client";

import clsx from "clsx";
import gqlRequest from "graphql-request";
import Link from "next/link";
import React from "react";
import useSWR from "swr";

import { graphql } from "~/gql";

const SearchQueryDocument = graphql(`
  query Search($query: String!) {
    tags: searchTags(query: $query, limit: 3) {
      result {
        matchedName
        tag {
          id
          name
        }
      }
    }
    videos: searchVideos(query: $query, limit: 3) {
      result {
        matchedTitle
        video {
          id
          title
        }
      }
    }
  }
`);

export const SearchBox: React.FC<{
  classname?: string;
  query: string;
  onRoute(): void;
}> = ({ classname, query, onRoute }) => {
  const { data, isValidating } = useSWR(
    [SearchQueryDocument, query],
    (query, v) =>
      gqlRequest("http://localhost:8080/graphql", query, { query: v }),
    { suspense: false }
  );

  if (isValidating) return <span>loading</span>;
  if (!data) return null;

  return (
    <div
      className={clsx(
        classname,
        ["shadow-md"],
        ["bg-slate-50/90"],
        ["backdrop-blur-sm"]
      )}
    >
      <div className={clsx()}>
        <div
          className={clsx(
            ["px-4", "py-1"],
            ["border-b", "border-slate-300/75"]
          )}
        >
          <span
            className={clsx(["text-slate-700"], ["text-sm"], ["font-bold"])}
          >
            Videos
          </span>
        </div>
        {data.videos.result.length === 0 && (
          <div className={clsx(["px-4", "py-1"], [["flex"], ["items-center"]])}>
            <span className={clsx(["text-slate-900"], ["text-sm"])}>
              該当なし
            </span>
          </div>
        )}
        <div className={clsx(["divide-y", "divide-slate-400/75"])}>
          {data.videos.result.map(({ matchedTitle, video }) => (
            <Link
              key={video.id}
              href={`/videos/${video.id}`}
              className={clsx(
                ["px-4", "py-2"],
                [["flex"], ["items-center"]],
                ["bg-sky-100/50", "hover:bg-sky-300/50"]
              )}
              onClick={() => onRoute()}
            >
              <div className={clsx(["flex-grow"], ["truncate"])}>
                <span className={clsx(["text-slate-900"], ["text-sm"])}>
                  {video.title}
                </span>
              </div>
              {/*
              title_search !== title_primary && (
                <div className={clsx(["ml-4"], ["flex-shrink-0"])}>
                  <span className={clsx(["text-xs"], ["text-slate-500"])}>
                    {title_primary}
                  </span>
                </div>
              )
            */}
            </Link>
          ))}
        </div>
      </div>
      <div className={clsx()}>
        <div
          className={clsx(
            ["px-4", "py-1"],
            ["border-b", "border-slate-300/75"]
          )}
        >
          <span
            className={clsx(["text-slate-700"], ["text-sm"], ["font-bold"])}
          >
            Tags
          </span>
        </div>
        {data.tags.result.length === 0 && (
          <div className={clsx(["px-4", "py-1"], [["flex"], ["items-center"]])}>
            <span className={clsx(["text-slate-900"], ["text-sm"])}>
              該当なし
            </span>
          </div>
        )}
        <div className={clsx(["divide-y", "divide-slate-400/75"])}>
          {data.tags.result.map(({ tag, matchedName }) => (
            <Link
              key={tag.id}
              href={`/tags/${tag.id}`}
              className={clsx(
                ["px-4", "py-2"],
                [["flex"], ["items-center"]],
                ["bg-sky-100/50", "hover:bg-sky-300/50"]
              )}
              onClick={() => onRoute()}
            >
              <div className={clsx(["flex-grow"], ["truncate"])}>
                <span className={clsx(["text-slate-900"], ["text-sm"])}>
                  {tag.name}
                </span>
              </div>
              {/*
              name_search !== name_primary && (
                <div className={clsx(["ml-4"], ["flex-shrink-0"])}>
                  <span className={clsx(["text-xs"], ["text-slate-500"])}>
                    {name_primary}
                  </span>
                </div>
              )
            */}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};
