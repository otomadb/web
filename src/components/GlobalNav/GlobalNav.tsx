import clsx from "clsx";
import React from "react";

import { Profile } from "./Profile";
import { SearchBox } from "./SearchBox";

export const GlobalNav: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <nav className={clsx(className, ["bg-slate-900"], ["h-16"], ["shadow-lg"])}>
      <div
        className={clsx(
          ["h-full"],
          ["container", ["max-w-screen-xl"]],
          ["mx-auto"],
          ["flex", ["items-center"]]
        )}
      >
        <SearchBox className={clsx(["w-96"], ["flex-shrink-0"])} />
        <div className={clsx(["flex-grow"], ["flex", ["justify-end"]])}>
          <Profile />
        </div>
      </div>
    </nav>
  );
};
