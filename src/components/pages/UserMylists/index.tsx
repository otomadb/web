"use client";

import "client-only";

import clsx from "clsx";
import React from "react";

import { getFragment, graphql } from "~/gql";
import {
  UserMylistsPage_LargeMylistListFragmentDoc,
  UserMylistsPage_MylistsFragment,
  UserMylistsPage_SmallMylistListFragmentDoc,
} from "~/gql/graphql";

import { LargeMylistList } from "./LargeMylistList";
import { SmallMylistList } from "./SmallMylistList";

graphql(`
  fragment UserMylistsPage_Mylists on MylistConnection {
    ...UserMylistsPage_LargeMylistList
    ...UserMylistsPage_SmallMylistList
  }
`);
export const Mylists: React.FC<{
  className?: string;
  fallback: UserMylistsPage_MylistsFragment;
}> = ({ className, fallback }) => {
  return (
    <div className={clsx(className, ["@container"], ["flex"], ["gap-x-4"])}>
      <div className={clsx(["hidden", "xl:block"], ["flex-grow"])}>
        <SmallMylistList
          fallback={getFragment(
            UserMylistsPage_SmallMylistListFragmentDoc,
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
