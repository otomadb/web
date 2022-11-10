import clsx from "clsx";
import Link from "next/link";
import React from "react";

export const Tag: React.FC<{
  id: string;
  name_primary: string;
  context: string | null;
  type: string;
}> = ({ id, name_primary, context, type }) => {
  return (
    <Link
      key={id}
      href={`/tags/${id}`}
      className={clsx(
        ["flex"],
        ["items-center"],
        ["whitespace-nowrap"],
        [
          "border",
          [
            "border-l-4",
            {
              "border-l-lime-400": type === "BACKGROUND_MUSIC",
              "border-l-pink-400": type === "ANIME",
              "border-l-blue-400": type === "CHARACTER",
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
      <span className={clsx(["text-slate-800"], ["text-sm"])}>
        {name_primary}
      </span>
      {context && (
        <span className={clsx(["ml-0.5"], ["text-slate-500"], ["text-xs"])}>
          ({context})
        </span>
      )}
    </Link>
  );
};
