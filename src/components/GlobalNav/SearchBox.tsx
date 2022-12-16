"use client";

import clsx from "clsx";
import React, { useState } from "react";
import { useQuery } from "urql";

import { DelayedInput } from "~/components/DelayedInput";
import { TagLink, VideoLink } from "~/components/Link";
import { graphql } from "~/gql";
import { GlobalNav_SearchBoxDocument } from "~/gql/graphql";

graphql(`
  query GlobalNav_SearchBox($query: String!) {
    tags: searchTags(input: { query: $query, limit: 5 }) {
      result {
        matchedName
        tag {
          id
          name
        }
      }
    }
    videos: searchVideos(input: { query: $query, limit: 5 }) {
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

export const SearchResult: React.FC<{
  classname?: string;
  query: string;
  onRoute(): void;
}> = ({ classname, query, onRoute }) => {
  const [result] = useQuery({
    query: GlobalNav_SearchBoxDocument,
    variables: { query },
    pause: query === "",
    requestPolicy: "network-only",
  });
  const { data, fetching } = result;

  if (!data) return <></>;

  const {
    videos: { result: resultVideos },
    tags: { result: resultTags },
  } = data;

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
        <div className={clsx(["divide-y", "divide-slate-400/75"])}>
          {resultVideos.length === 0 && (
            <div
              className={clsx(["px-4", "py-1"], [["flex"], ["items-center"]])}
            >
              <span className={clsx(["text-slate-900"], ["text-sm"])}>
                該当なし
              </span>
            </div>
          )}
          {resultVideos.map(({ video }) => (
            <VideoLink
              key={video.id}
              videoId={video.id}
              className={clsx(
                ["px-4", "py-1"],
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
            </VideoLink>
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
        <div className={clsx(["divide-y", "divide-slate-400/75"])}>
          {resultTags.length === 0 && (
            <div
              className={clsx(["px-4", "py-1"], [["flex"], ["items-center"]])}
            >
              <span className={clsx(["text-slate-900"], ["text-sm"])}>
                該当なし
              </span>
            </div>
          )}
          {resultTags.map(({ tag, matchedName }) => (
            <TagLink
              key={tag.id}
              tagId={tag.id}
              className={clsx(
                ["px-4", "py-1"],
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
            </TagLink>
          ))}
        </div>
      </div>
    </div>
  );
};

export const SearchBox: React.FC<{ className?: string }> = ({ className }) => {
  const [query, setQuery] = useState<string>("");
  const [focus, setFocus] = useState(false);

  return (
    <div className={clsx(className, ["relative"], ["flex-shrink-0"])}>
      <div
        onClick={() => setFocus(false)}
        className={clsx(["z-0"], ["fixed"], ["inset-0"], {
          hidden: !focus,
        })}
      />
      <DelayedInput
        className={clsx(["relative"], ["w-full"], ["z-1"])}
        onUpdateQuery={(v) => setQuery(v)}
        onFocus={() => setFocus(true)}
      />
      <SearchResult
        classname={clsx(["w-full"], ["z-1"], ["absolute"], ["top-full"], {
          invisible: !focus || query === "",
        })}
        query={query}
        onRoute={() => {
          setFocus(false);
        }}
      />
    </div>
  );
};
