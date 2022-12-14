"use client";

import "client-only";

import { PlusIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import React, { useState } from "react";
import useSWR from "swr";

import { DelayedInput } from "~/components/DelayedInput";
import { graphql } from "~/gql";
import { useGraphQLClient } from "~/hooks/useGraphQLClient";

import { useTagVideo, useVideoId } from "./context";

export const SearchTagsDocument = graphql(`
  query SearchTags($query: String!, $videoId: ID!) {
    searchTags(input: { query: $query, limit: 5 }) {
      result {
        matchedName
        tag {
          id
          name
          type: pseudoType
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
  query: string;
  classNames?: string;
  setTag(payload: { id: string; name: string }): void;
}> = ({ query, classNames, setTag }) => {
  const gqlClient = useGraphQLClient();
  const videoId = useVideoId();
  const { data } = useSWR(
    query !== "" ? [SearchTagsDocument, query] : null,
    ([doc, query]) => gqlClient.request(doc, { query, videoId })
  );
  return (
    <div className={clsx(classNames, ["divide-y", ["border-gray-300"]])}>
      {data &&
        data.searchTags.result.map(({ matchedName, tag }) => (
          <button
            key={tag.id}
            className={clsx(
              ["w-full"],
              ["group"],
              ["disabled:bg-slate-200", ["bg-blue-50", "hover:bg-blue-200"]],
              ["flex", ["flex-col"], ["justify-start"], ["items-start"]],
              [["px-2"], ["py-2"]]
            )}
            disabled={!tag.canTagTo}
            onClick={() => {
              if (tag.canTagTo) setTag({ id: tag.id, name: tag.name });
            }}
          >
            <span className={clsx(["text-left"], ["text-xs"])}>{tag.name}</span>
          </button>
        ))}
    </div>
  );
};

export const TagsEditer: React.FC<{ className?: string }> = ({ className }) => {
  const [query, setQuery] = useState<string>("");
  const [selected, setSelected] = useState<{ id: string; name: string } | null>(
    null
  );
  const tag = useTagVideo(selected?.id || null);

  return (
    <div className={clsx(className, ["flex"])}>
      <div className={clsx(["relative"], ["flex-grow"])}>
        <DelayedInput
          className={clsx(["w-full"], ["py-1"], ["px-2"], ["text-xs"])}
          inject={selected?.name}
          onUpdateQuery={(q) => {
            setQuery(q);
            if (q !== selected?.name) setSelected(null);
          }}
        />
        <SearchBox
          classNames={clsx(
            { invisible: query === "" || selected !== null },
            ["absolute"],
            ["top-100"],
            ["w-full"],
            ["border"]
          )}
          query={query}
          setTag={(v) => {
            setSelected(v);
          }}
        />
      </div>
      <button
        disabled={!selected?.id}
        className={clsx(
          ["px-2"],
          ["disabled:bg-slate-300", ["bg-blue-400"]],
          ["disabled:text-slate-100", ["text-slate-100"]]
        )}
        onClick={() => tag()}
      >
        <PlusIcon
          className={clsx(["place-content-center"], [["w-4"], ["h-4"]])}
        />
      </button>
    </div>
  );
};
