"use client";

import { ArrowPathIcon } from "@heroicons/react/24/outline";
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
  query TagSearcher_SearchTags($query: String!) {
    searchTags(input: { query: $query, limit: 5 }) {
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

export const SearchBox: React.FC<{
  classNames?: string;
  query: string;
  handleSelect(id: string): void;
}> = ({ query, classNames, handleSelect }) => {
  const [{ data, fetching }] = useQuery({
    query: TagSearcher_SearchTagsDocument,
    pause: query === "",
    variables: query !== "" ? { query } : undefined,
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
        data.searchTags.items.map(({ matchedName, tag }) => (
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
  );
};

export const TagSearcher: React.FC<{
  className?: string;
  handleSelect(id: string): void;
}> = ({ className, handleSelect }) => {
  const [query, setQuery] = useState<string>("");

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
          onUpdateQuery={(q) => setQuery(q)}
        />
        <SearchBox
          classNames={clsx(
            ["invisible", "group-focus-within/adder:visible"],
            ["w-full"],
            [["absolute"], ["z-infinity"], ["top-full"]]
          )}
          query={query}
          handleSelect={(id) => handleSelect(id)}
        />
      </div>
    </div>
  );
};
