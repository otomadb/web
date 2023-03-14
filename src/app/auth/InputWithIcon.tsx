"use client";
import clsx from "clsx";
import React from "react";

export const InputWithIcon: React.FC<
  { Icon: React.FC<{ className?: string }> } & React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >
> = ({ className, Icon, ...props }) => {
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
      <input
        className={clsx(
          ["flex-grow"],
          ["px-4", "py-2"],
          ["rounded-r-md"],
          ["bg-slate-50"],
          ["outline-teal-300"],
          [["text-slate-900"], ["placeholder:text-slate-300"]]
        )}
        {...props}
      />
    </div>
  );
};
