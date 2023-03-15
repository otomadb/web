import clsx from "clsx";
import React from "react";

import { YouPageGuard } from "./Guard";
import { YouPageHeader } from "./Header";
import { YouPageNav } from "./Nav";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={clsx(["h-full"])}>
      <div className={clsx(["container", "max-w-screen-xl", "mx-auto"])}>
        <YouPageHeader />
        <YouPageNav />
        <YouPageGuard>{children}</YouPageGuard>
      </div>
    </div>
  );
}
