"use client";
import "client-only";

import { ArrowPathIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import React, { useContext, useMemo } from "react";
import { useQuery } from "urql";

import { graphql } from "~/gql";
import { RegisterNiconicoPage_SearchTagsFromNicovideoTagDocument } from "~/gql/graphql";

import { FormContext } from "../FormContext";

graphql(`
  query RegisterNiconicoPage_SearchTagsFromNicovideoTag($query: String!) {
    searchTags(input: { query: $query, limit: 2 }) {
      result {
        matchedName
        tag {
          id
          name
          type: pseudoType
        }
      }
    }
  }
`);

export const isExcludeTagFromSearch = (v: string): boolean =>
  ["音MAD", "音mad"].includes(v);

export const CandidateTag: React.FC<{ className?: string; tag: string }> = ({
  className,
  tag,
}) => {
  const { addTag: addCandidateTag } = useContext(FormContext);
  const excludeFromSearch = useMemo(() => isExcludeTagFromSearch(tag), [tag]);
  const [result] = useQuery({
    query: RegisterNiconicoPage_SearchTagsFromNicovideoTagDocument,
    pause: excludeFromSearch,
    variables: {
      query: tag,
    },
  });

  const { fetching, data } = result;
  const tags = useMemo(() => {
    if (!data?.searchTags) return [];
    return data.searchTags.result.map(({ matchedName, tag }) => ({
      matchedName,
      tag: { id: tag.id, name: tag.name, type: tag.type },
    }));
  }, [data]);

  return (
    <div className={clsx(className, ["flex"], ["items-center"])}>
      <div className={clsx(["flex-shrink-0"], ["w-40"], ["px-2"])}>
        <span
          className={clsx(
            !excludeFromSearch && ["text-slate-900"],
            excludeFromSearch && ["text-slate-500"],
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
        {excludeFromSearch && (
          <div className={clsx(["text-xs"], ["text-slate-400"])}>
            検索対象外のタグです
          </div>
        )}
        {!excludeFromSearch && tags.length === 0 && (
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
                {tag.type}:{tag.name}
              </div>
            </button>
          </div>
        ))}
        {fetching && (
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
