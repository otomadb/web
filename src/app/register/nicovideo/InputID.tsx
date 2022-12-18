"use client";

import clsx from "clsx";
import React, { useState } from "react";

export const InputID: React.FC<{
  className?: string;
  handleClick(id: string): void;
}> = ({ className, handleClick }) => {
  const [input, setInput] = useState("");

  return (
    <form className={clsx(className, ["flex", ["items-stretch"]])}>
      <input
        aria-label="ID入力"
        className={clsx(
          ["px-2"],
          ["py-1"],
          ["text-sm"],
          ["bg-white"],
          ["border", "border-gray-300"],
          ["rounded"]
        )}
        value={input}
        onChange={(e) => {
          setInput(e.target.value);
        }}
        placeholder="sm2057168"
      />
      <input
        type="button"
        aria-label="検索"
        className={clsx(
          ["ml-1"],
          ["bg-blue-400", "hover:bg-blue-500"],
          ["text-blue-50", "hover:text-blue-100"],
          ["px-4"],
          ["rounded"],
          ["text-sm"],
          "cursor-pointer"
        )}
        onClick={() => {
          handleClick(input);
        }}
        value="検索"
      />
    </form>
  );
};
