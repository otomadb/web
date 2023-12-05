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
        "rounded border border-obsidian-lighter bg-obsidian-darkest px-2 py-1 text-snow-primary outline-1 outline-vivid-primary placeholder:text-obsidian-lightest"
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
          ["group/textinput"],
          ["flex", "items-stretch"],
          ["border", "border-slate-700", "aria-disabled:border-slate-700"],
          ["focus-within:outline", "outline-1", "outline-sky-700"],
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
              ["bg-slate-800", "group-aria-disabled/textinput:bg-slate-700"],
              ["flex", "items-center"]
            )}
          >
            <LeftDecoration disabled={disabled} />
          </div>
        )}
        <div
          className={clsx(
            ["grow"],
            ["bg-slate-950", "group-aria-disabled/textinput:bg-slate-600"],
            {
              small: ["py-1", "px-2", "text-sm"],
              medium: ["py-1.5", "px-4", "text-base"],
              large: ["py-2", "px-4", "text-lg"],
            }[size]
          )}
        >
          <input
            ref={ref}
            className={clsx(
              ["w-full", "h-full"],
              ["bg-transparent"],
              ["outline-none"],
              ["text-slate-300", "placeholder:text-slate-700"]
            )}
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
