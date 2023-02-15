import Link from "next/link";
import React, { ComponentProps } from "react";

import { graphql } from "~/gql";
import { Link_VideoEventsFragment } from "~/gql/graphql";

graphql(`
  fragment Link_VideoEvents on Video {
    serial
  }
`);
export const LinkVideoEvents: React.FC<
  Omit<ComponentProps<typeof Link>, "href"> & {
    fragment: Link_VideoEventsFragment;
  }
> = ({ children, fragment: { serial }, ...props }) => (
  <Link href={`/videos/${serial}/events`} {...props}>
    {children}
  </Link>
);
