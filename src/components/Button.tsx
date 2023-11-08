import clsx from "clsx";
import React, { ComponentProps } from "react";

import Pictogram from "./Pictogram";

export default function Button({
  className,
  style,
  size,
  color,
  icon,
  disabled,
  ariaLabel,
  ...props
}: {
  children?: React.ReactNode;
  style?: React.CSSProperties;
  className?: string;
  size: "small" | "medium" | "large";
  color: "blue" | "red" | "green";
  disabled?: boolean;
  ariaLabel?: string;
} & (
  | { text: string; icon?: ComponentProps<typeof Pictogram>["icon"] }
  | { icon: ComponentProps<typeof Pictogram>["icon"] }
) &
  ({ onClick(): void } | { submit: true })) {
  return (
    <button
      type={"submit" in props ? "submit" : "button"}
      aria-label={ariaLabel}
      disabled={disabled}
      onClick={(e) => {
        if ("submit" in props) return;
        e.preventDefault();
        props.onClick();
      }}
      className={clsx(
        className,
        ["group/button flex items-center border"],
        {
          small: [
            ["gap-x-0.5 py-1", !icon && "px-4", icon && "rounded-sm px-3"],
          ],
          medium: [["gap-x-1 py-2", !icon && "px-6", icon && "rounded px-4"]],
          large: [["gap-x-2 py-3", !icon && "px-8", icon && "rounded px-6"]],
        }[size],
        {
          blue: [
            ["border-sky-600 bg-sky-800 hover:border-sky-400 hover:bg-sky-600"],
          ],
          green: [
            [
              "border-green-600 bg-green-800 hover:border-green-400 hover:bg-green-600",
            ],
          ],
          red: [
            [
              "border-rose-600 bg-rose-800 hover:border-rose-400 hover:bg-rose-600",
            ],
          ],
        }[color],
        ["disabled:border-slate-600 disabled:bg-slate-700"]
      )}
      style={style}
    >
      {icon && (
        <Pictogram
          className={clsx(
            ["font-bold"],
            {
              small: ["h-4"],
              medium: ["h-5"],
              large: ["h-6"],
            }[size],
            {
              blue: [["text-sky-500 group-hover/button:text-sky-300"]],
              green: [["text-green-500 group-hover/button:text-green-300"]],
              red: [["text-rose-500 group-hover/button:text-rose-300"]],
            }[color],
            "group-disabled/button:text-slate-600"
          )}
          icon={icon}
        />
      )}
      {"text" in props && props.text !== "" && (
        <span
          className={clsx(
            ["font-bold"],
            {
              small: ["text-sm"],
              medium: ["text-base"],
              large: ["text-2xl"],
            }[size],
            {
              blue: [["text-sky-400 group-hover/button:text-sky-300"]],
              green: [["text-green-400 group-hover/button:text-green-300"]],
              red: [["text-rose-400 group-hover/button:text-rose-300"]],
            }[color],
            "group-disabled/button:text-slate-600"
          )}
        >
          {props.text}
        </span>
      )}
    </button>
  );
}
