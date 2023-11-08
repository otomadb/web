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
          ["shrink-0"],
          ["w-96"],
          ["h-[calc(100vh-64px)]"],
          ["sticky", "top-[64px]"]
        )}
      />
      <div className={clsx(["grow"])}>{children}</div>
    </div>
  );
}
