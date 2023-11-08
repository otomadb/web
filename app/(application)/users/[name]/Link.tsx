import Link from "next/link";
import React, { ComponentProps } from "react";

import { FragmentType, graphql, useFragment } from "~/gql";

export const UserPageLinkFragment = graphql(`
  fragment Link_User on User {
    name
  }
`);
export const UserPageLink: React.FC<
  Omit<ComponentProps<typeof Link>, "href"> & {
    fragment: FragmentType<typeof UserPageLinkFragment>;
  }
> = ({ children, fragment, ...props }) => {
  const { name } = useFragment(UserPageLinkFragment, fragment);
  return (
    <Link href={`/users/${name}`} {...props}>
      {children}
    </Link>
  );
};
