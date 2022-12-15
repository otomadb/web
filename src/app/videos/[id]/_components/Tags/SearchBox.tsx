"use client";

import clsx from "clsx";
import React from "react";
import useSWR from "swr";

import { graphql } from "~/gql";
import { VideoPage_TagEditor_SearchBoxDocument } from "~/gql/graphql";
import { useGraphQLClient } from "~/hooks/useGraphQLClient";

import { useVideoId } from "../../context";

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
  query: string;
  classNames?: string;
  setTag(payload: { id: string; name: string }): void;
}> = ({ query, classNames, setTag }) => {
  const gqlClient = useGraphQLClient();
  const videoId = useVideoId();
  const { data } = useSWR(
    query !== "" ? [VideoPage_TagEditor_SearchBoxDocument, query] : null,
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
              [["px-2"], ["py-2"]]
            )}
            disabled={!tag.canTagTo}
            onClick={() => {
              if (tag.canTagTo) setTag({ id: tag.id, name: tag.name });
            }}
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
