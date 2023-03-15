import React, { ComponentProps } from "react";

import { FragmentType, graphql, useFragment } from "~/gql";

import { LinkUserMylist } from "../../app/users/[name]/mylists/[id]/Link";

const Fragment = graphql(`
  fragment MylistLinkSwitch on Mylist {
    ...Link_UserMylist
    isLikeList
  }
`);
export const MylistLinkSwitch: React.FC<
  {
    fragment: FragmentType<typeof Fragment>;
  } & Omit<ComponentProps<typeof LinkUserMylist>, "fragment">
> = ({ fragment: ft, ...props }) => {
  const fragment = useFragment(Fragment, ft);
  if (fragment.isLikeList)
    return <LinkUserMylist fragment={fragment} {...props} />;
  else return <LinkUserMylist fragment={fragment} {...props} />;
};
