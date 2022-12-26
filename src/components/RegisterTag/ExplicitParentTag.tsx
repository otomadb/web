"use client";

import "client-only";

import clsx from "clsx";
import React, { useId } from "react";

import { ParentTag } from "./ParentTag";
import { TagAdder } from "./TagAdder";

export const ExplicitParentTag: React.FC<{
  className?: string;
  field?: {
    tag: {
      id: string;
      name: string;
      explicitParent?: { id: string; name: string };
    };
  };
  append(payload: {
    tag: {
      id: string;
      name: string;
      explicitParent?: { id: string; name: string };
    };
  }): void;
  remove(): void;
  selectedParentIds: string[];
}> = ({ className, field: parent, append, remove, selectedParentIds }) => {
  const labelId = useId();

  return (
    <div className={clsx(className, ["flex", "flex-col"])}>
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
              id: parent.tag.id,
              name: parent.tag.name,
              parentName: parent.tag.explicitParent?.name,
            }}
            handleDelete={() => remove()}
          />
        )}
      </div>
    </div>
  );
};
