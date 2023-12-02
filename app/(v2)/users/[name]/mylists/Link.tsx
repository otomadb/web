import Link from "next/link";
import React, { ComponentProps } from "react";

import { FragmentType, graphql, useFragment } from "~/gql";

export const UserMylistsPageLinkFragment = graphql(`
  fragment UserMylistsPageLink on User {
    name
  }
`);
const UserMylistsPageLink: React.FC<
  Omit<ComponentProps<typeof Link>, "href"> & {
    fragment: FragmentType<typeof UserMylistsPageLinkFragment>;
  }
> = ({ children, fragment, ...props }) => {
  const { name } = useFragment(UserMylistsPageLinkFragment, fragment);
  return (
    <Link href={`/users/${name}/mylists`} {...props}>
      {children}
    </Link>
  );
};
export default UserMylistsPageLink;
