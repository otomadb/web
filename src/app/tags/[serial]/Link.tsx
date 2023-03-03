import Link from "next/link";
import React, { ComponentProps } from "react";

import { FragmentType, graphql, useFragment } from "~/gql";

const Fragment = graphql(`
  fragment Link_Tag on Tag {
    serial
  }
`);
export const LinkTag: React.FC<
  Omit<ComponentProps<typeof Link>, "href"> & {
    fragment: FragmentType<typeof Fragment>;
  }
> = ({ children, fragment, ...props }) => {
  const { serial } = useFragment(Fragment, fragment);
  return (
    <Link href={`/tags/${serial}`} {...props}>
      {children}
    </Link>
  );
};
