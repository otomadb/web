import Link from "next/link";
import React, { ComponentProps } from "react";

import { FragmentType, graphql, useFragment } from "~/gql";

const Fragment = graphql(`
  fragment YouMylistPageLink on Mylist {
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

  const href = isLikeList ? `/me/likes` : `/me/mylists/${slug}`;

  return (
    <Link href={href} {...props}>
      {children}
    </Link>
  );
};
export default YouMylistPageLink;
