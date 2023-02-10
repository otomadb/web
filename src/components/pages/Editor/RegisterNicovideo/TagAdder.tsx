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
  select(
    p: { type: "tag"; id: string } | { type: "semitag"; name: string }
  ): void;
}> = ({ query, className, select }) => {
  const [{ data }] = useQuery({
    query: RegisterNicovideoPage_SearchTagsDocument,
    pause: query === "",
    variables: query !== "" ? { query } : undefined,
  });

  return (
    <div className={clsx(className, ["pt-1"])}>
      <div
        className={clsx(
          ["divide-y", ["border-gray-300"]],
          ["overflow-hidden"],
          ["shadow-md"],
          ["rounded-md"]
        )}
      >
        {query !== "" && (
          <>
            <div>
              <div className={clsx(["bg-slate-200"], ["py-1"], ["px-2"])}>
                <div className={clsx(["text-slate-500"], ["text-xs"])}>
                  タグとして登録
                </div>
              </div>
              {data && (
                <>
                  {data.searchTags.items.length === 0 && (
                    <div className={clsx(["bg-slate-100"], ["py-1"], ["px-2"])}>
                      <div className={clsx(["text-slate-500"], ["text-xs"])}>
                        該当するタグはありませんでした
                      </div>
                    </div>
                  )}
                  {0 < data.searchTags.items.length && (
                    <div className={clsx(["flex"], ["flex-col"], ["divide-y"])}>
                      {data.searchTags.items.map(({ matchedName, tag }) => (
                        <div
                          role={"button"}
                          tabIndex={0}
                          key={tag.id}
                          className={clsx(
                            ["w-full"],
                            ["group/item"],
                            [
                              "disabled:bg-slate-200",
                              [
                                "bg-white",
                                "hover:bg-sky-300",
                                "focus:bg-sky-300",
                              ],
                            ],
                            ["px-2"],
                            ["py-2"]
                          )}
                          onClick={() => select({ type: "tag", id: tag.id })}
                        >
                          <div className={clsx(["text-left"], ["text-xs"])}>
                            <span
                              className={clsx([
                                "group-disabled/item:text-slate-400",
                                [
                                  "text-slate-900",
                                  "group-hover/item:text-sky-800",
                                  "group-focus/item:text-sky-800",
                                ],
                              ])}
                            >
                              {matchedName}
                            </span>
                            {tag.explicitParent && (
                              <span
                                className={clsx(
                                  ["ml-0.5"],
                                  [
                                    "group-disabled:/item:text-slate-400",
                                    [
                                      "text-slate-500",
                                      "group-hover/item:text-sky-400",
                                      "group-focus/item:text-sky-400",
                                    ],
                                  ]
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
                                [
                                  "group-disabled:text-slate-400",
                                  ["text-slate-600"],
                                ]
                              )}
                            >
                              {tag.name}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </>
              )}
            </div>
            <div>
              <div className={clsx(["bg-slate-200"], ["py-1"], ["px-2"])}>
                <div className={clsx(["text-slate-500"], ["text-xs"])}>
                  仮タグとして登録
                </div>
              </div>
              <div
                role={"button"}
                tabIndex={0}
                onClick={() => select({ type: "semitag", name: query })}
                className={clsx(
                  ["w-full"],
                  ["group/item"],
                  [
                    "disabled:bg-slate-200",
                    ["bg-white", "hover:bg-sky-300", "focus:bg-sky-300"],
                  ],
                  ["px-2"],
                  ["py-2"]
                )}
              >
                <div
                  className={clsx(
                    ["text-left"],
                    ["text-xs"],
                    [
                      "text-slate-900",
                      "group-hover/item:text-sky-800",
                      "group-focus/item:text-sky-800",
                    ]
                  )}
                >
                  {query}
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export const TagAdder: React.FC<{
  className?: string;
  select(
    p: { type: "tag"; id: string } | { type: "semitag"; name: string }
  ): void;
}> = ({ className, select }) => {
  const [query, setQuery] = useState<string>("");

  return (
    <div className={clsx(className, ["flex", ["items-center"]])}>
      <div className={clsx(["flex-grow"], ["group"], ["relative"])}>
        <DelayedInput
          aria-label="タグ検索"
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
          select={(p) => {
            select(p);
            setQuery("");
          }}
        />
      </div>
    </div>
  );
};
