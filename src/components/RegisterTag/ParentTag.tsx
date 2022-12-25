import { XMarkIcon } from "@heroicons/react/24/solid";
import clsx from "clsx";
import React from "react";

export const ParentTag: React.FC<{
  className?: string;
  tag: {
    id: string;
    name: string;
    parentName?: string;
  };
  handleDelete(): void;
}> = ({ className, tag, handleDelete }) => {
  return (
    <div className={clsx(className, ["flex", "items-center"])}>
      <div
        className={clsx(
          ["py-0.5", "px-2"],
          ["border"],
          ["rounded"],
          ["shadow"],
          ["flex-grow"],
          ["text-sm"],
          ["bg-white"]
        )}
      >
        <span className={clsx(["text-slate-900"])}>{tag.name}</span>
        {tag.parentName && (
          <span className={clsx(["ml-0.5"], ["text-slate-500"])}>
            ({tag.parentName})
          </span>
        )}
      </div>
      <button
        type="button"
        className={clsx(
          ["ml-2"],
          ["group/button"],
          ["bg-red-400", "hover:bg-red-500"],
          ["px-2", "py-1"],
          ["rounded"]
        )}
        onClick={() => handleDelete()}
      >
        <XMarkIcon
          className={clsx(
            ["rounded"],
            ["shadow"],
            ["text-red-50", "group-hover:text-red-100"],
            ["w-4", "h-4"]
          )}
        />
      </button>
    </div>
  );
};
