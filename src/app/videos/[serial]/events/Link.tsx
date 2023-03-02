import Link from "next/link";
import React, { ComponentProps } from "react";

import { FragmentType, getFragment, graphql } from "~/gql";

const Fragment = graphql(`
  fragment Link_VideoEvents on Video {
    serial
  }
`);
export const LinkVideoEvents: React.FC<
  Omit<ComponentProps<typeof Link>, "href"> & {
    fragment: FragmentType<typeof Fragment>;
  }
> = ({ children, fragment, ...props }) => {
  const { serial } = getFragment(Fragment, fragment);
  return (
    <Link href={`/videos/${serial}/events`} {...props}>
      {children}
    </Link>
  );
};
