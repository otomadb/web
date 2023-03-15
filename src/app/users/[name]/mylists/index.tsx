"use client";

import "client-only";

import clsx from "clsx";
import React from "react";

import { graphql, useFragment as getFragment } from "~/gql";
import {
  MylistPageCommon_SideMylistListFragmentDoc,
  UserMylistsPage_MylistsFragment,
} from "~/gql/graphql";

import { MetaTemplate } from "../MetaTemplate";
import { MylistList } from "./MylistsList.server";

graphql(`
  fragment UserMylistsPage_Mylists on MylistConnection {
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
        <MylistList
          className={clsx(
            ["flex-shrink-0"],
            ["flex-grow", "xl:flex-grow-0"],
            ["xl:w-[1024px]"]
          )}
          fallback={fallback}
        />
      )}
    />
  );
};
