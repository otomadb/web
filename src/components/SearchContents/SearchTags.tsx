"use client";
import "client-only";

import clsx from "clsx";
import React from "react";

import { LinkTag } from "~/app/tags/[serial]/Link";
import { TagType } from "~/components/TagType";
import { FragmentType, graphql, useFragment } from "~/gql";

export const Fragment = graphql(`
  fragment SearchContents_SearchTags on SearchTagsPayload {
    items {
      name {
        name
      }
      tag {
        ...Link_Tag
        ...TagType
        id
        name
        type
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
  fragment: FragmentType<typeof Fragment>;
}> = ({ className, ...props }) => {
  const fragment = useFragment(Fragment, props.fragment);
  const { items } = fragment;

  return (
    <div className={clsx(className)}>
      {items.length === 0 && (
        <div className={clsx(["px-4", "py-2"])}>
          <p className={clsx(["text-xs"], ["text-slate-500"])}>該当なし</p>
        </div>
      )}
      <div className={clsx(["divide-y", "divide-slate-400/75"])}>
        {items.map(({ tag, name }) => (
          <LinkTag
            key={tag.id}
            fragment={tag}
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
                {name.name}
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
                <TagType className={clsx(["text-xs"])} fragment={tag} />
              </div>
            </div>
          </LinkTag>
        ))}
      </div>
    </div>
  );
};
