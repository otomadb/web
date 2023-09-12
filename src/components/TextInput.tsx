import clsx from "clsx";
import React, { forwardRef, useCallback, useState } from "react";

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
    size?: "medium";
    placeholder?: string;
    /**
     * @default false
     */
    autoComplete?: boolean;
    onChange(value: string): void;
  }
>(
  (
    {
      size = "medium",
      className,
      style,
      placeholder,
      autoComplete = false,
      onChange,
    },
    ref
  ) => {
    const [input, setInput] = useState("");

    const handleChange = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>): void => {
        const value = e.target.value;
        setInput(value);
        onChange(value);
      },
      [onChange]
    );

    return (
      <input
        ref={ref}
        className={clsx(
          className,
          ["bg-slate-950"],
          ["border", "border-slate-700"],
          ["text-slate-300", "placeholder-slate-600"],
          { medium: ["rounded", "py-1", "px-2", "text-sm"] }[size]
        )}
        style={style}
        type={"text"}
        value={input}
        placeholder={placeholder}
        autoComplete={autoComplete ? "on" : "off"}
        data-1p-ignore={autoComplete}
        onChange={handleChange}
      />
    );
  }
);
