"use client";
import { PencilSquareIcon } from "@heroicons/react/24/solid";
import clsx from "clsx";
import React, { useEffect, useMemo, useState } from "react";

import { Tag } from "~/components/common/Tag";
import { TagSearcher } from "~/components/common/TagSearcher";
import { getFragment, graphql } from "~/gql";
import {
  VideoPage_RemoveTagFormFragmentDoc,
  VideoPage_TagFragmentDoc,
  VideoPage_TagsListFragment,
  VideoPage_TagsListItemFragment,
  VideoPage_TagsListItemFragmentDoc,
  VideoPage_TagsTypesListFragmentDoc,
} from "~/gql/graphql";

import { AddTagForm } from "./AddTagForm";
import { RemoveTagForm } from "./RemoveTagForm";
import { TagTypesList } from "./TagTypesList";

graphql(`
  fragment VideoPage_TagsListItem on Tag {
    id
    ...VideoPage_Tag
    ...VideoPage_RemoveTagForm
  }

  fragment VideoPage_TagsList on Video {
    id
    tags {
      ...VideoPage_TagsListItem
    }
    ...VideoPage_TagsTypesList
  }
`);

export const TagsListItem: React.FC<{
  className?: string;
  videoId: string;
  edit: boolean;
  open: boolean;
  handleOpen(): void;
  fragment: VideoPage_TagsListItemFragment;
}> = ({ className, fragment, edit, open, handleOpen, videoId }) => {
  const tag = getFragment(VideoPage_TagFragmentDoc, fragment);
  const untag = getFragment(VideoPage_RemoveTagFormFragmentDoc, fragment);

  return (
    <div
      className={clsx(className, ["flex", "justify-between", "items-center"])}
    >
      <Tag tag={tag} />
      {edit && (
        <div className={clsx(["relative"], ["flex"])}>
          <div
            role="radio"
            aria-checked={open}
            className={clsx(
              ["ml-1"],
              ["px-2", "py-0.5"],
              ["group/edit", "peer/edit"],
              ["border", "border-slate-300"],
              [
                "aria-checked:bg-slate-400",
                ["bg-slate-200", "hover:bg-slate-300"],
              ],
              ["rounded"],
              ["z-20"]
            )}
            onClick={() => handleOpen()}
          >
            <PencilSquareIcon
              className={clsx(
                ["w-3", "h-3"],
                [
                  "group-aria-checked/edit:text-slate-300",
                  ["text-slate-900", "group-hover/edit:text-slate-800"],
                ]
              )}
            />
          </div>
          <div
            className={clsx(
              ["hidden", "peer-aria-checked/edit:block"],
              ["fixed", "inset-0"],
              ["z-10"]
            )}
            onClick={() => handleOpen()}
          />
          {open && (
            <RemoveTagForm
              className={clsx(
                ["absolute", "left-full", "top-0"],
                ["ml-2", "-mt-2"],
                ["z-30"]
              )}
              videoId={videoId}
              fragment={untag}
            />
          )}
        </div>
      )}
    </div>
  );
};

export const TagsList: React.FC<{
  className?: string;
  edit: boolean;
  fragment: VideoPage_TagsListFragment;
}> = ({ className, fragment, edit }) => {
  const tagtypes = getFragment(VideoPage_TagsTypesListFragmentDoc, fragment);
  const tags = getFragment(VideoPage_TagsListItemFragmentDoc, fragment.tags);

  const videoId = useMemo(() => fragment.id, [fragment]);

  const [addTagId, setAddTagId] = useState<string | undefined>(undefined);
  const [removeId, setRemoveId] = useState<string | undefined>(undefined);
  useEffect(() => {
    if (!edit) {
      setRemoveId(undefined);
      setAddTagId(undefined);
    }
  }, [edit]);

  return (
    <div className={clsx(className, ["flex", "flex-col", "gap-y-2"])}>
      <TagTypesList fragment={tagtypes} />
      <div
        className={clsx(
          ["flex", ["flex-row", "lg:flex-col"], ["flex-wrap"]],
          ["gap-x-1", "gap-y-1"]
        )}
      >
        {tags.map((tag) => (
          <TagsListItem
            key={tag.id}
            handleOpen={() => {
              if (tag.id === removeId) {
                setRemoveId(undefined);
              } else {
                setRemoveId(tag.id);
                setAddTagId(undefined);
              }
            }}
            open={tag.id === removeId}
            edit={edit}
            videoId={videoId}
            fragment={tag}
          />
        ))}
      </div>
      {edit && (
        <div className={clsx(["flex"], ["relative"])}>
          <TagSearcher
            className={clsx(["w-full"], ["z-20"])}
            handleSelect={(id) => {
              setAddTagId(id);
            }}
          />
          {addTagId && (
            <>
              <div
                className={clsx(["block"], ["fixed", "inset-0"], ["z-10"])}
                onClick={() => {
                  setAddTagId(undefined);
                }}
              />
              <AddTagForm
                className={clsx(
                  ["z-30"],
                  ["absolute", "left-full", "top-0"],
                  ["w-72"],
                  ["ml-2", "-mt-2"]
                )}
                videoId={videoId}
                tagId={addTagId}
                clear={() => {
                  setAddTagId(undefined);
                  setRemoveId(undefined);
                }}
              />
            </>
          )}
        </div>
      )}
    </div>
  );
};
