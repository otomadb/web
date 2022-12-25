"use client";
import { ArrowPathIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import React, { useState } from "react";
import { useQuery } from "urql";

import { DelayedInput } from "~/components/common/DelayedInput";
import { graphql } from "~/gql";
import { RegisterTag_SearchTagsDocument } from "~/gql/graphql";

graphql(`
  query RegisterTag_SearchTags($query: String!) {
    searchTags(input: { query: $query, limit: 5 }) {
      items {
        matchedName
        tag {
          id
          name
          pseudoType
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
  selectedIds: string[];
  handleSelect(p: {
    tagId: string;
    name: string;
    explicitParent?: {
      tagId: string;
      name: string;
    };
  }): void;
}> = ({ query, classNames, handleSelect, selectedIds }) => {
  const [{ data, fetching }, refetch] = useQuery({
    query: RegisterTag_SearchTagsDocument,
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
            disabled={selectedIds.includes(tag.id)}
            className={clsx(
              ["w-full"],
              ["group/item"],
              ["disabled:bg-slate-300", ["bg-white", "hover:bg-blue-200"]],
              [["px-2"], ["py-2"]]
            )}
            onClick={async () => {
              await handleSelect({
                tagId: tag.id,
                name: tag.name,
                explicitParent: tag.explicitParent
                  ? {
                      tagId: tag.explicitParent.id,
                      name: tag.explicitParent.name,
                    }
                  : undefined,
              });
              await refetch();
            }}
          >
            <div className={clsx(["text-left"], ["text-xs"])}>
              <span
                className={clsx([
                  "group-disabled/item:text-slate-400",
                  ["text-slate-800"],
                ])}
              >
                {tag.name}
              </span>
              {tag.explicitParent && (
                <span
                  className={clsx(
                    ["ml-0.5"],
                    ["group-disabled/item:text-slate-400", ["text-slate-700"]]
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
          </button>
        ))}
    </div>
  );
};

export const TagAdder: React.FC<{
  className?: string;
  placeholder: string;
  selectedIds: string[];
  handleSelect(p: {
    tagId: string;
    name: string;
    explicitParent?: {
      tagId: string;
      name: string;
    };
  }): void;
  id?: string;
}> = ({ id, className, handleSelect, placeholder, selectedIds }) => {
  const [query, setQuery] = useState<string>("");

  return (
    <div className={clsx(className, ["flex"], ["group"], ["relative"])}>
      <DelayedInput
        id={id}
        placeholder={placeholder}
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
          ["invisible", "group-focus-within:visible"],
          ["w-full"],
          [["absolute"], ["z-infinity"], ["top-full"]]
        )}
        query={query}
        handleSelect={(p) => handleSelect(p)}
        selectedIds={selectedIds}
      />
    </div>
  );
};
