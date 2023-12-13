import clsx from "clsx";
import React, { Suspense } from "react";

import FormWidgetSwitch, { FormModalProvider } from "~/components/FormWidget";
import GlobalFooter from "~/components/GlobalFooter";
import Logo from "~/components/Logo";
import SearchContents from "~/components/SearchContents";
import { ToastProvider } from "~/components/Toaster";
import { graphql } from "~/gql";
import { makeGraphQLClient2 } from "~/gql/fetch";

import TopPageLink from "../(landing)/Link";
import AppSideNavMenu from "./AppSideNavMenu";
import GlobalNavUserPart from "./GlobalNavUserPart";
import { NotifyEmailVerifycation } from "./NotifyVerification";

const getGlobalNavUserPart = async () =>
  makeGraphQLClient2({ auth: "optional" }).then((c) =>
    c.request(
      graphql(`
        query GlobalNav {
          ...GlobalNav
        }
      `)
    )
  );

const getAppSideNav = async () =>
  makeGraphQLClient2({ auth: "optional" }).then((c) =>
    c.request(
      graphql(`
        query AppSideNav {
          ...AppSideNav
        }
      `)
    )
  );

export default async function ApplicationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ToastProvider selector="#toast2">
      <NotifyEmailVerifycation />
      <FormModalProvider>
        <div className={clsx("flex @container/app")}>
          <nav className="sticky top-0 h-screen w-[320px] shrink-0 border-r border-obsidian-primary bg-obsidian-darker">
            <div
              className={clsx(
                "flex h-[64px] items-center justify-center border-b border-obsidian-primary"
              )}
            >
              <TopPageLink
                className={clsx(
                  "border-b border-obsidian-primary fill-snow-darkest transition-colors duration-50 hover:fill-vivid-primary"
                )}
              >
                <Logo className={clsx("mx-auto h-[32px]")} />
              </TopPageLink>
            </div>
            <Suspense>
              <AppSideNavMenu
                fragment={await getAppSideNav()}
                className={clsx("h-full w-full")}
              />
            </Suspense>
          </nav>
          <div className="relative z-0 grow bg-obsidian-darkest">
            <nav
              className={clsx(
                "sticky top-0 z-1 h-[64px] w-full border-b border-b-obsidian-primary bg-obsidian-darker/80 backdrop-blur-md"
              )}
            >
              <div
                className={clsx(
                  "mx-auto flex h-full max-w-[1280px] items-center justify-between gap-x-8 px-8"
                )}
              >
                <SearchContents className={clsx("z-0 grow")} />
                <div className={clsx("w-[128px] shrink-0")}>
                  <Suspense
                    fallback={
                      <div
                        className={
                          "h-[32px] w-[32px] animate-pulse rounded-sm bg-obsidian-lighter"
                        }
                      />
                    }
                  >
                    <GlobalNavUserPart
                      fragment={await getGlobalNavUserPart()}
                    />
                  </Suspense>
                </div>
              </div>
            </nav>
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
