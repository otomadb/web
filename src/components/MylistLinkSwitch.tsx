import React, { ComponentProps } from "react";

import { UserLikesPageLink } from "~/app/users/[name]/likes/Link";
import { UserMylistPageLink } from "~/app/users/[name]/mylists/[id]/Link";
import { FragmentType, graphql, useFragment } from "~/gql";

const Fragment = graphql(`
  fragment MylistLinkSwitch on Mylist {
    ...UserMylistPageLink
    isLikeList
    holder {
      ...UserLikesPageLink
    }
  }
`);
export const MylistLinkSwitch: React.FC<
  {
    fragment: FragmentType<typeof Fragment>;
  } & (Omit<ComponentProps<typeof UserMylistPageLink>, "fragment"> &
    Omit<ComponentProps<typeof UserLikesPageLink>, "fragment">)
> = ({ fragment: ft, ...props }) => {
  const fragment = useFragment(Fragment, ft);
  if (fragment.isLikeList)
    return <UserLikesPageLink fragment={fragment.holder} {...props} />;
  else return <UserMylistPageLink fragment={fragment} {...props} />;
};
