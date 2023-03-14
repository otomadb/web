"use client";
import clsx from "clsx";
import React from "react";

export const InputWithIcon: React.FC<{
  className?: string;
  Icon: React.FC<{ className?: string }>;
  Input: React.FC<{ className?: string }>;
}> = ({ className, Icon, Input }) => {
  return (
    <div className={clsx(className, ["flex"])}>
      <div
        className={clsx(
          ["flex-shrink-0"],
          ["flex"],
          ["px-4"],
          ["rounded-l-md"],
          [["bg-teal-400"]],
          ["border-l", "border-b", "border-t", "border-teal-500"]
        )}
      >
        <Icon
          className={clsx(
            ["place-self-center"],
            [["w-4"], ["h-4"]],
            ["text-teal-100"]
          )}
        />
      </div>
      <Input
        className={clsx(
          ["flex-grow"],
          ["px-4", "py-2"],
          ["rounded-r-md"],
          ["border-r", "border-b", "border-t", "border-slate-300"]
        )}
      />
    </div>
  );
};
