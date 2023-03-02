import Link from "next/link";
import React, { ComponentProps } from "react";

import { FragmentType, getFragment as useFragment, graphql } from "~/gql";

const Fragment = graphql(`
  fragment Link_UserLikes on User {
    name
  }
`);
export const LinkUserLikes: React.FC<
  Omit<ComponentProps<typeof Link>, "href"> & {
    fragment: FragmentType<typeof Fragment>;
  }
> = ({ children, fragment, ...props }) => {
  const { name } = useFragment(Fragment, fragment);
  return (
    <Link href={`/users/${name}/likes`} {...props}>
      {children}
    </Link>
  );
};
