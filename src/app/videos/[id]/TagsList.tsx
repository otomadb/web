"use client";

import clsx from "clsx";
import React from "react";

import { Tag } from "./Tag";

export const TagsList: React.FC<{
  className?: string;
  tags: { id: string; name: string; type: string }[];
  edit: boolean;
}> = ({ className, tags }) => {
  return (
    <div className={className}>
      <div className={clsx(["mt-2"], ["flex"], ["gap-x-2"], ["gap-y-2"])}>
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
      <div
        className={clsx(
          ["mt-2"],
          ["flex", "flex-wrap"],
          ["gap-x-1"],
          ["gap-y-1"]
        )}
      >
        {tags.map(({ id, name, type }) => (
          <Tag key={id} id={id} name={name} context_name={null} type={type} />
        ))}
      </div>
    </div>
  );
};
