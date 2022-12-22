"use client";
import clsx from "clsx";
import React, { Fragment } from "react";
import { useMemo } from "react";
import { useQuery } from "urql";

import { getFragment as useFragment, graphql } from "~/gql";
import {
  RegisterNicovideoPage_InnerTagFragmentDoc,
  RegisterNicovideoPage_ResultFragment,
  RegisterNicovideoPage_ResultFragmentDoc,
  RegisterNicovideoPage_SearchTagCandidatesDocument,
} from "~/gql/graphql";

import { TagInner } from "../TagInner";

export const isUnnecessarySearch = (tag: string) =>
  tag.toLowerCase() === "音mad";

graphql(`
  fragment RegisterNicovideoPage_SearchItem on SearchTagsItem {
    matchedName
    tag {
      id
      ...RegisterNicovideoPage_InnerTag
    }
  }

  query RegisterNicovideoPage_SearchTagCandidates($query: String!) {
    searchTags(input: { query: $query, limit: 2 }) {
      items {
        ...RegisterNicovideoPage_SearchItem
      }
    }
  }
`);

export const Candidate: React.FC<{
  className?: string;
  item: RegisterNicovideoPage_ResultFragment;
  isSelected(id: string): boolean;
  select(id: string): void;
  deselect(id: string): void;
}> = ({ item, isSelected, select: add, deselect: remove }) => {
  const tag = useFragment(RegisterNicovideoPage_InnerTagFragmentDoc, item.tag);
  return (
    <Fragment>
      <TagInner
        tag={tag}
        selected={isSelected(tag.id)}
        select={() => add(tag.id)}
        deselect={() => remove(tag.id)}
      />
    </Fragment>
  );
};

export const SourceTag: React.FC<{
  className?: string;
  sourceTag: string;
  isSelected(id: string): boolean;
  select(id: string): void;
  deselect(id: string): void;
}> = ({ className, sourceTag, isSelected, select, deselect }) => {
  const unneccesary = useMemo(
    () => isUnnecessarySearch(sourceTag),
    [sourceTag]
  );

  const [result] = useQuery({
    query: RegisterNicovideoPage_SearchTagCandidatesDocument,
    pause: unneccesary,
    variables: { query: sourceTag },
    requestPolicy: "cache-and-network",
  });
  const items = useFragment(
    RegisterNicovideoPage_ResultFragmentDoc,
    result.data?.searchTags.items
  );

  return (
    <div className={clsx(className)}>
      <div>
        <div className={clsx(["text-sm"], ["text-slate-900"], ["font-bold"])}>
          {sourceTag}
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
            {items?.map((item, i) => (
              <Candidate
                key={i}
                item={item}
                isSelected={isSelected}
                select={select}
                deselect={deselect}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
