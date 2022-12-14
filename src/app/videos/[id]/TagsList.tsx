"use client";
import { XMarkIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import React, { Fragment } from "react";

import { useUntagVideo } from "./context";
import { Tag } from "./Tag";
import { TagType } from "./types";

export const TagTypesList: React.FC<{
  className?: string;
  tags: TagType[];
}> = ({ className, tags }) => {
  return (
    <div className={clsx(className, ["flex"], ["gap-x-2"], ["gap-y-2"])}>
      {tags
        .map(({ type }) => type)
        .filter((v1, i, arr) => i === arr.findIndex((v2) => v1 === v2))
        .map((type) => (
          <div key={type} className={clsx(["flex"])}>
            <span
              className={clsx(["text-xs"], ["select-all"], {
                "text-copyright-400": type === "COPYRIGHT",
                "text-character-400": type === "CHARACTER",
                "text-class-400": type === "CLASS",
                "text-music-400": type === "MUSIC",
              })}
            >
              {type}
            </span>
          </div>
        ))}
    </div>
  );
};

export const RemoveButton: React.FC<{ className?: string; tagId: string }> = ({
  className,
  tagId,
}) => {
  const untag = useUntagVideo(tagId);
  return (
    <button
      onClick={() => untag()}
      className={clsx(
        className,
        ["rounded"],
        ["group"],
        ["bg-red-400", "hover:bg-red-600"],
        [["px-0.5"], ["py-0.5"]]
      )}
    >
      <XMarkIcon
        className={clsx(
          ["w-4"],
          ["h-4"],
          ["text-red-50", "group-hover:text-red-100"]
        )}
      />
    </button>
  );
};

export const TagsList: React.FC<{
  className?: string;
  tags: TagType[] | null;
  edit: boolean;
}> = ({ className, tags, edit }) => {
  if (!tags) return <div>LOADING</div>;
  return (
    <div className={className}>
      <TagTypesList tags={tags} />
      <div className={clsx(["mt-2"], ["flex", "flex-col"], ["gap-y-2"])}>
        {tags.map(({ id, name, explicitParent, type }) => (
          <Fragment key={id}>
            {!edit && (
              <Tag
                className={clsx(["self-start"])}
                id={id}
                name={name}
                type={type}
                contextName={explicitParent?.name}
              />
            )}
            {edit && (
              <div className={clsx(["flex"])}>
                <RemoveButton tagId={id} />
                <Tag
                  className={clsx(["ml-2"])}
                  id={id}
                  name={name}
                  type={type}
                  contextName={explicitParent?.name}
                />
              </div>
            )}
          </Fragment>
        ))}
      </div>
    </div>
  );
};
