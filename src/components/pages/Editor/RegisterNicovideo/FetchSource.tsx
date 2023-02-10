"use client";

import clsx from "clsx";
import React, { useState } from "react";

export const FetchSource: React.FC<{
  className?: string;
  setSourceId(sourceId: string): void;
}> = ({ className, setSourceId }) => {
  const [input, setInput] = useState<string>("");

  return (
    <form className={clsx(className, ["flex", ["items-stretch"]])}>
      <input
        aria-label="ID入力"
        className={clsx(
          ["px-2"],
          ["py-1"],
          ["font-mono"],
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
      <div
        role={"button"}
        aria-label="検索"
        className={clsx(
          ["ml-1"],
          ["bg-blue-400", "hover:bg-blue-500"],
          ["text-blue-50", "hover:text-blue-100"],
          ["px-4"],
          ["rounded"],
          ["cursor-pointer"],
          ["flex", "items-center"]
        )}
        onClick={() => {
          if (/(sm)\d+/.test(input)) setSourceId(input);
        }}
      >
        <div>検索</div>
      </div>
    </form>
  );
};
