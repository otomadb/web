"use client";

import clsx from "clsx";
import React from "react";
import { useQuery } from "urql";

import { graphql } from "~/gql";
import { VideoPage_TagEditor_SearchBoxDocument } from "~/gql/graphql";

graphql(`
  query VideoPage_TagEditor_SearchBox($query: String!, $videoId: ID!) {
    searchTags(input: { query: $query, limit: 5 }) {
      items {
        matchedName
        tag {
          id
          name
          pseudoType
          canTagTo(videoId: $videoId)
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
  setTag(payload: { id: string; name: string }): void;
  videoId: string;
}> = ({ query, classNames, setTag, videoId }) => {
  const [result] = useQuery({
    query: VideoPage_TagEditor_SearchBoxDocument,
    variables: { query, videoId },
  });
  const { data } = result;

  return (
    <div className={clsx(classNames, ["divide-y", ["border-gray-300"]])}>
      {data &&
        data.searchTags.items.map(({ matchedName, tag }) => (
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
