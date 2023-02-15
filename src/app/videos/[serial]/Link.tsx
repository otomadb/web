import Link from "next/link";
import React, { ComponentProps } from "react";

import { graphql } from "~/gql";
import { Link_VideoFragment } from "~/gql/graphql";

graphql(`
  fragment Link_Video on Video {
    serial
  }
`);
export const LinkVideo: React.FC<
  Omit<ComponentProps<typeof Link>, "href"> & {
    fragment: Link_VideoFragment;
  }
> = ({ children, fragment: { serial }, ...props }) => (
  <Link href={`/videos/${serial}`} {...props}>
    {children}
  </Link>
);
