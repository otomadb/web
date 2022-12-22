"use client";

import clsx from "clsx";
import React, { useState } from "react";
import { useQuery } from "urql";

import { DelayedInput } from "~/components/common/DelayedInput";
import { graphql } from "~/gql";
import { RegisterNicovideoPage_SearchTagsDocument } from "~/gql/graphql";

graphql(`
  query RegisterNicovideoPage_SearchTags($query: String!) {
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
  className?: string;
  query: string;
  select(id: string): void;
}> = ({ query, className, select }) => {
  const [{ data }] = useQuery({
    query: RegisterNicovideoPage_SearchTagsDocument,
    pause: query === "",
    variables: query !== "" ? { query } : undefined,
  });

  return (
    <div className={clsx(className, ["divide-y", ["border-gray-300"]])}>
      {query !== "" &&
        data &&
        data.searchTags.items.map(({ matchedName, tag }) => (
          <button
            key={tag.id}
            className={clsx(
              ["w-full"],
              ["group"],
              ["disabled:bg-slate-200", ["bg-white", "hover:bg-blue-200"]],
              [["px-2"], ["py-2"]]
            )}
            onClick={() => select(tag.id)}
          >
            <div className={clsx(["text-left"], ["text-xs"])}>
              <span
                className={clsx([
                  "group-disabled:text-slate-400",
                  ["text-slate-800"],
                ])}
              >
                {matchedName}
              </span>
              {tag.explicitParent && (
                <span
                  className={clsx(
                    ["ml-0.5"],
                    ["group-disabled:text-slate-400", ["text-slate-500"]]
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
                  ["group-disabled:text-slate-400", ["text-slate-600"]]
                )}
              >
                {tag.name}
              </div>
            )}
          </button>
        ))}
    </div>
  );
};

export const TagAdder: React.FC<{
  className?: string;
  select(id: string): void;
}> = ({ className, select }) => {
  const [query, setQuery] = useState<string>("");

  return (
    <div className={clsx(className, ["group"], ["relative"])}>
      <DelayedInput
        className={clsx(
          ["bg-slate-50"],
          ["border", "border-slate-300"],
          ["rounded"],
          ["w-full"],
          ["px-1"],
          ["py-0.5"],
          ["text-sm"]
        )}
        value={query}
        onUpdateQuery={(q) => {
          setQuery(q);
        }}
      />
      <SearchBox
        className={clsx(
          ["invisible", "group-focus-within:visible"],
          ["absolute"],
          ["w-full"],
          ["top-full"]
        )}
        query={query}
        select={(i) => {
          setQuery("");
          select(i);
        }}
      />
    </div>
  );
};
