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

export const GlobalNavQuery = graphql(`
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
    query: GlobalNavQuery,
  });

  return (
    <nav
      style={style}
      className={clsx(
        className,
        "z-infinity border-b border-obsidian-lighter bg-obsidian-primary shadow-lg @container/globalnav"
      )}
    >
      <div
        className={clsx(
          "mx-auto flex h-full max-w-[1024px] items-center justify-between gap-x-8 px-8"
        )}
      >
        <TopPageLink
          className={clsx(
            "block shrink-0 fill-snow-primary px-2 transition-colors duration-75 hover:fill-vivid-primary"
          )}
        >
          <Logo className={clsx("h-6")} />
        </TopPageLink>
        <SearchContents className={clsx("z-0 grow")} />
        <div className={clsx("z-1 flex shrink-0 justify-center")}>
          {fetching ? (
            <div
              className={clsx(
                "h-[32px] w-[32px] animate-pulse rounded-sm bg-obsidian-lighter"
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
            <div className={clsx("group/user relative")}>
              <UserIndicator
                fragment={data}
                className={clsx("z-1 h-[32px] w-[32px]")}
              />
              <div
                className={clsx(
                  "invisible absolute right-0 top-full z-0 pt-1 group-hover/user:visible"
                )}
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
