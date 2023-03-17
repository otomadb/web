import clsx from "clsx";
import React from "react";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={clsx(["h-full"])}>
      <div className={clsx(["container", "max-w-screen-xl", "mx-auto"])}>
        {children}
      </div>
    </div>
  );
}
