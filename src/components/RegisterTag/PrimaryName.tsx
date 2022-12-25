"use client";
import clsx from "clsx";
import React, { useId } from "react";

export const PrimaryName: React.FC<{
  className?: string;
  Input: React.FC<{ id: string; className?: string; placeholder: string }>;
  errorMessage?: string;
}> = ({ className, Input, errorMessage }) => {
  const labelId = useId();

  return (
    <div className={clsx(className)}>
      <label className={clsx(["text-sm"])} htmlFor={labelId}>
        主な名前
      </label>
      <div className={clsx(["mt-1"], ["flex", "flex-col"])}>
        <div className={clsx(["w-full"])}>
          <Input
            id={labelId}
            placeholder="タグの主な名前"
            className={clsx(
              ["w-full"],
              ["flex-grow"],
              ["rounded"],
              ["text-sm"],
              [["py-0.5"], ["px-2"]],
              ["bg-slate-100"],
              ["border", "border-slate-300"]
            )}
          />
        </div>
        {errorMessage && (
          <div className={clsx(["text-xs"], ["text-red-600"])}>
            {errorMessage}
          </div>
        )}
      </div>
    </div>
  );
};
