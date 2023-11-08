import clsx from "clsx";
import React from "react";

import { FragmentType, graphql, useFragment } from "~/gql";

export const Fragment = graphql(`
  fragment MylistTitle on Mylist {
    title
    isLikeList
    holder {
      displayName
    }
  }
`);
export const MylistTitle: React.FC<{
  className?: string;
  fragment: FragmentType<typeof Fragment>;
}> = ({ className, ...props }) => {
  const { isLikeList, title, holder } = useFragment(Fragment, props.fragment);
  return (
    <span className={clsx(className)}>
      {!isLikeList && title}
      {isLikeList && `${holder.displayName}のいいね欄`}
    </span>
  );
};
