"use client";

import { ArrowPathIcon } from "@heroicons/react/24/outline";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import clsx from "clsx";
import React, { useCallback, useState } from "react";
import { useQuery } from "urql";

import { DelayedInput } from "~/components/common/DelayedInput";
import { getFragment, graphql } from "~/gql";
import {
  TagSearcher_ItemFragment,
  TagSearcher_ItemFragmentDoc,
  TagSearcher_SearchDocument,
} from "~/gql/graphql";

import { CommonTag } from "./Tag";

graphql(`
  query TagSearcher_Search($query: String!, $limit: Int!) {
    searchTags(input: { query: $query, limit: $limit }) {
      items {
        ...TagSearcher_Item
        tag {
          id
        }
      }
    }
  }
`);
export const TagSearcher: React.FC<{
  className?: string;
  handleSelect(id: string): void;
  limit?: number;
  disabled?: boolean;
  Optional?: React.FC<{ query: string; clearQuery(): void }>;
}> = ({ className, handleSelect, limit = 5, disabled = false, Optional }) => {
  const [query, setQuery] = useState<string>("");
  const [{ data, fetching }] = useQuery({
    query: TagSearcher_SearchDocument,
    pause: query === "",
    variables: query !== "" ? { query, limit } : undefined,
  });

  const items = getFragment(
    TagSearcher_ItemFragmentDoc,
    data?.searchTags.items
  );
  const clearQuery = useCallback(() => setQuery(""), []);

  return (
    <div className={clsx(className, ["relative"], ["group/searcher"])}>
      <label
        className={clsx(
          ["relative", "z-1"],
          ["flex", "items-stretch"],
          ["border", "border-slate-300"],
          ["rounded"],
          ["overflow-hidden"]
        )}
      >
        <div
          className={clsx(["flex", "items-center"], ["px-2"], ["bg-slate-400"])}
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
            ["text-sm"]
          )}
          onUpdateQuery={(q) => setQuery(q)}
          disabled={disabled}
        />
      </label>
      <div
        className={clsx(
          ["invisible", "group-focus-within/searcher:visible"],
          [["absolute"], ["z-infinity"], ["top-full"]],
          ["mt-0.5"],
          ["w-full"]
        )}
      >
        {items && 0 === items.length && (
          <div
            className={clsx(
              ["px-2", "py-2"],
              ["bg-white"],
              ["border", ["border-slate-300"]]
            )}
          >
            <p className={clsx(["text-xs"])}>
              該当するタグは見つかりませんでした
            </p>
          </div>
        )}
        {items && 0 < items.length && (
          <div
            className={clsx(
              ["flex", "flex-col", "items-stretch"],
              ["border", ["border-slate-300"]],
              ["divide-y", ["divide-slate-200"]]
            )}
          >
            {items.map((fragment) => (
              <Item
                key={fragment.tag.id}
                className={clsx()}
                fragment={fragment}
                handleSelect={handleSelect}
              />
            ))}
          </div>
        )}
        {Optional && query !== "" && (
          <div
            className={clsx(
              ["border", "border-slate-300"],
              ["px-2", "py-2"],
              ["flex", "flex-col", "items-start", "gap-y-1"],
              ["bg-white"]
            )}
          >
            <Optional query={query} clearQuery={clearQuery} />
          </div>
        )}
      </div>
    </div>
  );
};

graphql(`
  fragment TagSearcher_Item on SearchTagsItem {
    matchedName
    tag {
      ...CommonTag
      id
      name
    }
  }
`);
const Item: React.FC<{
  className?: string;
  handleSelect(id: string): void;
  fragment: TagSearcher_ItemFragment; // TODO: そのうち直す
}> = ({ className, handleSelect, fragment }) => {
  return (
    <button
      type="button"
      aria-label="検索候補"
      tabIndex={0}
      className={clsx(
        className,
        ["group/item"],
        ["px-2", "py-2"],
        ["flex", "flex-col", "items-start", "gap-y-1"],
        ["bg-white", "hover:bg-blue-200"]
      )}
      onClick={(e) => {
        handleSelect(fragment.tag.id);
        e.currentTarget.blur();
      }}
    >
      <CommonTag fragment={fragment.tag} />
      {fragment.tag.name !== fragment.matchedName && (
        <div className={clsx(["text-xs"], ["text-slate-700"])}>
          {fragment.matchedName}
        </div>
      )}
    </button>
  );
};
