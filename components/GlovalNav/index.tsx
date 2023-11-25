"use client";

import { useAuth0 } from "@auth0/auth0-react";
import clsx from "clsx";
import { CSSProperties } from "react";
import { useQuery } from "urql";

import { MyPageLink } from "~/app/(application)/(normal)/me/Link";
import TopPageLink from "~/app/(landing)/Link";
import { LoginLink } from "~/components/AuthLink";
import Pictogram from "~/components/Pictogram";
import { SearchContents } from "~/components/SearchContents/SearchContents";
import { graphql } from "~/gql";

import Logo from "../Logo";
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
  const { isAuthenticated } = useAuth0();
  const [{ data, fetching }, update] = useQuery({
    query: Query,
    pause: !isAuthenticated,
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
            <TopPageLink
              className={clsx("w-full", { hidden: isAuthenticated })}
            >
              <Logo className={clsx(["w-full"], ["fill-white"])} />
            </TopPageLink>
            <MyPageLink
              className={clsx("w-full", { hidden: !isAuthenticated })}
            >
              <Logo className={clsx(["w-full"], ["fill-white"])} />
            </MyPageLink>
          </div>
        </div>
        <div className={clsx(["grow"])}>
          <SearchContents className={clsx(["mx-auto"])} />
        </div>
        <div
          className={clsx(["w-36"], ["shrink-0"], ["flex", "justify-center"])}
        >
          {(!isAuthenticated || (!fetching && !data)) && (
            <LoginLink
              className={clsx(
                "flex items-center gap-x-2 rounded-sm border border-vivid-primary bg-transparent px-4 py-2 text-vivid-primary duration-50 hover:bg-vivid-primary hover/button:text-coal-darker"
              )}
            >
              <Pictogram icon="signin" className={clsx("h-4")} />
              <span className={clsx("text-sm")}>ログイン</span>
            </LoginLink>
          )}
          {!data && fetching && (
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
          {data && (
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
