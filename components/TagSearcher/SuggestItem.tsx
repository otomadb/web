"use client";
import clsx from "clsx";
import React from "react";

import CommonTag from "~/components/CommonTag";
import { FragmentType, graphql, useFragment } from "~/gql";

export const Fragment = graphql(`
  fragment TagSearcher_SuggestItem on TagSearchItemByName {
    name {
      id
      name
      primary
    }
    tag {
      ...CommonTag
      id
    }
  }
`);
const SuggestItem: React.FC<{
  className?: string;
  handleSelect(id: string): void;
  fragment: FragmentType<typeof Fragment>;
}> = ({ className, handleSelect, ...props }) => {
  const fragment = useFragment(Fragment, props.fragment);

  return (
    <button
      type="button"
      aria-label="検索候補"
      tabIndex={0}
      className={clsx(
        className,
        ["group"],
        ["px-2", "py-2"],
        ["flex", "flex-col", "items-start"],
        ["bg-white", "hover:bg-teal-100"]
      )}
      onClick={(e) => {
        handleSelect(fragment.tag.id);
        e.currentTarget.blur();
      }}
    >
      <div>
        <CommonTag size="small" fragment={fragment.tag} />
      </div>
      {!fragment.name.primary && (
        <div className={clsx(["px-1"], ["mt-1"])}>
          <p
            className={clsx(
              ["text-xs", "italic"],
              ["text-slate-600", "group-hover:text-teal-800"]
            )}
          >
            {fragment.name.name}
          </p>
        </div>
      )}
    </button>
  );
};
export default SuggestItem;
