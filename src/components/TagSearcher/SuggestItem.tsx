"use client";
import clsx from "clsx";
import React from "react";

import { CommonTag } from "~/components/CommonTag";
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
        ["group/item"],
        ["px-2", "py-2"],
        ["flex", "flex-col", "items-start", "gap-y-1"],
        ["bg-white", "hover:bg-blue-200"]
      )}
      onClick={(e) => {
        handleSelect(fragment.tag.id);
        e.currentTarget.blur();
      }}
    >
      <CommonTag
        fragment={fragment.tag}
        className={clsx(["text-xs"], ["px-1"], ["py-0.5"])}
      />
      {!fragment.name.primary && (
        <div className={clsx(["text-xs"], ["text-slate-700"])}>
          {fragment.name.name}
        </div>
      )}
    </button>
  );
};
export default SuggestItem;
