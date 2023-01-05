import clsx from "clsx";
import React from "react";

import { getFragment, graphql } from "~/gql";
import {
  UserMylistsPage_LinkSwitchFragmentDoc,
  UserMylistsPage_SmallMylistListFragment,
} from "~/gql/graphql";

import { MylistLinkSwitch } from "./LinkSwitch";

graphql(`
  fragment UserMylistsPage_SmallMylistList on MylistConnection {
    nodes {
      ...UserMylistsPage_LinkSwitch
      id
      title
      isLikeList
      holder {
        id
        name
        displayName
      }
    }
  }
`);
export const SmallMylistList: React.FC<{
  className?: string;
  fallback: UserMylistsPage_SmallMylistListFragment;
}> = ({ className, fallback }) => {
  return (
    <div className={clsx(className, ["flex", "flex-col", "items-stretch"])}>
      {fallback.nodes.map((fragment) => (
        <MylistLinkSwitch
          key={fragment.id}
          className={clsx(["px-4"], ["py-2"], ["hover:bg-blue-200"])}
          fragment={getFragment(
            UserMylistsPage_LinkSwitchFragmentDoc,
            fragment
          )}
        >
          <p className={clsx(["text-sm"], ["truncate"])}>
            {!fragment.isLikeList && fragment.title}
            {fragment.isLikeList && `${fragment.holder.displayName}のいいね欄`}
          </p>
        </MylistLinkSwitch>
      ))}
    </div>
  );
};
