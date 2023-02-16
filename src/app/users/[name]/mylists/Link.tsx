import Link from "next/link";
import React, { ComponentProps } from "react";

import { graphql } from "~/gql";
import { Link_UserMylistsFragment } from "~/gql/graphql";

graphql(`
  fragment Link_UserMylists on User {
    id
    name
  }
`);
export const LinkUserMylists: React.FC<
  Omit<ComponentProps<typeof Link>, "href"> & {
    fragment: Link_UserMylistsFragment;
  }
> = ({ children, fragment, ...props }) => (
  <Link href={`/users/${fragment.name}/mylists`} {...props}>
    {children}
  </Link>
);
