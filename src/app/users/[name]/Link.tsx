import Link from "next/link";
import React, { ComponentProps } from "react";

import { FragmentType, graphql, useFragment } from "~/gql";

export const Fragment = graphql(`
  fragment Link_User on User {
    name
  }
`);
export const LinkUser: React.FC<
  Omit<ComponentProps<typeof Link>, "href"> & {
    fragment: FragmentType<typeof Fragment>;
  }
> = ({ children, fragment, ...props }) => {
  const { name } = useFragment(Fragment, fragment);
  return (
    <Link href={`/users/${name}`} {...props}>
      {children}
    </Link>
  );
};
