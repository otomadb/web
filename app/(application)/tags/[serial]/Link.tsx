import Link from "next/link";
import React, { ComponentProps } from "react";

import { FragmentType, graphql, useFragment } from "~/gql";

const TagPageLinkFragment = graphql(`
  fragment Link_Tag on Tag {
    serial
  }
`);
export const TagPageLink: React.FC<
  Omit<ComponentProps<typeof Link>, "href"> & {
    fragment: FragmentType<typeof TagPageLinkFragment>;
  }
> = ({ children, fragment, ...props }) => {
  const { serial } = useFragment(TagPageLinkFragment, fragment);
  return (
    <Link href={`/tags/${serial}`} {...props}>
      {children}
    </Link>
  );
};
