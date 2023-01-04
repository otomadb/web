import clsx from "clsx";
import React from "react";

import { LinkUserMylist } from "~/components/common/Link";
import { graphql } from "~/gql";
import { UserMylistsPage_SmallMylistListFragment } from "~/gql/graphql";

graphql(`
  fragment UserMylistsPage_SmallMylistList on MylistConnection {
    nodes {
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
      {fallback.nodes.map(({ id, title, isLikeList, holder }) => (
        <LinkUserMylist
          className={clsx(["px-4"], ["py-2"], ["hover:bg-blue-200"])}
          mylistId={id}
          userName={holder.name}
          key={id}
        >
          <p className={clsx(["text-sm"], ["truncate"])}>
            {!isLikeList && title}
            {isLikeList && `${holder.displayName}のいいね欄`}
          </p>
        </LinkUserMylist>
      ))}
    </div>
  );
};
