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
        ["bg-slate-50"],
        ["outline-teal-300"],
        [["text-slate-900"], ["placeholder:text-slate-300"]],
        ["border", "border-gray-300", "rounded"]
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
    },
    ref
  ) => {
    return (
      <div
        style={style}
        className={clsx(
          className,
          ["bg-slate-950"],
          ["border", "border-slate-700"],
          ["text-slate-300", "placeholder-slate-600"],
          ["focus-within:outline", "outline-1", "outline-sky-700"],
          {
            small: ["rounded-sm", "py-1", "px-2", "text-sm"],
            medium: ["rounded", "py-1.5", "px-4", "text-base"],
            large: ["rounded-lg", "py-2", "px-4", "text-lg"],
          }[size]
        )}
      >
        <input
          ref={ref}
          className={clsx(
            ["w-full", "h-full"],
            ["bg-transparent"],
            ["outline-none"]
          )}
          type={"text"}
          placeholder={placeholder}
          autoComplete={autoComplete ? "on" : "off"}
          data-1p-ignore={!autoComplete}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      </div>
    );
  }
);
