import clsx from "clsx";
import React from "react";

import { SideMylistList } from "./SideMylistList";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={clsx(["flex"], ["relative"], ["container", "mx-auto"])}>
      <SideMylistList
        className={clsx(
          ["flex-shrink-0"],
          ["w-72"],
          ["h-[calc(100vh-64px)]"],
          ["sticky", "top-[64px]"]
        )}
      />
      <div className={clsx(["flex-grow"])}>{children}</div>
    </div>
  );
}
