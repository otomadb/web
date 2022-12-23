"use client";
import clsx from "clsx";
import React from "react";
import { FieldError, UseFormRegisterReturn } from "react-hook-form";

export const AuthFormInput: React.FC<
  UseFormRegisterReturn & {
    Icon: React.FC<{ className?: string }>;
    error?: FieldError | undefined;
    type: "text" | "password";
    placeholder: string;
  }
> = ({ Icon, error, type, placeholder, ...props }) => {
  return (
    <div>
      <label
        className={clsx(
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
              [["w-6"], ["h-6"]],
              ["text-teal-100"]
            )}
          />
        </div>
        <input
          {...props}
          type={type}
          placeholder={placeholder}
          aria-label="User name"
          className={clsx(
            ["flex-grow"],
            ["px-4", "py-2"],
            ["rounded-r-md"],
            ["bg-slate-50"],
            ["outline-teal-300"],
            [["text-md"], ["text-slate-900"], ["placeholder:text-slate-300"]]
          )}
        />
      </label>
      {error && (
        <p className={clsx(["mt-1"], ["text-xs"], ["text-red-600"])}>
          {error.message}
        </p>
      )}
    </div>
  );
};
