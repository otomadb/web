"use client";

import clsx from "clsx";
import React from "react";

import { LinkVideo } from "~/app/videos/[serial]/Link";
import { Thumbnail } from "~/components/common/Thumbnail";
import { getFragment, getFragment as useFragment, graphql } from "~/gql";
import {
  Component_ThumbnailFragmentDoc,
  EditorRegisterNicovideoPage_AlreadyFragment,
  Link_VideoFragmentDoc,
  RegisterNicovideoPage_FetchNicovideoTagCandidateFragment,
  RegisterNicovideoPage_FetchNicovideoTagCandidateFragmentDoc,
  RegisterNicovideoPage_FetchNicovideoTagCandidatesFragment,
  RegisterNicovideoPage_InnerTagFragmentDoc,
} from "~/gql/graphql";

import { TagInner } from "./TagInner";

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
    <TagInner
      tag={tag}
      selected={isSelected(tag.id)}
      select={() => add(tag.id)}
      deselect={() => remove(tag.id)}
    />
  );
};

graphql(`
  fragment EditorRegisterNicovideoPage_Already on NicovideoVideoSource {
    sourceId
    video {
      id
      title
      ...Link_Video
      ...Component_Thumbnail
    }
  }
`);
export const Already: React.FC<{
  className?: string;
  fragment: EditorRegisterNicovideoPage_AlreadyFragment;
}> = ({ className, fragment }) => (
  <div className={clsx(className, ["mt-4"], ["flex", "flex-col"])}>
    <Thumbnail
      width={260}
      height={200}
      fragment={getFragment(Component_ThumbnailFragmentDoc, fragment.video)}
    />
    <p className={clsx(["mt-2"], ["text-sm"], ["text-slate-700"])}>
      <span className={clsx(["font-mono"])}>{fragment.sourceId}</span>は
      <LinkVideo
        className={clsx(["font-bold"], ["text-slate-900"])}
        fragment={getFragment(Link_VideoFragmentDoc, fragment.video)}
      >
        {fragment.video.title}
      </LinkVideo>
      として既に登録されています。
    </p>
  </div>
);
