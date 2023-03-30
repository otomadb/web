"use client";

import clsx from "clsx";
import React from "react";
import { FragmentType, graphql, useFragment } from "~/gql";

import SuggestItem from "./SuggestItem";

export const Fragment = graphql(`
  fragment TagSearcher_Suggests on SearchTagsPayload {
    items {
      ...TagSearcher_SuggestItem
    }
  }
`);
const Suggest: React.FC<{
  className?: string;
  style?: React.CSSProperties;
  handleSelect(id: string): void;
  fragment: FragmentType<typeof Fragment>;
}> = ({ className, style, handleSelect, ...props }) => {
  const fragment = useFragment(Fragment, props.fragment);
  const { items } = fragment;

  return (
    <div className={clsx(className)} style={style}>
      {0 === items.length && (
        <div
          className={clsx(
            ["px-2", "py-2"],
            ["bg-white"],
            ["border", ["border-slate-300"]]
          )}
        >
          <p className={clsx(["text-xs"])}>
            該当するタグは見つかりませんでした
          </p>
        </div>
      )}
      {0 < items.length && (
        <div
          className={clsx(
            ["flex", "flex-col", "items-stretch"],
            ["border", ["border-slate-300"]],
            ["divide-y", ["divide-slate-200"]]
          )}
        >
          {items.map((fragment, i) => (
            <SuggestItem
              key={i}
              className={clsx()}
              fragment={fragment}
              handleSelect={handleSelect}
            />
          ))}
        </div>
      )}
    </div>
  );
};
export default Suggest;
