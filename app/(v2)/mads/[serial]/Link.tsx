import Link from "next/link";
import React, { ComponentProps } from "react";

import { FragmentType, graphql, useFragment } from "~/gql";

export const MadPageLinkFragment = graphql(`
  fragment Link_Video on Video {
    serial
  }
`);
export const MadPageLink: React.FC<
  Omit<ComponentProps<typeof Link>, "href"> & {
    fragment: FragmentType<typeof MadPageLinkFragment>;
  }
> = ({ children, fragment, ...props }) => {
  const { serial } = useFragment(MadPageLinkFragment, fragment);
  return (
    <Link href={`/mads/${serial}`} {...props}>
      {children}
    </Link>
  );
};
