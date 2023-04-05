"use client";

import clsx from "clsx";
import { CSSProperties } from "react";

import { TopLink } from "~/app/Link";
import { SearchContents } from "~/components/common/SearchContents/SearchContents";

import { Logo } from "../Logo";
import Profile from "./Profile";

export default function GlobalNav({
  className,
  style,
}: {
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <nav
      className={clsx(
        className,
        ["z-infinity"],
        ["bg-slate-900"],
        ["shadow-lg"]
      )}
      style={style}
    >
      <div
        className={clsx(
          ["h-full"],
          ["container", ["max-w-screen-lg"]],
          ["mx-auto"],
          ["px-4"],
          ["flex", ["items-center"], ["justify-between"]],
          ["gap-x-0", "md:gap-x-2"]
        )}
      >
        <div
          className={clsx(
            ["hidden", ["md:flex", ["justify-center"]]],
            ["w-36"],
            ["flex-shrink-0"]
          )}
        >
          <TopLink>
            <Logo className={clsx(["text-2xl"], ["text-slate-50"])} />
          </TopLink>
        </div>
        <div className={clsx(["flex-grow"])}>
          <SearchContents className={clsx(["mx-auto"])} />
        </div>
        <Profile className={clsx(["w-36"], ["flex-shrink-0"])} />
      </div>
    </nav>
  );
}
