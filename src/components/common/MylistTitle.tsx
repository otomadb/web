import clsx from "clsx";
import React from "react";

import { FragmentType, graphql, useFragment } from "~/gql";

export const TitleFragment = graphql(`
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
  fragment: FragmentType<typeof TitleFragment>;
}> = ({ className, ...props }) => {
  const { isLikeList, title, holder } = useFragment(
    TitleFragment,
    props.fragment
  );
  return (
    <span className={clsx(className)}>
      {!isLikeList && title}
      {isLikeList && `${holder.displayName}のいいね欄`}
    </span>
  );
};
