import clsx from "clsx";
import React from "react";

import { graphql, useFragment } from "~/gql";
import {
  MylistPageCommon_LinkSwitchFragmentDoc,
  MylistPageCommon_SideMylistListFragment,
} from "~/gql/graphql";

import { MylistLinkSwitch } from "./LinkSwitch";

graphql(`
  fragment MylistPageCommon_SideMylistList on MylistConnection {
    nodes {
      ...MylistPageCommon_LinkSwitch
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
export const SideMylistList: React.FC<{
  className?: string;
  fallback: MylistPageCommon_SideMylistListFragment;
}> = ({ className, fallback }) => {
  return (
    <div
      className={clsx(
        className,
        ["flex", "flex-col", "items-stretch"],
        ["h-full"],
        ["overflow-y-scroll"]
      )}
    >
      {fallback.nodes.map((fragment) => (
        <MylistLinkSwitch
          key={fragment.id}
          className={clsx(["px-4"], ["py-2"], ["hover:bg-blue-200"])}
          fragment={useFragment(
            MylistPageCommon_LinkSwitchFragmentDoc,
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
