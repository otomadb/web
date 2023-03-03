"use client";

import "client-only";

import clsx from "clsx";
import React from "react";

import { graphql, useFragment as getFragment } from "~/gql";
import {
  MylistPageCommon_SideMylistListFragmentDoc,
  UserMylistsPage_LargeMylistListFragmentDoc,
  UserMylistsPage_MylistsFragment,
} from "~/gql/graphql";

import { MetaTemplate } from "../MetaTemplate";
import { LargeMylistList } from "./LargeMylistList";

graphql(`
  fragment UserMylistsPage_Mylists on MylistConnection {
    ...UserMylistsPage_LargeMylistList
    ...MylistPageCommon_SideMylistList
  }
`);
export const UserMylists: React.FC<{
  className?: string;
  fallback: UserMylistsPage_MylistsFragment;
}> = ({ fallback }) => {
  return (
    <MetaTemplate
      sidelist={getFragment(
        MylistPageCommon_SideMylistListFragmentDoc,
        fallback
      )}
      Main={() => (
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
      )}
    />
  );
};
