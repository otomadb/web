"use client";

import { ArrowPathIcon } from "@heroicons/react/24/outline";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import clsx from "clsx";
import React, { useState } from "react";
import { useQuery } from "urql";

import { DelayedInput } from "~/components/common/DelayedInput";
import { getFragment, graphql } from "~/gql";
import {
  TagSearcher_SearchTagsDocument,
  VideoPage_TagFragmentDoc,
} from "~/gql/graphql";

import { Tag } from "./Tag";

graphql(`
  query TagSearcher_SearchTags($query: String!, $limit: Int!) {
    searchTags(input: { query: $query, limit: $limit }) {
      items {
        matchedName
        tag {
          id
          name
          ...VideoPage_Tag
        }
      }
    }
  }
`);

export const TagSearcher: React.FC<{
  className?: string;
  handleSelect(id: string): void;
  limit?: number;
}> = ({ className, handleSelect, limit = 5 }) => {
  const [query, setQuery] = useState<string>("");
  const [{ data, fetching }] = useQuery({
    query: TagSearcher_SearchTagsDocument,
    pause: query === "",
    variables: query !== "" ? { query, limit } : undefined,
  });

  return (
    <div
      className={clsx(
        className,
        ["rounded"],
        ["bg-white/90", "backdrop-blur-sm"],
        ["shadow"]
      )}
    >
      <div className={clsx(["group/adder"], ["relative"])}>
        <label className={clsx(["flex", "items-stretch"])}>
          <div
            className={clsx(
              ["flex", "items-center"],
              ["px-2"],
              ["bg-slate-400"],
              ["rounded-l"]
            )}
          >
            {!fetching && (
              <MagnifyingGlassIcon
                className={clsx(["w-4", "h-4"], ["text-slate-200"])}
              />
            )}
            {fetching && (
              <ArrowPathIcon
                className={clsx(
                  ["w-4", "h-4"],
                  ["text-slate-200"],
                  ["animate-spin"]
                )}
              />
            )}
          </div>
          <DelayedInput
            placeholder="タグの名前"
            className={clsx(
              ["w-full"],
              [["py-0.5"], ["px-2"]],
              ["bg-slate-100"],
              ["border", "border-slate-300"],
              ["rounded-r"],
              ["text-sm"]
            )}
            onUpdateQuery={(q) => setQuery(q)}
          />
        </label>

        {query !== "" && data && (
          <div
            className={clsx(
              ["invisible", "group-focus-within/adder:visible"],
              [["absolute"], ["z-infinity"], ["top-full"]],
              ["mt-0.5"],
              ["w-full"]
            )}
          >
            <div
              className={clsx(
                ["border", ["border-slate-300"]],
                ["divide-y", ["divide-slate-200"]]
              )}
            >
              {data.searchTags.items.map(({ matchedName, tag }) => (
                <button
                  key={tag.id}
                  type="button"
                  tabIndex={0}
                  className={clsx(
                    ["w-full"],
                    ["group"],
                    [["px-2"], ["py-2"]],
                    ["flex", "flex-col", "items-start", "gap-y-1"],
                    ["bg-white", "hover:bg-blue-200"]
                  )}
                  onClick={async () => {
                    await handleSelect(tag.id);
                  }}
                >
                  <Tag
                    tag={getFragment(VideoPage_TagFragmentDoc, tag)}
                    Wrapper={({ children, ...props }) => (
                      <div {...props}>{children}</div>
                    )}
                  />
                  {tag.name !== matchedName && (
                    <div className={clsx(["text-xs"], ["text-slate-700"])}>
                      {matchedName}
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
