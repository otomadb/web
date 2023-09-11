"use client";

import "client-only";

import clsx from "clsx";
import React, { useId } from "react";
import { FieldError } from "react-hook-form";

import { TagSearcher } from "~/components/TagSearcher";

import { SelectedTag } from "./SelectedTag";

export const ExplicitParentTag: React.FC<{
  className?: string;
  style?: React.CSSProperties;

  explicitParentTagId?: string;
  set(id: string): void;
  removeSelected(): void;

  errors?: FieldError;

  implicitParentTagIds: string[];
}> = ({ className, style, explicitParentTagId, removeSelected, set }) => {
  const labelId = useId();

  return (
    <div className={clsx(className, ["flex", "flex-col"])} style={style}>
      <label className={clsx(["text-sm"])} htmlFor={labelId}>
        <div className={clsx(["text-xs"], ["text-slate-900"])}>
          明示的な親タグ
        </div>
        <TagSearcher
          className={clsx(["mt-1"])}
          handleSelect={(tagId) => set(tagId)}
          disabled={!!explicitParentTagId}
        />
      </label>
      {explicitParentTagId && (
        <SelectedTag
          className={clsx(["mt-2"])}
          tagId={explicitParentTagId}
          remove={() => removeSelected()}
        />
      )}
    </div>
  );
};
