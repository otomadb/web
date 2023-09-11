"use client";

import "client-only";

import clsx from "clsx";
import React, { useId, useState } from "react";
import {
  FieldArrayWithId,
  UseFieldArrayAppend,
  UseFieldArrayRemove,
  UseFormRegisterReturn,
} from "react-hook-form";

import { BlueButton, RedButton } from "~/components/Button";

import { FormSchema } from "./FormSchema";
import { PlusIcon, XMarkIcon } from "./Icons";

export const ExtraNames: React.FC<{
  className?: string;
  register: (index: number) => UseFormRegisterReturn<string>;

  extraNames: FieldArrayWithId<FormSchema, "extraNames", "id">[];
  append: UseFieldArrayAppend<FormSchema, "extraNames">;
  remove: UseFieldArrayRemove;
}> = ({ className, extraNames, register, append, remove }) => {
  const id = useId();

  const [input, setInput] = useState("");

  return (
    <div className={clsx(className, ["flex", "flex-col"])}>
      <label htmlFor={id}>
        <div className={clsx(["text-xs"], ["text-slate-900"])}>追加の名前</div>
        <div className={clsx(["mt-1"], ["flex", "flex-col"])}>
          <div className={clsx(["w-full"], ["flex", "gap-x-2"])}>
            <input
              id={id}
              value={input}
              type={"text"}
              placeholder="タグの追加の名前"
              className={clsx(
                ["flex-grow"],
                ["rounded"],
                ["text-sm"],
                [["py-0.5"], ["px-2"]],
                ["bg-slate-100"],
                ["border", "border-slate-300"]
              )}
              onChange={(e) => setInput(e.target.value)}
            />
            <BlueButton
              type="button"
              className={clsx(["flex-shrink-0"], ["px-2"])}
              onClick={() => {
                if (!input) return;
                append({ name: input });
                setInput("");
              }}
            >
              <PlusIcon className={clsx(["w-4"], ["h-4"])} />
            </BlueButton>
          </div>
        </div>
      </label>
      <div className={clsx(["mt-2"], ["flex", "flex-col"], ["space-y-2"])}>
        {extraNames.map((field, index) => (
          <div key={field.id} className={clsx(["flex", "gap-x-2"])}>
            <input
              className={clsx(
                ["flex-grow"],
                ["rounded"],
                ["text-sm"],
                [["py-0.5"], ["px-2"]],
                ["bg-slate-200"],
                ["border", "border-slate-300"],
                ["text-slate-500"]
              )}
              type="text"
              disabled={true}
              {...register(index)}
            />
            <RedButton
              type="button"
              className={clsx(["flex-shrink-0"], ["px-2"])}
              onClick={() => remove(index)}
            >
              <XMarkIcon className={clsx(["w-4"], ["h-4"])} />
            </RedButton>
          </div>
        ))}
      </div>
    </div>
  );
};
