import clsx from "clsx";
import React from "react";

import { SideMylistList } from "./SideMylistList";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={clsx("container relative mx-auto flex")}>
      <SideMylistList
        className={clsx([
          "sticky top-[64px] h-[calc(100vh-[64px])] w-96 shrink-0",
        ])}
      />
      <div className={clsx("grow")}>{children}</div>
    </div>
  );
}
