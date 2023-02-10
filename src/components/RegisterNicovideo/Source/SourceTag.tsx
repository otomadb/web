"use client";
import clsx from "clsx";
import React, { Fragment } from "react";

import { getFragment, getFragment as useFragment, graphql } from "~/gql";
import {
  RegisterNicovideoPage_FetchNicovideoTagCandidateFragment,
  RegisterNicovideoPage_FetchNicovideoTagCandidateFragmentDoc,
  RegisterNicovideoPage_FetchNicovideoTagCandidatesFragment,
  RegisterNicovideoPage_InnerTagFragmentDoc,
} from "~/gql/graphql";

import { TagInner } from "../TagInner";

export const isUnnecessarySearch = (tag: string) =>
  tag.toLowerCase() === "音mad";

graphql(`
  fragment RegisterNicovideoPage_FetchNicovideoTagCandidate on NicovideoOriginalSourceTagSearchTagsItem {
    tag {
      id
      ...RegisterNicovideoPage_InnerTag
    }
  }
`);
export const Candidate: React.FC<{
  className?: string;
  item: RegisterNicovideoPage_FetchNicovideoTagCandidateFragment;
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

graphql(`
  fragment RegisterNicovideoPage_FetchNicovideoTagCandidates on NicovideoOriginalSourceTagSearchTagsPayload {
    items {
      ...RegisterNicovideoPage_FetchNicovideoTagCandidate
    }
  }
`);

export const Candidates: React.FC<{
  className?: string;
  candidates: RegisterNicovideoPage_FetchNicovideoTagCandidatesFragment;
  isSelected(id: string): boolean;
  select(id: string): void;
  deselect(id: string): void;
}> = ({ className, candidates, isSelected, select, deselect }) => {
  return (
    <div className={clsx(className)}>
      {candidates.items.length === 0 && (
        <p className={clsx(["text-xs"], ["text-slate-500"])}>
          候補が見つかりませんでした
        </p>
      )}
      <div
        className={clsx(
          ["w-full"],
          ["flex", "flex-wrap"],
          ["gap-x-2"],
          ["gap-y-2"]
        )}
      >
        {candidates.items.map((item, i) => (
          <Candidate
            key={i}
            item={getFragment(
              RegisterNicovideoPage_FetchNicovideoTagCandidateFragmentDoc,
              item
            )}
            isSelected={isSelected}
            select={select}
            deselect={deselect}
          />
        ))}
      </div>
    </div>
  );
};

export const SourceTag: React.FC<{
  className?: string;
  candidates: RegisterNicovideoPage_FetchNicovideoTagCandidatesFragment;
  isSelected(id: string): boolean;
  select(id: string): void;
  deselect(id: string): void;
}> = ({ className, candidates, isSelected, select, deselect }) => {
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
          <div
            className={clsx(
              ["w-full"],
              ["flex", "flex-wrap"],
              ["gap-x-2"],
              ["gap-y-2"]
            )}
          >
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
