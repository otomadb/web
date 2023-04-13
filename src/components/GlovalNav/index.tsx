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
import ProfileAccordion from "./ProfileAccordion";

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
          {data && (
            <div className={clsx(["group"], ["relative"])}>
              <ProfileIndicator fragment={data} className={clsx(["z-1"])} />
              <div
                className={clsx(
                  ["z-0"],
                  ["pt-1"],
                  [
                    "invisible",
                    // "group-focus-within:visible",
                    "group-hover:visible",
                  ],
                  [
                    "absolute",
                    "top-full",
                    ["right-0", "xl:right-auto"],
                    ["xl:-left-[7rem]"],
                  ]
                )}
              >
                <ProfileAccordion
                  fragment={data}
                  className={clsx(["w-64"])}
                ></ProfileAccordion>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
