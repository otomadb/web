"use client";
import clsx from "clsx";
import React, { useId } from "react";
import { FieldError, UseFormRegisterReturn } from "react-hook-form";

export const PrimaryTitle: React.FC<{
  className?: string;
  register: UseFormRegisterReturn<string>;
  errors?: FieldError;
}> = ({ className, register, errors }) => {
  const id = useId();

  return (
    <div className={clsx(className, ["flex", "flex-col"])}>
      <label htmlFor={id}>
        <div className={clsx(["text-xs"], ["text-slate-900"])}>主な名前</div>
        <div className={clsx(["mt-1"], ["flex", "flex-col"])}>
          <div className={clsx(["w-full"])}>
            <input
              id={id}
              type={"text"}
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
              {...register}
            />
          </div>
          {errors && (
            <div className={clsx(["text-xs"], ["text-red-600"])}>
              {errors.message}
            </div>
          )}
        </div>
      </label>
    </div>
  );
};
