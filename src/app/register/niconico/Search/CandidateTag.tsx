"use client";
import "client-only";

import { ArrowPathIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import React, { useContext, useMemo, useState } from "react";
import useSWR from "swr";

import { graphql } from "~/gql";
import { gqlClient } from "~/gql/client";

import { FormContext } from "../FormContext";

export const SearchTagsQueryDocument = graphql(`
  query SearchTags3($query: String!) {
    searchTags(query: $query, limit: 2) {
      result {
        matchedName
        tag {
          id
          name
          type
        }
      }
    }
  }
`);

export const excludeTagFromSearch = (v: string): boolean =>
  ["音MAD"].includes(v);

export const CandidateTag: React.FC<{ className?: string; tag: string }> = ({
  className,
  tag,
}) => {
  const { addTag: addCandidateTag } = useContext(FormContext);
  const [tags, setTags] = useState<
    { matchedName: string; tag: { id: string; name: string; type: string } }[]
  >([]);
  const exclude = useMemo(() => excludeTagFromSearch(tag), [tag]);
  const { isValidating } = useSWR(
    !exclude ? [SearchTagsQueryDocument, tag] : null,
    (doc, query) => gqlClient.request(doc, { query }),
    {
      onSuccess(data) {
        const { searchTags } = data;
        setTags(
          searchTags.result.map(({ matchedName, tag: { id, name, type } }) => ({
            matchedName,
            tag: { id, name, type },
          }))
        );
      },
    }
  );
  return (
    <div className={clsx(className, ["flex"], ["items-center"])}>
      <div className={clsx(["flex-shrink-0"], ["w-40"], ["px-2"])}>
        <span
          className={clsx(
            !exclude && ["text-slate-900"],
            exclude && ["text-slate-500"],
            ["line-clamp-2"],
            ["text-xs"]
          )}
        >
          {tag}
        </span>
      </div>
      <div
        className={clsx(
          ["border-l"],
          ["px-2"],
          ["flex-grow"],
          ["flex"],
          ["items-center"]
        )}
      >
        {exclude && (
          <div className={clsx(["text-xs"], ["text-slate-400"])}>
            検索対象外のタグです
          </div>
        )}
        {!exclude && tags.length === 0 && (
          <div className={clsx(["text-xs"], ["text-slate-400"])}>
            候補のタグが存在しません
          </div>
        )}
        {tags.map(({ matchedName, tag }) => (
          <div key={tag.id} className={clsx()}>
            <button
              className={clsx(
                ["flex", ["items-center"]],
                ["rounded"],
                ["py-1", "px-2"],
                ["bg-slate-100", "hover:bg-slate-200"],
                ["border"]
              )}
              onClick={() => {
                addCandidateTag(tag.id);
              }}
            >
              <div className={clsx(["text-slate-900"], ["text-xs"])}>
                <span>{tag.type}</span>:<span>{tag.name}</span>
              </div>
            </button>
          </div>
        ))}
        {isValidating && (
          <div>
            <ArrowPathIcon
              className={clsx(["animate-spin"], ["w-3"], ["h-3"])}
            />
          </div>
        )}
      </div>
    </div>
  );
};
