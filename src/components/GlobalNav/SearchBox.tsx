"use client";

import clsx from "clsx";
import Link from "next/link";
import React from "react";
import { useState } from "react";
import useSWR from "swr";

import { DelayedInput } from "~/components/DelayedInput";
import { graphql } from "~/gql";
import { gqlClient } from "~/gql/client";

const SearchQueryDocument = graphql(`
  query Search($query: String!) {
    tags: searchTags(query: $query, limit: 5) {
      result {
        matchedName
        tag {
          id
          name
        }
      }
    }
    videos: searchVideos(query: $query, limit: 5) {
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
  const [tags, setTags] = useState<
    { matchedName: string; tag: { id: string; name: string } }[]
  >([]);
  const [videos, setVideos] = useState<
    { matchedTitle: string; video: { id: string; title: string } }[]
  >([]);
  const { isValidating } = useSWR(
    query !== "" ? [SearchQueryDocument, query] : null,
    (doc, query) => gqlClient.request(doc, { query }),
    {
      suspense: false,
      onSuccess(data) {
        const { tags, videos } = data;
        setTags(
          tags.result.map(({ matchedName, tag: { id, name } }) => ({
            matchedName,
            tag: { id, name },
          }))
        );
        setVideos(
          videos.result.map(({ matchedTitle, video: { id, title } }) => ({
            matchedTitle,
            video: { id, title },
          }))
        );
      },
    }
  );

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
        {videos.length === 0 && (
          <div className={clsx(["px-4", "py-1"], [["flex"], ["items-center"]])}>
            <span className={clsx(["text-slate-900"], ["text-sm"])}>
              該当なし
            </span>
          </div>
        )}
        <div className={clsx(["divide-y", "divide-slate-400/75"])}>
          {videos.map(({ matchedTitle, video }) => (
            <Link
              key={video.id}
              href={`/videos/${video.id}`}
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
        {tags.length === 0 && (
          <div className={clsx(["px-4", "py-1"], [["flex"], ["items-center"]])}>
            <span className={clsx(["text-slate-900"], ["text-sm"])}>
              該当なし
            </span>
          </div>
        )}
        <div className={clsx(["divide-y", "divide-slate-400/75"])}>
          {tags.map(({ tag, matchedName }) => (
            <Link
              key={tag.id}
              href={`/tags/${tag.id}`}
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
