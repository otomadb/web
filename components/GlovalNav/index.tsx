"use client";

import { useAuth0 } from "@auth0/auth0-react";
import clsx from "clsx";
import { CSSProperties } from "react";
import { useQuery } from "urql";

import AppTopPage from "~/app/(application)/(normal)/Link";
import TopPageLink from "~/app/(landing)/Link";
import { SearchContents } from "~/components/SearchContents/SearchContents";
import { graphql } from "~/gql";

import { Logo } from "../Logo";
import LoginButton from "./LoginButton";
import ProfileAccordion from "./ProfileAccordion";
import UserIndicator from "./UserIndicator";

export const Query = graphql(`
  query GlobalNav {
    ...GlobalNav_ProfileIndicator
    ...GlobalNav_ProfileAccordion
    whoami {
      id
    }
  }
`);
export default function GlobalNav({
  className,
  style,
}: {
  className?: string;
  style?: CSSProperties;
}) {
  const [{ data, fetching }, update] = useQuery({
    query: Query,
    requestPolicy: "cache-first",
  });

  return (
    <nav
      className={clsx(
        className,
        ["z-infinity"],
        ["bg-slate-900"],
        ["shadow-lg"]
      )}
      style={style}
    >
      <div
        className={clsx(
          ["h-full"],
          ["container", ["max-w-screen-lg"]],
          ["mx-auto"],
          ["px-4"],
          ["flex", ["items-center"], ["justify-between"]],
          ["gap-x-0", "md:gap-x-2"]
        )}
      >
        <div
          className={clsx(
            ["hidden", ["md:flex", ["justify-center"]]],
            ["w-36"],
            ["shrink-0"]
          )}
        >
          <div className={clsx(["w-[96px]"])}>
            <AppTopPage className={clsx("w-full")}>
              <Logo className={clsx(["w-full"], ["fill-white"])} />
            </AppTopPage>
          </div>
        </div>
        <div className={clsx(["grow"])}>
          <SearchContents className={clsx(["mx-auto"])} />
        </div>
        <div
          className={clsx(["w-36"], ["shrink-0"], ["flex", "justify-center"])}
        >
          {fetching && (
            <div
              className={clsx(
                ["rounded-sm"],
                ["w-8"],
                ["h-8"],
                ["bg-slate-700"],
                ["animate-pulse"]
              )}
            />
          )}
          {!fetching && !data && <LoginButton update={update} />}
          {!fetching && data && (
            <div className={clsx(["group"], ["relative"])}>
              <UserIndicator fragment={data} className={clsx(["z-1"])} />
              <div
                className={clsx(
                  ["z-0"],
                  ["pt-1"],
                  [
                    "invisible",
                    // "group-focus-within:visible",
                    "group-hover:visible",
                    "absolute",
                    "top-full",
                    ["right-0", "xl:right-auto"],
                    ["xl:left-[-7rem]"],
                  ]
                )}
              >
                <ProfileAccordion fragment={data} className={clsx(["w-64"])} />
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
