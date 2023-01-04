import clsx from "clsx";
import React from "react";

import { LinkTop } from "~/components/common/Link";

import { Profile } from "./Profile/Profile";
import { SearchBox } from "./SearchBox/SearchBox";

export const revalidate = 120;

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
          ["gap-x-8"]
        )}
      >
        <div className={clsx(["flex-shrink-0"], ["flex", ["justify-start"]])}>
          <LinkTop className={clsx(["text-white"])}>otomadb</LinkTop>
        </div>
        <div className={clsx(["flex-grow"], ["max-w-[640px]"])}>
          <SearchBox className={clsx(["mx-auto"])} />
        </div>
        <div className={clsx(["flex-shrink-0"], ["flex", ["justify-end"]])}>
          <Profile />
        </div>
      </div>
    </nav>
  );
};
