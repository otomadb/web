"use client";

import clsx from "clsx";
import { ReactNode } from "react";

export default function Crust({
  className,
  style,
  children,
  duration,
  eatMe,
  type,
  onClick,
}: {
  className?: string;
  style?: React.CSSProperties;
  children: ReactNode;
  fired: number;
  duration: number | null;
  type: "info" | "warn" | "error";
  eatMe(): void;
  onClick?: () => void;
}) {
  return (
    <div
      onClick={() => {
        if (onClick) onClick();
        else eatMe();
      }}
      style={style}
      className={clsx(
        className,
        "group relative animate-[fade-slide-r-to-l_0.25s_both_ease-out] select-none border-l-4 bg-obsidian-primary/90 shadow-md backdrop-blur-md",
        {
          "cursor-pointer": !eatMe,
        },
        {
          info: "border-l-vivid-primary",
          warn: "border-l-warn-primary",
          error: "border-l-error-primary",
        }[type]
      )}
    >
      <div
        onAnimationEnd={() => eatMe()}
        style={{
          animationDuration: duration ? `${duration}ms` : undefined,
        }}
        className={clsx(
          "absolute bottom-0 h-[1px] w-full origin-left animate-[scale-x-1-to-0_both_linear] group-hover:animation-paused",
          {
            info: "bg-vivid-primary/50",
            warn: "bg-warn-primary/50",
            error: "bg-error-primary/50",
          }[type]
        )}
      />
      <div className={clsx("p-4")}>
        <p className={clsx("text-snow-primary")}>{children}</p>
      </div>
    </div>
  );
}
