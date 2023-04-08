import React, { ComponentProps } from "react";

import { YouLikesPageLink } from "~/app/me/likes/Link";
import { YouMylistPageLink } from "~/app/me/mylists/[id]/Link";
import { FragmentType, graphql, useFragment } from "~/gql";

const Fragment = graphql(`
  fragment YouMylistLinkSwitch on Mylist {
    ...YouMylistPageLink
    isLikeList
  }
`);
export const YouMylistLinkSwitch: React.FC<
  {
    fragment: FragmentType<typeof Fragment>;
  } & (Omit<ComponentProps<typeof YouLikesPageLink>, "fragment"> &
    Omit<ComponentProps<typeof YouMylistPageLink>, "fragment">)
> = ({ fragment: ft, ...props }) => {
  const fragment = useFragment(Fragment, ft);
  if (fragment.isLikeList) return <YouLikesPageLink {...props} />;
  else return <YouMylistPageLink fragment={fragment} {...props} />;
};
