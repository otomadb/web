import React, { ComponentProps } from "react";

import { FragmentType, graphql, useFragment } from "~/gql";

import { UserMylistPageLink } from "../../app/users/[name]/mylists/[id]/Link";

const Fragment = graphql(`
  fragment MylistLinkSwitch on Mylist {
    ...Link_UserMylist
    isLikeList
  }
`);
export const MylistLinkSwitch: React.FC<
  {
    fragment: FragmentType<typeof Fragment>;
  } & Omit<ComponentProps<typeof UserMylistPageLink>, "fragment">
> = ({ fragment: ft, ...props }) => {
  const fragment = useFragment(Fragment, ft);
  if (fragment.isLikeList)
    return <UserMylistPageLink fragment={fragment} {...props} />;
  else return <UserMylistPageLink fragment={fragment} {...props} />;
};
