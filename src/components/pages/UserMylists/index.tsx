"use client";

import "client-only";

import clsx from "clsx";
import React from "react";

import { SideMylistList } from "~/components/common/MylistPage/SideMylistList";
import { getFragment, graphql } from "~/gql";
import {
  MylistPageCommon_SideMylistListFragmentDoc,
  UserMylistsPage_LargeMylistListFragmentDoc,
  UserMylistsPage_MylistsFragment,
} from "~/gql/graphql";

import { LargeMylistList } from "./LargeMylistList";

graphql(`
  fragment UserMylistsPage_Mylists on MylistConnection {
    ...UserMylistsPage_LargeMylistList
    ...MylistPageCommon_SideMylistList
  }
`);
export const Mylists: React.FC<{
  className?: string;
  fallback: UserMylistsPage_MylistsFragment;
}> = ({ className, fallback }) => {
  return (
    <div className={clsx(className, ["@container"], ["flex"], ["gap-x-4"])}>
      <div className={clsx(["hidden", "xl:block"], ["flex-grow"])}>
        <SideMylistList
          fallback={getFragment(
            MylistPageCommon_SideMylistListFragmentDoc,
            fallback
          )}
        />
      </div>
      <LargeMylistList
        className={clsx(
          ["flex-shrink-0"],
          ["flex-grow", "xl:flex-grow-0"],
          ["xl:w-[1024px]"]
        )}
        fallback={getFragment(
          UserMylistsPage_LargeMylistListFragmentDoc,
          fallback
        )}
      />
    </div>
  );
};
