import Link from "next/link";
import React, { ComponentProps } from "react";

import { FragmentType, useFragment as useFragment, graphql } from "~/gql";

const Fragment = graphql(`
  fragment Link_Video on Video {
    serial
  }
`);
export const LinkVideo: React.FC<
  Omit<ComponentProps<typeof Link>, "href"> & {
    fragment: FragmentType<typeof Fragment>;
  }
> = ({ children, fragment, ...props }) => {
  const { serial } = useFragment(Fragment, fragment);
  return (
    <Link href={`/videos/${serial}`} {...props}>
      {children}
    </Link>
  );
};
