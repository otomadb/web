import Link from "next/link";
import React, { ComponentProps } from "react";

import { FragmentType, graphql, useFragment } from "~/gql";

const Fragment = graphql(`
  fragment YouMylistPageLink on Mylist {
    isLikeList
    slug
    isLikeList
  }
`);
const YouMylistPageLink: React.FC<
  Omit<ComponentProps<typeof Link>, "href"> & {
    fragment: FragmentType<typeof Fragment>;
  }
> = ({ children, fragment, ...props }) => {
  const { slug, isLikeList } = useFragment(Fragment, fragment);

  return (
    <Link href={isLikeList ? `/me/likes` : `/me/mylists/${slug}`} {...props}>
      {children}
    </Link>
  );
};
export default YouMylistPageLink;
