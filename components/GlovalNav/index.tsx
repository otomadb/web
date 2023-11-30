"use client";

import clsx from "clsx";
import { CSSProperties } from "react";
import { useQuery } from "urql";

import TopPageLink from "~/app/(landing)/Link";
import { LoginLink } from "~/components/AuthLink";
import Pictogram from "~/components/Pictogram";
import SearchContents from "~/components/SearchContents";
import { graphql } from "~/gql";

import Logo from "../Logo";
import ProfileAccordion from "./ProfileAccordion";
import UserIndicator from "./UserIndicator";

export const Query = graphql(`
  query GlobalNav {
    ...GlobalNav_ProfileIndicator
    ...GlobalNav_ProfileAccordion
  }
`);
export default function GlobalNav({
  className,
  style,
}: {
  className?: string;
  style?: CSSProperties;
}) {
  const [{ data, fetching }] = useQuery({
    query: Query,
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
            <TopPageLink className={clsx("w-full")}>
              <Logo className={clsx(["w-full"], ["fill-white"])} />
            </TopPageLink>
          </div>
        </div>
        <div className={clsx(["grow"])}>
          <SearchContents className={clsx(["mx-auto"])} />
        </div>
        <div
          className={clsx(["w-36"], ["shrink-0"], ["flex", "justify-center"])}
        >
          {fetching ? (
            <div
              className={clsx(
                ["rounded-sm"],
                ["w-8"],
                ["h-8"],
                ["bg-slate-700"],
                ["animate-pulse"]
              )}
            />
          ) : !data ? (
            <LoginLink
              className={clsx(
                "flex items-center gap-x-2 rounded-sm border border-vivid-primary bg-transparent px-4 py-2 text-vivid-primary duration-50 hover:bg-vivid-primary hover/button:text-obsidian-darker"
              )}
            >
              <Pictogram icon="signin" className={clsx("h-4")} />
              <span className={clsx("text-sm")}>ログイン</span>
            </LoginLink>
          ) : (
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
