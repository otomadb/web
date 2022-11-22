import clsx from "clsx";
import Link from "next/link";
import React from "react";

export const Tag: React.FC<{
  className?: string;
  id: string;
  name: string;
  context_name: string | null;
  type: string;
}> = ({ className, id, name, context_name: context, type }) => {
  return (
    <Link
      key={id}
      href={`/tags/${id}`}
      className={clsx(
        className,
        ["flex"],
        ["items-center"],
        ["whitespace-nowrap"],
        [
          "border",
          [
            "border-l-4",
            {
              "border-l-character-400": type === "CHARACTER",
              "border-l-class-400": type === "CLASS",
              "border-l-music-400": type === "MUSIC",
              "border-l-work-400": type === "WORK",
            },
          ],
          "border-t-gray-200",
          "border-b-gray-200",
          "border-r-gray-200",
        ],
        ["shadow-sm"],
        ["rounded"],
        ["pr-2", "pl-2", "py-0.5"]
      )}
    >
      <span className={clsx(["text-slate-800"], ["text-sm"])}>{name}</span>
      {context && (
        <span className={clsx(["ml-0.5"], ["text-slate-500"], ["text-xs"])}>
          ({context})
        </span>
      )}
    </Link>
  );
};
