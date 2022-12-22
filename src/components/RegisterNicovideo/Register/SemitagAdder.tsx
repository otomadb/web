"use client";
import { PlusIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import React, { useState } from "react";

export const SemitagAdder: React.FC<{
  className?: string;
  addTag(name: string): void;
}> = ({ className, addTag }) => {
  const [input, setInput] = useState<string>("");

  return (
    <form className={clsx(className, ["flex", ["items-center"]])}>
      <input
        aria-label="仮タグ入力"
        className={clsx(
          ["px-2"],
          ["py-1"],
          ["text-xs"],
          ["font-mono"],
          ["bg-white"],
          ["border", "border-gray-300"],
          ["rounded"]
        )}
        value={input}
        onChange={(e) => {
          setInput(e.target.value);
        }}
      />
      <div
        aria-label="検索"
        className={clsx(
          ["ml-1"],
          ["bg-blue-400", "hover:bg-blue-500"],
          ["text-blue-50", "hover:text-blue-100"],
          ["px-1"],
          ["py-1"],
          ["rounded"],
          "cursor-pointer",
          ["flex", "items-center"]
        )}
        onClick={() => {
          addTag(input);
          setInput("");
        }}
      >
        <PlusIcon className={clsx(["w-4"], ["h-4"])} />
      </div>
    </form>
  );
};
