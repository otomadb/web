import clsx from "clsx";
import React, { Suspense } from "react";

import FormWidgetSwitch, { FormModalProvider } from "~/components/FormWidget";
import GlobalFooter from "~/components/GlobalFooter";
import GlobalNav from "~/components/GlobalNav/GlobalNav";
import { ToastProvider } from "~/components/Toaster";
import { graphql } from "~/gql";
import { makeGraphQLClient2 } from "~/gql/fetch";

import AppSideNavMenu from "./AppSideNavMenu";
import { NotifyEmailVerifycation } from "./NotifyVerification";

export default async function ApplicationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ToastProvider selector="#toast2">
      <NotifyEmailVerifycation />
      <FormModalProvider>
        <GlobalNav className={"sticky top-0 z-1 h-[64px] w-full"} />
        <div className="flex bg-obsidian-darkest">
          <nav className="sticky top-[64px] h-[calc(100vh-64px)] w-[320px] shrink-0 border-r border-obsidian-primary bg-obsidian-darker">
            <Suspense>
              <AppSideNavMenu
                fragment={await (
                  await makeGraphQLClient2({ auth: "optional" })
                ).request(
                  graphql(`
                    query AppSideNav {
                      ...AppSideNav
                    }
                  `)
                )}
                className={clsx("h-full w-full")}
              />
            </Suspense>
          </nav>
          <div className="grow bg-obsidian-darkest">
            <div className="min-h-[calc(100vh-64px)]">{children}</div>
            <GlobalFooter />
          </div>
        </div>
        <FormWidgetSwitch className={"fixed bottom-1 right-4"} />
        <div
          id="toast2"
          className="fixed right-4 top-[64px] z-infinity max-h-[calc(100vh-64px)] min-w-[320px]"
        />
      </FormModalProvider>
    </ToastProvider>
  );
}
