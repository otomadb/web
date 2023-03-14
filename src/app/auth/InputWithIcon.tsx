"use client";
import clsx from "clsx";
import React from "react";

export const InputWithIcon: React.FC<{
  className?: string;
  Icon: React.FC<{ className?: string }>;
  Input: React.FC<{ className?: string }>;
}> = ({ className, Icon, Input }) => {
  return (
    <div
      className={clsx(
        className,
        ["flex"],
        ["border", "border-slate-300"],
        ["rounded-md"],
        ["overflow-hidden"]
      )}
    >
      <div
        className={clsx(
          ["flex-shrink-0"],
          ["flex"],
          ["px-4"],
          [["bg-teal-400"]]
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
        className={clsx(["flex-grow"], ["px-4", "py-2"], ["rounded-r-md"])}
      />
    </div>
  );
};
