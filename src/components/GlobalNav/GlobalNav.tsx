import clsx from "clsx";
import Link from "next/link";
import React from "react";

import { Profile } from "./Profile";
import { SearchBox } from "./SearchBox";

export const revalidate = 120;

export const GlobalNav: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <nav className={clsx(className, ["bg-slate-900"], ["shadow-lg"])}>
      <div
        className={clsx(
          ["h-full"],
          ["container", ["max-w-screen-xl"]],
          ["mx-auto"],
          ["px-4"],
          ["flex", ["items-center"]]
        )}
      >
        <div className={clsx(["flex-shrink-0"], ["flex", ["justify-start"]])}>
          <Link href="/" className={clsx(["text-white"])}>
            otomadb
          </Link>
        </div>
        <div className={clsx(["flex-grow"], ["px-8"])}>
          <SearchBox className={clsx(["mx-auto"], ["max-w-xl"])} />
        </div>
        <div className={clsx(["flex-shrink-0"], ["flex", ["justify-end"]])}>
          <Profile />
        </div>
      </div>
    </nav>
  );
};
