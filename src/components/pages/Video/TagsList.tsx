"use client";
import { PencilSquareIcon } from "@heroicons/react/24/solid";
import clsx from "clsx";
import React, { useEffect, useMemo, useState } from "react";

import { LinkTag } from "~/app/tags/[serial]/Link";
import { Tag } from "~/components/common/Tag";
import { getFragment, graphql } from "~/gql";
import {
  Component_TagFragmentDoc,
  VideoPage_RemoveTagFormFragmentDoc,
  VideoPage_TagsListFragment,
  VideoPage_TagsListItemFragment,
  VideoPage_TagsListItemFragmentDoc,
} from "~/gql/graphql";

import { RemoveTagForm } from "./TagRemoveForm";

graphql(`
  fragment VideoPage_TagsList on Video {
    id
    tags(input: {}) {
      id
      ...VideoPage_TagsListItem
    }
  }
`);

export const TagsList: React.FC<{
  className?: string;
  edit: boolean;
  fragment: VideoPage_TagsListFragment;
}> = ({ className, fragment, edit }) => {
  const videoId = useMemo(() => fragment.id, [fragment]);

  const [radio, setRadio] = useState<string | undefined>(undefined);
  useEffect(() => {
    if (edit) return;
    setRadio(undefined);
  }, [edit]);

  return (
    <div className={clsx(className, ["flex", "flex-col", "gap-y-2"])}>
      <div
        className={clsx(
          ["flex", ["flex-row", "lg:flex-col"], ["flex-wrap"]],
          ["gap-x-1", "gap-y-1"]
        )}
      >
        {fragment.tags.map((tagging) => (
          <TagsListItem
            key={tagging.id}
            handleFocus={(v) => {
              if (v) setRadio(tagging.id);
              else setRadio(undefined);
            }}
            radio={tagging.id === radio}
            edit={edit}
            videoId={videoId}
            fragment={getFragment(VideoPage_TagsListItemFragmentDoc, tagging)}
          />
        ))}
      </div>
    </div>
  );
};

graphql(`
  fragment VideoPage_TagsListItem on VideoTag {
    tag {
      id
      ...Link_Tag
      ...Component_Tag
      ...VideoPage_RemoveTagForm
    }
  }
`);
export const TagsListItem: React.FC<{
  className?: string;
  videoId: string;
  edit: boolean;
  radio: boolean;
  handleFocus(v: boolean): void;
  fragment: VideoPage_TagsListItemFragment;
}> = ({ className, fragment, edit, radio, handleFocus, videoId }) => {
  const untag = getFragment(VideoPage_RemoveTagFormFragmentDoc, fragment.tag);

  return (
    <div
      className={clsx(className, ["flex", "justify-between", "items-center"])}
    >
      <Tag
        tag={getFragment(Component_TagFragmentDoc, fragment.tag)}
        Wrapper={({ ...props }) =>
          edit ? (
            <div {...props} />
          ) : (
            <LinkTag fragment={fragment.tag} {...props} />
          )
        }
      />
      {edit && (
        <div className={clsx(["relative"], ["flex"])}>
          <div
            role="radio"
            aria-checked={radio}
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
            onClick={() => handleFocus(!radio)}
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
          {radio && (
            <div className={clsx(["absolute", "left-full"], ["z-infinity"])}>
              <div
                className={clsx(["fixed", "inset-0"], ["z-0"], ["bg-black/25"])}
                onClick={() => handleFocus(false)}
              />
              <RemoveTagForm
                className={clsx(
                  ["absolute", "left-0", "top-0"],
                  ["ml-2"],
                  ["z-1"],
                  ["w-96"]
                )}
                videoId={videoId}
                fragment={untag}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
};
