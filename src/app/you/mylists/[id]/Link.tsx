import Link from "next/link";
import React, { ComponentProps } from "react";

import { FragmentType, graphql, useFragment } from "~/gql";

const Fragment = graphql(`
  fragment Link_YouMylist on Mylist {
    id
  }
`);
export const LinkYouMylist: React.FC<
  Omit<ComponentProps<typeof Link>, "href"> & {
    fragment: FragmentType<typeof Fragment>;
  }
> = ({ children, fragment, ...props }) => {
  const { id } = useFragment(Fragment, fragment);
  return (
    <Link href={`/you/mylists/${id}`} {...props}>
      {children}
    </Link>
  );
};
