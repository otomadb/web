"use client";
import { ArrowPathIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import React, { useState } from "react";
import { useQuery } from "urql";

import { DelayedInput } from "~/components/DelayedInput";
import { graphql } from "~/gql";
import { VideoPage_TagEditor_SearchBoxDocument } from "~/gql/graphql";

graphql(`
  query VideoPage_TagEditor_SearchBox($query: String!, $videoId: ID!) {
    searchTags(input: { query: $query, limit: 5 }) {
      result {
        matchedName
        tag {
          id
          name
          pseudoType
          canTagTo(id: $videoId)
          explicitParent {
            id
            name
          }
        }
      }
    }
  }
`);

export const SearchBox: React.FC<{
  classNames?: string;
  query: string;
  videoId: string;
  handleSelect(id: string): void;
}> = ({ query, classNames, handleSelect, videoId }) => {
  const [{ data, fetching }, refetch] = useQuery({
    query: VideoPage_TagEditor_SearchBoxDocument,
    pause: query === "",
    variables: query !== "" ? { query, videoId } : undefined,
  });

  if (query === "") return null;

  return (
    <div
      className={clsx(
        classNames,
        ["border", ["border-slate-300"]],
        ["divide-y", ["divide-slate-200"]]
      )}
    >
      {fetching && (
        <div
          className={clsx(
            [["px-2"], ["py-1"]],
            ["bg-slate-50"],
            ["flex"],
            ["items-center"]
          )}
        >
          <ArrowPathIcon
            className={clsx(
              ["inline-block"],
              ["w-4"],
              ["h-4"],
              ["text-slate-700"],
              ["animate-spin"]
            )}
          />
          <div className={clsx(["ml-2"], ["text-xs"], ["text-slate-500"])}>
            検索中
          </div>
        </div>
      )}
      {data &&
        data.searchTags.result.map(({ matchedName, tag }) => (
          <div
            key={tag.id}
            role="button"
            aria-disabled={!tag.canTagTo}
            tabIndex={0}
            className={clsx(
              ["w-full"],
              ["group"],
              [
                "aria-disabled:bg-slate-200",
                ["bg-slate-50", "hover:bg-blue-200"],
              ],
              [["px-2"], ["py-2"]]
            )}
            onClick={async () => {
              if (tag.canTagTo) {
                await handleSelect(tag.id);
                await refetch();
              }
            }}
          >
            <div className={clsx(["text-left"], ["text-xs"])}>
              <span
                className={clsx([
                  "group-aria-disabled:text-slate-400",
                  ["text-slate-800"],
                ])}
              >
                {tag.name}
              </span>
              {tag.explicitParent && (
                <span
                  className={clsx(
                    ["ml-0.5"],
                    ["group-aria-disabled:text-slate-400", ["text-slate-700"]]
                  )}
                >
                  ({tag.explicitParent.name})
                </span>
              )}
            </div>
            {tag.name !== matchedName && (
              <div
                className={clsx(
                  ["text-left"],
                  ["text-xs"],
                  ["group-aria-disabled:text-slate-400", ["text-slate-600"]],
                  ["italic"]
                )}
              >
                {matchedName}
              </div>
            )}
          </div>
        ))}
    </div>
  );
};

export const TagAdder: React.FC<{
  className?: string;
  videoId: string;
  disabled?: boolean;
  handleSelect(tagId: string): void;
}> = ({ className, videoId, disabled, handleSelect }) => {
  const [query, setQuery] = useState<string>("");

  return (
    <div className={clsx(className, ["flex"], ["group"], ["relative"])}>
      <DelayedInput
        aria-label="タグの名前を入力"
        placeholder="タグの名前"
        className={clsx(
          ["w-full"],
          [["py-0.5"], ["px-2"]],
          ["bg-slate-100"],
          ["border", "border-slate-300"],
          ["rounded"],
          ["text-sm"]
        )}
        disabled={disabled}
        onUpdateQuery={(q) => setQuery(q)}
      />
      <SearchBox
        classNames={clsx(
          ["invisible", "group-focus-within:visible"],
          ["w-full"],
          [["absolute"], ["z-infinity"], ["top-full"]]
        )}
        query={query}
        videoId={videoId}
        handleSelect={handleSelect}
      />
    </div>
  );
};
