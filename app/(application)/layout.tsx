import { UserProvider } from "@auth0/nextjs-auth0/client";
import clsx from "clsx";
import React from "react";

import FormModal, { FormModalProvider } from "~/components/FormWidget";
import GlobalNav from "~/components/GlovalNav";

export default function ApplicationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <UserProvider>
      <FormModalProvider>
        <GlobalNav
          className={clsx(
            ["sticky"],
            ["top-0"],
            ["w-full"],
            ["h-[64px]"],
            ["z-1"]
          )}
        />
        <div
          className={clsx(
            ["flex", "content-stretch", "flex-wrap"],
            ["min-h-[calc(100vh-64px)]"]
            // ["bg-background-root"]
          )}
        >
          {children}
        </div>
        <FormModal className={clsx(["fixed", "bottom-1", "right-4"])} />
      </FormModalProvider>
    </UserProvider>
  );
}
