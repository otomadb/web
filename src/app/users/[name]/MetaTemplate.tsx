"use client";
import clsx from "clsx";
import React, { ComponentProps } from "react";

import { SideMylistList } from "./mylists/SideMylistList";

export const MetaTemplate: React.FC<{
  sidelist?: ComponentProps<typeof SideMylistList>["fallback"];
  Main: React.FC<{ className?: string }>;
}> = ({ sidelist, Main }) => {
  return (
    <div className={clsx(["@container"], ["flex"], ["gap-x-4"])}>
      <div
        className={clsx(
          ["hidden", "xl:block"],
          ["flex-grow"],
          ["sticky", "top-[64px]"],
          ["h-[calc(100vh-64px)]"]
        )}
      >
        {sidelist && <SideMylistList fragment={sidelist} />}
      </div>
      <div
        className={clsx(
          ["flex-shrink-0"],
          ["flex-grow", "xl:flex-grow-0"],
          ["xl:w-[1024px]"]
        )}
      >
        <Main className={clsx(["w-full"])} />
      </div>
    </div>
  );
};
