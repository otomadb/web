"use client";

import { useAuth0 } from "@auth0/auth0-react";
import clsx from "clsx";
import React from "react";
import { useQuery } from "urql";

import { UserIcon } from "~/components/common/UserIcon";
import { graphql } from "~/gql";

import { Accordion } from "./Accordion";

graphql(`
  fragment GlobalNav_Profile on User {
    id
    ...UserIcon
    ...GlobalNav_Profile_Accordion
  }
`);
export const Profile: React.FC<{ className?: string }> = ({ className }) => {
  const { loginWithRedirect } = useAuth0();
  const [{ data, fetching }] = useQuery({
    query: graphql(`
      query GlobalNav_Profile {
        whoami {
          id
          ...UserIcon
          ...GlobalNav_Profile_Accordion
        }
      }
    `),
  });
  return (
    <div className={clsx(className, ["flex"])}>
      {fetching && (
        <div
          className={clsx(
            ["rounded-sm"],
            ["w-8"],
            ["h-8"],
            ["bg-slate-700"],
            ["animate-pulse"]
          )}
        ></div>
      )}
      {!fetching && (
        <>
          {!data?.whoami && (
            <button
              onClick={async () => {
                await loginWithRedirect();
              }}
              className={clsx(
                ["flex"],
                ["flex-row"],
                ["items-center"],
                ["rounded"],
                ["px-4"],
                ["h-8"],
                ["transition-colors", "duration-75"],
                ["border", ["border-sky-400", "hover:border-sky-300"]],
                ["bg-sky-400", ["bg-opacity-25", "hover:bg-opacity-40"]],
                ["text-sky-400", "hover:text-sky-300"]
              )}
            >
              <span>ログイン</span>
            </button>
          )}
          {data?.whoami && (
            <div className={clsx(["relative"], ["group"], ["flex"])}>
              <div tabIndex={0}>
                <UserIcon
                  className={clsx(["w-[32px]"], ["h-[32px]"])}
                  fragment={data.whoami}
                  size={32}
                />
              </div>
              <Accordion
                className={clsx(
                  ["w-[16rem]"],
                  [
                    "invisible",
                    "group-focus-within:visible",
                    "group-hover:visible",
                  ],
                  ["absolute"],
                  ["top-full"],
                  [["right-0", "xl:right-auto"], ["xl:-left-[7rem]"]],
                  ["mx-auto"]
                )}
                fragment={data.whoami}
              />
            </div>
          )}
        </>
      )}
    </div>
  );
};
