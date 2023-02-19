import clsx from "clsx";
import React from "react";

import { YouPageHeader } from "~/components/pages/User/You/Header";
import { YouPageNav } from "~/components/pages/User/You/Nav";

import { YouPageGuard } from "./Guard";

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
