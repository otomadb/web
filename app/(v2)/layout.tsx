import { UserProvider } from "@auth0/nextjs-auth0/client";
import clsx from "clsx";
import React from "react";

import FormModal, { FormModalProvider } from "~/components/FormModal";
import GlobalNav from "~/components/GlovalNav";

export default function ApplicationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <UserProvider>
      <FormModalProvider>
        <div className={clsx("bg-obsidian-darkest")}>
          <GlobalNav className={clsx("sticky top-0 z-1 h-[64px] w-full")} />
          <div className={clsx("flex min-h-[calc(100vh-64px)]")}>
            <div className="shrink-0 grow">{children}</div>
          </div>
        </div>
        <FormModal className={clsx("fixed bottom-1 right-4")} />
      </FormModalProvider>
    </UserProvider>
  );
}
