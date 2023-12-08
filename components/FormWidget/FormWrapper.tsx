"use client";

import clsx from "clsx";
import { ReactNode } from "react";

export const FormWrapper = ({
  className,
  style,
  Title,
  Form,
}: {
  className?: string;
  style?: React.CSSProperties;
  Title: ReactNode;
  Form: React.FC<{ className?: string }>;
}) => {
  return (
    <div
      style={style}
      className={clsx(
        className,
        "flex flex-col border border-obsidian-primary"
      )}
    >
      <div
        className={clsx(
          "flex shrink-0 items-center bg-obsidian-darkest px-4 py-2"
        )}
      >
        <div className={clsx("grow text-sm font-bold text-snow-primary")}>
          {Title}
        </div>
        <div className={clsx("shrink-0")}></div>
      </div>
      <div
        className={clsx(
          "grow border-t border-t-obsidian-primary bg-obsidian-darker p-4"
        )}
      >
        <Form className={clsx("h-full")} />
      </div>
    </div>
  );
};
