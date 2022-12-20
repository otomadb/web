"use client";
import clsx from "clsx";
import React, { ComponentProps, Fragment } from "react";
import { useMemo } from "react";
import { useQuery } from "urql";

import { getFragment as useFragment, graphql } from "~/gql";
import {
  RegisterNicovideoPage_InnerTagFragmentDoc,
  RegisterNicovideoPage_ResultFragment,
  RegisterNicovideoPage_ResultFragmentDoc,
  RegisterNicovideoPage_SearchTagCandidatesDocument,
} from "~/gql/graphql";

import { TagInner } from "./TagInner";

export const isUnnecessarySearch = (tag: string) =>
  tag.toLowerCase() === "音mad";

graphql(`
  fragment RegisterNicovideoPage_Result on SearchTagsItem {
    matchedName
    tag {
      id
      ...RegisterNicovideoPage_InnerTag
    }
  }

  query RegisterNicovideoPage_SearchTagCandidates($query: String!) {
    searchTags(input: { query: $query, limit: 2 }) {
      items {
        ...RegisterNicovideoPage_Result
      }
    }
  }
`);

export const Candidate: React.FC<
  {
    item: RegisterNicovideoPage_ResultFragment;
  } & Omit<ComponentProps<typeof TagInner>, "className" | "fragment">
> = ({ item, ...props }) => {
  const fragment = useFragment(
    RegisterNicovideoPage_InnerTagFragmentDoc,
    item.tag
  );
  return (
    <Fragment>
      <TagInner tag={fragment} {...props} />
    </Fragment>
  );
};

export const NicovideoTag: React.FC<{
  className?: string;
  sourceTagName: string;
  currentTags: string[];
  reducer(v: { type: "add" | "remove"; id: string }): void;
}> = ({ className, sourceTagName, ...props }) => {
  const unneccesary = useMemo(
    () => isUnnecessarySearch(sourceTagName),
    [sourceTagName]
  );

  const [result] = useQuery({
    query: RegisterNicovideoPage_SearchTagCandidatesDocument,
    pause: unneccesary,
    variables: { query: sourceTagName },
  });
  const a = useFragment(
    RegisterNicovideoPage_ResultFragmentDoc,
    result.data?.searchTags.items
  );

  return (
    <div className={clsx(className)}>
      <div>
        <div className={clsx(["text-sm"], ["text-slate-900"], ["font-bold"])}>
          {sourceTagName}
        </div>
      </div>
      {unneccesary && (
        <p className={clsx(["text-xs"], ["text-slate-500"])}>
          検索対象外のタグです
        </p>
      )}
      {result.data?.searchTags.items && (
        <div className={clsx(["mt-1"])}>
          {result.data.searchTags.items.length === 0 && (
            <p className={clsx(["text-xs"], ["text-slate-500"])}>
              候補が見つかりませんでした
            </p>
          )}
          <div className={clsx(["w-full"], ["flex"], ["gap-x-2"])}>
            {a?.map((r, i) => (
              <Candidate key={i} item={r} {...props} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
