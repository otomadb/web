import Link from "next/link";
import React, { ComponentProps } from "react";

import { graphql } from "~/gql";
import { Link_TagFragment } from "~/gql/graphql";

graphql(`
  fragment Link_Tag on Tag {
    id
    serial
  }
`);
export const LinkTag: React.FC<
  Omit<ComponentProps<typeof Link>, "href"> & { fragment: Link_TagFragment }
> = ({ children, fragment: { serial }, ...props }) => (
  <Link href={`/tags/${serial}`} {...props}>
    {children}
  </Link>
);
