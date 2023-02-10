import clsx from "clsx";
import React from "react";

import { getFragment, graphql } from "~/gql";
import {
  UserMylistsPage_LargeMylistListFragment,
  UserMylistsPage_LargeMylistListItemFragmentDoc,
} from "~/gql/graphql";

import { LargeMylistListItem } from "./LargeMylistListItem";

graphql(`
  fragment UserMylistsPage_LargeMylistList on MylistConnection {
    nodes {
      id
      ...UserMylistsPage_LargeMylistListItem
    }
  }
`);
export const LargeMylistList: React.FC<{
  className?: string;
  fallback: UserMylistsPage_LargeMylistListFragment;
}> = ({ className, fallback }) => {
  const items = getFragment(
    UserMylistsPage_LargeMylistListItemFragmentDoc,
    fallback.nodes
  );

  return (
    <div
      className={clsx(className, [
        "flex",
        "flex-col",
        "items-stretch",
        "gap-y-2",
      ])}
    >
      {items.map((mylist) => (
        <LargeMylistListItem key={mylist.id} fragment={mylist} />
      ))}
    </div>
  );
};
