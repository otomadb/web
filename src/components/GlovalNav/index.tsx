"use client";

import { useAuth0 } from "@auth0/auth0-react";
import clsx from "clsx";
import { CSSProperties } from "react";
import { useQuery } from "urql";

import { TopLink } from "~/app/Link";
import { MyPageLink } from "~/app/me/Link";
import { SearchContents } from "~/components/common/SearchContents/SearchContents";
import { graphql } from "~/gql";

import { Logo } from "../Logo";
import LoginButton from "./LoginButton";
import ProfileIndicator from "./ProfileIndicator";

export const Query = graphql(`
  query GlobalNav {
    whoami {
      id
      ...GlobalNav_ProfileIndicator
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
  const [{ data, fetching }] = useQuery({
    query: Query,
    pause: !isAuthenticated,
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
            ["flex-shrink-0"]
          )}
        >
          <TopLink className={clsx({ hidden: isAuthenticated })}>
            <Logo className={clsx(["text-2xl"], ["text-slate-50"])} />
          </TopLink>
          <MyPageLink className={clsx({ hidden: !isAuthenticated })}>
            <Logo className={clsx(["text-2xl"], ["text-slate-50"])} />
          </MyPageLink>
        </div>
        <div className={clsx(["flex-grow"])}>
          <SearchContents className={clsx(["mx-auto"])} />
        </div>
        <div
          className={clsx(
            ["w-36"],
            ["flex-shrink-0"],
            ["flex", "justify-center"]
          )}
        >
          {!data?.whoami && fetching && (
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
          {!data?.whoami && !fetching && <LoginButton />}
          {data?.whoami && <ProfileIndicator fragment={data?.whoami} />}
        </div>
      </div>
    </nav>
  );
}
