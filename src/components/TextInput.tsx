import clsx from "clsx";
import React, { forwardRef } from "react";

// eslint-disable-next-line react/display-name
export const TextInput = forwardRef<
  HTMLInputElement,
  Omit<
    React.DetailedHTMLProps<
      React.InputHTMLAttributes<HTMLInputElement>,
      HTMLInputElement
    >,
    "type"
  >
>(({ className, ...props }, ref) => {
  return (
    <input
      {...props}
      type={"text"}
      ref={ref}
      className={clsx(
        className,
        ["bg-slate-50 outline-teal-300"],
        [["text-slate-900 placeholder:text-slate-300"]],
        ["rounded border border-gray-300"]
      )}
    />
  );
});

// eslint-disable-next-line react/display-name
export const TextInput2 = forwardRef<
  HTMLInputElement,
  {
    className?: string;
    style?: React.CSSProperties;
    /**
     * @default "medium"
     */
    size: "small" | "medium" | "large";
    placeholder?: string;
    /**
     * @default false
     */
    autoComplete?: boolean;
    onChange(value: string): void;
    value: string;
    LeftDecoration?: React.FC<{ disabled?: boolean }>;
    disabled?: boolean;
  }
>(
  (
    {
      size,
      className,
      style,
      placeholder,
      value,
      autoComplete = false,
      onChange,
      LeftDecoration,
      disabled = false,
    },
    ref
  ) => {
    return (
      <div
        style={style}
        className={clsx(
          className,
          [
            "group/textinput flex items-stretch border border-slate-700 outline-1 outline-sky-700 focus-within:outline aria-disabled:border-slate-700",
          ],
          {
            small: ["rounded-sm"],
            medium: ["rounded"],
            large: ["rounded-lg"],
          }[size]
        )}
        aria-disabled={disabled}
      >
        {LeftDecoration && (
          <div
            className={clsx(
              ["shrink-0"],
              {
                small: ["px-3"],
                medium: ["px-4"],
                large: ["px-6"],
              }[size],
              [
                "flex items-center bg-slate-800 group-aria-disabled/textinput:bg-slate-700",
              ]
            )}
          >
            <LeftDecoration disabled={disabled} />
          </div>
        )}
        <div
          className={clsx(
            ["grow bg-slate-950 group-aria-disabled/textinput:bg-slate-600"],
            {
              small: ["px-2 py-1 text-sm"],
              medium: ["px-4 py-1.5 text-base"],
              large: ["px-4 py-2 text-lg"],
            }[size]
          )}
        >
          <input
            ref={ref}
            className={clsx([
              "h-full w-full bg-transparent text-slate-300 outline-none placeholder:text-slate-700",
            ])}
            type={"text"}
            placeholder={placeholder}
            autoComplete={autoComplete ? "on" : "off"}
            data-1p-ignore={!autoComplete}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            disabled={disabled}
          />
        </div>
      </div>
    );
  }
);
