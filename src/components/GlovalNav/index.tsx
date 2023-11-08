"use client";

import { useAuth0 } from "@auth0/auth0-react";
import clsx from "clsx";
import { CSSProperties } from "react";
import { useQuery } from "urql";

import { TopLink } from "~/app/Link";
import { MyPageLink } from "~/app/me/Link";
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
  const { isAuthenticated } = useAuth0();
  const [{ data, fetching }, update] = useQuery({
    query: Query,
    pause: !isAuthenticated,
    requestPolicy: "cache-first",
  });

  return (
    <nav
      className={clsx(className, ["z-infinity bg-slate-900 shadow-lg"])}
      style={style}
    >
      <div
        className={clsx([
          "container mx-auto flex h-full max-w-screen-lg items-center justify-between gap-x-0 px-4 md:gap-x-2",
        ])}
      >
        <div className={clsx(["hidden w-36 shrink-0 justify-center md:flex"])}>
          <div className={clsx("w-[96px]")}>
            <TopLink className={clsx("w-full", { hidden: isAuthenticated })}>
              <Logo className={clsx("w-full fill-white")} />
            </TopLink>
            <MyPageLink
              className={clsx("w-full", { hidden: !isAuthenticated })}
            >
              <Logo className={clsx("w-full fill-white")} />
            </MyPageLink>
          </div>
        </div>
        <div className={clsx("grow")}>
          <SearchContents className={clsx("mx-auto")} />
        </div>
        <div className={clsx("flex w-36 shrink-0 justify-center")}>
          {(!isAuthenticated || (!fetching && !data)) && (
            <LoginButton update={update} />
          )}
          {!data && fetching && (
            <div
              className={clsx([
                "h-8 w-8 animate-pulse rounded-sm bg-slate-700",
              ])}
            />
          )}
          {data && (
            <div className={clsx("group relative")}>
              <UserIndicator fragment={data} className={clsx("z-1")} />
              <div
                className={clsx([
                  "invisible right-0 z-0 pt-1 xl:-left-[7rem] xl:right-auto",
                  // "group-focus-within:visible group-hover:visible absolute top-full",
                ])}
              >
                <ProfileAccordion fragment={data} className={clsx("w-64")} />
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
