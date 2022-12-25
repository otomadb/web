"use client";

import "client-only";

import clsx from "clsx";
import React, { useId } from "react";

import { ParentTag } from "./ParentTag";
import { TagAdder } from "./TagAdder";

export const ExplicitParentTag: React.FC<{
  className?: string;
  parent:
    | undefined
    | {
        tagId: string;
        name: string;
        explicitParent?: { tagId: string; name: string };
      };
  append(payload: {
    tagId: string;
    name: string;
    explicitParent?: {
      name: string;
      tagId: string;
    };
  }): void;
  remove(): void;
  selectedParentIds: string[];
}> = ({ className, parent, append, remove, selectedParentIds }) => {
  const labelId = useId();

  return (
    <div className={clsx(className)}>
      <label className={clsx(["text-sm"])} htmlFor={labelId}>
        明示的な親タグ
      </label>
      <div className={clsx(["mt-1"])}>
        {!parent && (
          <TagAdder
            id={labelId}
            placeholder={"明示的な親タグ"}
            handleSelect={(payload) => append(payload)}
            selectedIds={selectedParentIds}
          />
        )}
        {!!parent && (
          <ParentTag
            tag={{
              id: parent.tagId,
              name: parent.name,
              parentName: parent.explicitParent?.name,
            }}
            handleDelete={() => remove()}
          />
        )}
      </div>
    </div>
  );
};
