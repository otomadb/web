import { UserProvider } from "@auth0/nextjs-auth0/client";
import clsx from "clsx";
import React from "react";

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
        <GlobalNav className={clsx("sticky top-0 z-1 h-[48px] w-full")} />
        <div className={clsx("flex")}>
          <div className="sticky top-[48px] h-[calc(100vh-48px)] w-[320px] shrink-0 border-r border-r-obsidian-lighter bg-obsidian-primary"></div>
          <div className="shrink-0 grow bg-obsidian-darkest">
            <div className="min-h-[calc(100vh-48px)] px-4 py-8">{children}</div>
            <GlobalFooter />
          </div>
        </div>
        <FormModal className={clsx("fixed bottom-1 right-4")} />
      </FormModalProvider>
    </UserProvider>
  );
}
