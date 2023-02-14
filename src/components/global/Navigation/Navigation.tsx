"use client";

import clsx from "clsx";
import React from "react";

import { LinkTop } from "~/components/common/Link";

import { Profile } from "./Profile/Profile";
import { SearchBox } from "./SearchBox/SearchBox";

export const GlobalNavigation: React.FC<{ className?: string }> = ({
  className,
}) => {
  return (
    <nav
      className={clsx(
        className,
        ["z-infinity"],
        ["bg-slate-900"],
        ["shadow-lg"]
      )}
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
            ["w-32"],
            ["flex-shrink-0"]
          )}
        >
          <LinkTop className={clsx(["text-white"])}>otomadb</LinkTop>
        </div>
        <div className={clsx(["flex-grow"])}>
          <SearchBox className={clsx(["mx-auto"])} />
        </div>
        <div
          className={clsx(
            ["w-32"],
            ["flex-shrink-0"],
            ["flex", ["justify-center"]]
          )}
        >
          <Profile />
        </div>
      </div>
    </nav>
  );
};
