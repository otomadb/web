"use client";

import clsx from "clsx";
import React from "react";
import { useQuery } from "urql";

import { LinkSignin } from "~/app/auth/signin/Link";
import { UserIcon } from "~/components/common/UserIcon";
import { getFragment, graphql } from "~/gql";
import { GlobalNav_Profile_AccordionFragmentDoc } from "~/gql/graphql";

import { Accordion } from "./Accordion";

graphql(`
  fragment GlobalNav_Profile on User {
    id
    ...UserIcon
    ...GlobalNav_Profile_Accordion
  }
`);
export const Profile: React.FC<{ className?: string }> = ({ className }) => {
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
      {data?.whoami === null && (
        <LinkSignin
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
        </LinkSignin>
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
            fragment={getFragment(
              GlobalNav_Profile_AccordionFragmentDoc,
              data.whoami
            )}
          />
        </div>
      )}
    </div>
  );
};
