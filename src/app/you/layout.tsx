import "~/styles/globals.css";

import clsx from "clsx";
import React from "react";

import { YouPageHeader } from "~/pages/User/You/Header";
import { YouPageNav } from "~/pages/User/You/Nav";

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
        {children}
      </div>
    </div>
  );
}
