import Link from "next/link";
import React, { ComponentProps } from "react";

import { FragmentType, graphql, useFragment } from "~/gql";

const Fragment = graphql(`
  fragment UserMylistPageLink on Mylist {
    slug
    isLikeList
    holder {
      name
    }
  }
`);
export const UserMylistPageLink: React.FC<
  Omit<ComponentProps<typeof Link>, "href"> & {
    fragment: FragmentType<typeof Fragment>;
  }
> = ({ children, fragment, ...props }) => {
  const {
    slug,
    isLikeList,
    holder: { name },
  } = useFragment(Fragment, fragment);

  const href = isLikeList
    ? `/users/${name}/likes`
    : `/users/${name}/mylists/${slug}`;

  return (
    <Link href={href} {...props}>
      {children}
    </Link>
  );
};
