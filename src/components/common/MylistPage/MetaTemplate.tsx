"use client";
import clsx from "clsx";
import React, { ComponentProps } from "react";

import { SideMylistList } from "./SideMylistList";

export const MetaTemplate: React.FC<{
  sidelist?: ComponentProps<typeof SideMylistList>["fallback"];
  Main: React.FC<{ className?: string }>;
}> = ({ sidelist, Main }) => {
  return (
    <div className={clsx(["@container"], ["flex"], ["gap-x-4"])}>
      <div className={clsx(["hidden", "xl:block"], ["flex-grow"])}>
        {sidelist && <SideMylistList fallback={sidelist} />}
      </div>
      <div
        className={clsx(
          ["flex-shrink-0"],
          ["flex-grow", "xl:flex-grow-0"],
          ["xl:w-[1024px]"]
        )}
      >
        <Main />
      </div>
    </div>
  );
};
