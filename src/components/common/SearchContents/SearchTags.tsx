"use client";
import "client-only";

import clsx from "clsx";
import React from "react";

import { LinkTag } from "~/app/tags/[serial]/Link";
import { getFragment, graphql } from "~/gql";
import {
  Link_TagFragmentDoc,
  SearchContents_SearchTagsFragment,
} from "~/gql/graphql";

graphql(`
  fragment SearchContents_SearchTags on SearchTagsPayload {
    items {
      matchedName
      tag {
        ...Link_Tag
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
`);
export const SearchTags: React.FC<{
  className?: string;
  fragment: SearchContents_SearchTagsFragment;
}> = ({ className, fragment }) => {
  const { items } = fragment;

  return (
    <div className={clsx(className)}>
      {items.length === 0 && (
        <div className={clsx(["px-4", "py-2"])}>
          <p className={clsx(["text-xs"], ["text-slate-500"])}>該当なし</p>
        </div>
      )}
      <div className={clsx(["divide-y", "divide-slate-400/75"])}>
        {items.map(({ tag, matchedName }) => (
          <LinkTag
            key={tag.id}
            fragment={getFragment(Link_TagFragmentDoc, tag)}
            tabIndex={0}
            className={clsx(
              [["flex"], ["items-center"]],
              ["divide-x", "border-slate-300/75"],
              ["hover:bg-sky-300/50", "focus:bg-sky-4 00/50"],
              ["py-2"]
            )}
            onClick={(e) => {
              e.currentTarget.blur();
            }}
          >
            <div className={clsx(["flex-shrink-0"], ["w-36"], ["px-2"])}>
              <div
                className={clsx(
                  ["text-slate-500"],
                  ["text-xs"],
                  ["text-right"]
                )}
              >
                {matchedName}
              </div>
            </div>
            <div
              className={clsx(
                ["flex-grow"],
                ["flex", "flex-col", "justify-start"],
                ["px-2"]
              )}
            >
              <div
                className={clsx(["text-slate-900"], ["text-sm"], ["font-bold"])}
              >
                {tag.name}
              </div>
              <div className={clsx(["flex"])}>
                <div
                  className={clsx(["text-xs"], ["italic"], {
                    "text-copyright-500": tag.pseudoType === "COPYRIGHT",
                    "text-character-500": tag.pseudoType === "CHARACTER",
                    "text-class-500": tag.pseudoType === "CLASS",
                    "text-music-500": tag.pseudoType === "MUSIC",
                    "text-series-500": tag.pseudoType === "SERIES",
                    "text-phrase-500": tag.pseudoType === "PHRASE",
                  })}
                >
                  {tag.pseudoType}
                </div>
              </div>
            </div>
          </LinkTag>
        ))}
      </div>
    </div>
  );
};
