import Link from "next/link";
import React, { ComponentProps } from "react";

import { graphql } from "~/gql";
import { Link_UserLikesFragment } from "~/gql/graphql";

graphql(`
  fragment Link_UserLikes on User {
    name
  }
`);
export const LinkUserLikes: React.FC<
  Omit<ComponentProps<typeof Link>, "href"> & {
    fragment: Link_UserLikesFragment;
  }
> = ({ children, fragment, ...props }) => (
  <Link href={`/users/${fragment.name}/likes`} {...props}>
    {children}
  </Link>
);
