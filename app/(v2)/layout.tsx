import { UserProvider } from "@auth0/nextjs-auth0/client";
import clsx from "clsx";
import React from "react";

import AppSideNav from "~/components/AppSideNav";
import FormModal, { FormModalProvider } from "~/components/FormModal";
import GlobalFooter from "~/components/GlobalFooter";
import GlobalNav from "~/components/GlovalNav";

export default function ApplicationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <UserProvider>
      <FormModalProvider>
        <div className={clsx("flex @container/app")}>
          <AppSideNav className="sticky top-0 h-screen w-[320px] shrink-0" />
          <div className="shrink-0 grow bg-obsidian-darkest">
            <GlobalNav className={clsx("sticky top-0 z-1 h-[64px] w-full")} />
            <div className="min-h-[calc(100vh-64px)] p-8">{children}</div>
            <GlobalFooter />
          </div>
        </div>
        <FormModal className={clsx("fixed bottom-1 right-4")} />
      </FormModalProvider>
    </UserProvider>
  );
}
