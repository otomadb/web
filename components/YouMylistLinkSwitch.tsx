import React, { ComponentProps } from "react";

import MyLikesPageLink from "~/app/(v2)/(authenticated)/me/(user)/likes/Link";
import { YouMylistPageLink } from "~/app/(v2)/(authenticated)/me/(user)/mylists/[slug]/Link";
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
  } & (Omit<ComponentProps<typeof MyLikesPageLink>, "fragment"> &
    Omit<ComponentProps<typeof YouMylistPageLink>, "fragment">)
> = ({ fragment: ft, ...props }) => {
  const fragment = useFragment(Fragment, ft);
  if (fragment.isLikeList) return <MyLikesPageLink {...props} />;
  else return <YouMylistPageLink fragment={fragment} {...props} />;
};
