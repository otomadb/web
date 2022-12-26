"use client";

import "client-only";

import clsx from "clsx";
import React, { useId } from "react";

import { ParentTag } from "./ParentTag";
import { TagAdder } from "./TagAdder";

export const ExplicitParentTag: React.FC<{
  className?: string;
  tagId?: string;
  append(tagId: string): void;
  remove(): void;
  selectedParentIds: string[];
}> = ({ className, tagId, append, remove, selectedParentIds }) => {
  const labelId = useId();

  return (
    <div className={clsx(className, ["flex", "flex-col"])}>
      <label className={clsx(["text-sm"])} htmlFor={labelId}>
        明示的な親タグ
      </label>
      <div className={clsx(["mt-1"])}>
        {!tagId && (
          <TagAdder
            id={labelId}
            placeholder={"明示的な親タグ"}
            handleSelect={(payload) => append(payload.tagId)}
            selectedIds={selectedParentIds}
          />
        )}
        {!!tagId && <ParentTag tagId={tagId} handleDelete={() => remove()} />}
      </div>
    </div>
  );
};
