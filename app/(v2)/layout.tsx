import { UserProvider } from "@auth0/nextjs-auth0/client";
import clsx from "clsx";
import React from "react";

import AppSideNav from "~/components/AppSideNav";
import FormWidgetSwitch, { FormModalProvider } from "~/components/FormWidget";
import GlobalFooter from "~/components/GlobalFooter";
import GlobalNav from "~/components/GlovalNav";
import { ToastProvider } from "~/components/Toaster";

import { NotifyEmailVerifycation } from "./NotifyVerification";

export default function ApplicationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <UserProvider>
      <ToastProvider selector="#toast2">
        <NotifyEmailVerifycation />
        <FormModalProvider>
          <div className={clsx("flex @container/app")}>
            <AppSideNav className="sticky top-0 h-screen w-[320px] shrink-0" />
            <div className="shrink-0 grow bg-obsidian-darkest">
              <GlobalNav className={clsx("sticky top-0 z-1 h-[64px] w-full")} />
              <div className="min-h-[calc(100vh-64px)] p-8">{children}</div>
              <GlobalFooter />
            </div>
          </div>
          <FormWidgetSwitch className={clsx("fixed bottom-1 right-4")} />
          <div
            id="toast2"
            className={clsx(
              "fixed right-4 top-[64px] z-infinity max-h-[calc(100vh-64px)] min-w-[320px]"
            )}
          />
        </FormModalProvider>
      </ToastProvider>
    </UserProvider>
  );
}
