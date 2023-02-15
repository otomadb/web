import Link from "next/link";
import React, { ComponentProps } from "react";

import { graphql } from "~/gql";
import { Link_UserFragment } from "~/gql/graphql";

graphql(`
  fragment Link_User on User {
    name
  }
`);
export const LinkUser: React.FC<
  Omit<ComponentProps<typeof Link>, "href"> & { fragment: Link_UserFragment }
> = ({ children, fragment: { name }, ...props }) => (
  <Link href={`/users/${name}`} {...props}>
    {children}
  </Link>
);
