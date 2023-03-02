import Link from "next/link";
import React, { ComponentProps } from "react";

import { FragmentType, getFragment, graphql } from "~/gql";

const Fragment = graphql(`
  fragment Link_UserMylists on User {
    name
  }
`);
export const LinkUserMylists: React.FC<
  Omit<ComponentProps<typeof Link>, "href"> & {
    fragment: FragmentType<typeof Fragment>;
  }
> = ({ children, fragment, ...props }) => {
  const { name } = getFragment(Fragment, fragment);
  return (
    <Link href={`/users/${name}/mylists`} {...props}>
      {children}
    </Link>
  );
};
