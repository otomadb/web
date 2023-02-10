"use client";

import { PlusIcon, XMarkIcon } from "@heroicons/react/24/solid";
import clsx from "clsx";
import React, { useId, useState } from "react";

const Adder: React.FC<{
  className?: string;
  handleClick(name: string): void;
}> = ({ className, handleClick }) => {
  const labelId = useId();
  const [input, setInput] = useState("");

  return (
    <div className={clsx(className, ["flex"], ["flex-col"])}>
      <label className={clsx(["text-sm"])} htmlFor={labelId}>
        追加の名前
      </label>
      <div className={clsx(["mt-1"], ["flex"])}>
        <input
          id={labelId}
          value={input}
          className={clsx(
            ["flex-grow"],
            ["rounded"],
            ["text-sm"],
            [["py-0.5"], ["px-2"]],
            ["bg-slate-100"],
            ["border", "border-slate-300"]
          )}
          onChange={(e) => setInput(e.target.value)}
          placeholder="タグの追加の名前"
        />
        <button
          type="button"
          className={clsx(
            ["ml-2"],
            ["flex-shrink-0"],
            ["px-2"],
            ["rounded"],
            ["bg-blue-400", "hover:bg-blue-500"],
            ["text-blue-50", "hover:text-blue-100"]
          )}
          onClick={() => {
            if (!input) return;
            handleClick(input);
            setInput("");
          }}
        >
          <PlusIcon className={clsx(["w-4"], ["h-4"])} />
        </button>
      </div>
    </div>
  );
};

export const ExtraName: React.FC<{
  className?: string;
  names: { id: string; name: string }[];

  Input: React.FC<{ index: number; className?: string }>;

  append(p: { name: string }): void;
  remove(index: number): void;
}> = ({ className, names, Input, append, remove }) => {
  return (
    <div className={clsx(className)}>
      <Adder handleClick={(name) => append({ name })} />
      {0 < names.length && (
        <div className={clsx(["mt-2"], ["flex", ["flex-col"]], ["space-y-2"])}>
          {names.map((field, index) => (
            <div key={field.id} className={clsx(className, ["flex"])}>
              <Input
                index={index}
                className={clsx(
                  ["flex-grow"],
                  [["py-0.5"], ["px-2"]],
                  ["border", "border-slate-300"],
                  ["disabled:bg-slate-200", "bg-slate-100"],
                  ["rounded"],
                  ["text-sm"],
                  ["disabled:text-slate-500", "text-slate-900"]
                )}
              />
              <button
                type="button"
                className={clsx(
                  ["ml-2"],
                  ["flex-shrink-0"],
                  ["px-2"],
                  ["rounded"],
                  ["bg-red-400", "hover:bg-red-500"],
                  ["text-red-50", "hover:text-red-100"]
                )}
                onClick={() => remove(index)}
              >
                <XMarkIcon className={clsx(["w-4"], ["h-4"])} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
