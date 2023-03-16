import clsx from "clsx";
import React from "react";

import { YouPageGuard } from "./Guard";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={clsx(["h-full"])}>
      <div className={clsx(["container", "max-w-screen-xl", "mx-auto"])}>
        <YouPageGuard>{children}</YouPageGuard>
      </div>
    </div>
  );
}
