import Link from "next/link";
import React, { ComponentProps } from "react";

import { FragmentType, graphql, useFragment } from "~/gql";

const Fragment = graphql(`
  fragment Link_UserMylist on Mylist {
    holder {
      id
      name
    }
  }
`);
export const LinkUserMylist: React.FC<
  Omit<ComponentProps<typeof Link>, "href"> & {
    fragment: FragmentType<typeof Fragment>;
  }
> = ({ children, fragment, ...props }) => {
  const {
    holder: { id, name },
  } = useFragment(Fragment, fragment);
  return (
    <Link href={`/users/${name}/mylists/${id}`} {...props}>
      {children}
    </Link>
  );
};
