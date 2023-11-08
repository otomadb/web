import clsx from "clsx";
import React from "react";

import FormModal, { FormModalProvider } from "~/components/FormModal";
import GlobalNav from "~/components/GlovalNav";
import { ToastProvider } from "~/components/Toaster";

import Auth0Provider from "../Auth0Provider";
import UrqlProvider from "../UrqlProvider";

export default function ApplicationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Auth0Provider>
      <UrqlProvider>
        <ToastProvider selector="#toast">
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
            <div id="toast" />
            <FormModal className={clsx(["fixed", "bottom-1", "right-4"])} />
          </FormModalProvider>
        </ToastProvider>
      </UrqlProvider>
    </Auth0Provider>
  );
}
