"use client";

import "client-only";

import clsx from "clsx";
import React, { useId } from "react";

import { ParentTag } from "./ParentTag";
import { TagAdder } from "./TagAdder";

export const ImplictParentTags: React.FC<{
  className?: string;

  parents: {
    tagId: string;
    name: string;
    explicitParent?: {
      tagId: string;
      name: string;
    };
  }[];

  append(payload: {
    tagId: string;
    name: string;
    explicitParent?: {
      tagId: string;
      name: string;
    };
  }): void;
  remove(index: number): void;
  selectedParentIds: string[];
}> = ({ className, append, remove, selectedParentIds, parents }) => {
  const labelId = useId();

  return (
    <div className={clsx(className)}>
      <label className={clsx(["text-sm"])} htmlFor={labelId}>
        非明示的な親タグ
      </label>
      <div className={clsx(["mt-1"])}>
        <TagAdder
          id={labelId}
          placeholder={"非明示的な親タグ"}
          handleSelect={(payload) => {
            append(payload);
          }}
          selectedIds={selectedParentIds}
        />
        {0 < parents.length && (
          <div className={clsx(["mt-2"], ["w-full"], ["space-y-2"])}>
            {parents.map((parent, index) => (
              <ParentTag
                key={parent.tagId}
                tag={{
                  id: parent.tagId,
                  name: parent.name,
                  parentName: parent.explicitParent?.name,
                }}
                handleDelete={() => remove(index)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
