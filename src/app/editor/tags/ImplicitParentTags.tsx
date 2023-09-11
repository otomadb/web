"use client";

import "client-only";

import clsx from "clsx";
import React, { useId } from "react";
import { FieldArrayWithId } from "react-hook-form";

import { TagSearcher } from "~/components/TagSearcher";

import { FormSchema } from "./FormSchema";
import { SelectedTag } from "./SelectedTag";

export const ImplictParentTags: React.FC<{
  className?: string;
  style?: React.CSSProperties;

  implicitParents: FieldArrayWithId<FormSchema, "implicitParents", "id">[];
  append(payload: { tagId: string }): void;
  remove(index: number): void;

  explicitParentTagId?: string;
}> = ({ className, style, append, remove, implicitParents }) => {
  const labelId = useId();

  return (
    <div className={clsx(className)} style={style}>
      <label className={clsx(["text-sm"])} htmlFor={labelId}>
        <div className={clsx(["text-xs"], ["text-slate-900"])}>
          非明示的な親タグ
        </div>
        <TagSearcher
          className={clsx(["mt-1"])}
          handleSelect={(tagId) => append({ tagId })}
        />
      </label>
      <div className={clsx(["mt-2"], ["flex", "flex-col"], ["space-y-2"])}>
        {implicitParents.map((field, index) => (
          <SelectedTag
            key={field.id}
            tagId={field.tagId}
            remove={() => remove(index)}
          />
        ))}
      </div>
    </div>
  );
};
