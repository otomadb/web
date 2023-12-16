import Link from "next/link";
import React, { ComponentProps } from "react";

import { FragmentType, graphql, useFragment } from "~/gql";

export const YouMylistPageLinkFragment = graphql(`
  fragment YouMylistPageLink on Mylist {
    isLikeList
    slug
    isLikeList
  }
`);
const YouMylistPageLink: React.FC<
  Omit<ComponentProps<typeof Link>, "href"> & {
    fragment: FragmentType<typeof YouMylistPageLinkFragment>;
  }
> = ({ children, fragment, ...props }) => {
  const { slug, isLikeList } = useFragment(YouMylistPageLinkFragment, fragment);

  return (
    <Link href={isLikeList ? `/me/likes` : `/me/mylists/${slug}`} {...props}>
      {children}
    </Link>
  );
};
export default YouMylistPageLink;
