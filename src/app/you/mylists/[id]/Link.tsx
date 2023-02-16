import Link from "next/link";
import React, { ComponentProps } from "react";

import { graphql } from "~/gql";
import { Link_YouMylistFragment } from "~/gql/graphql";

graphql(`
  fragment Link_YouMylist on Mylist {
    id
  }
`);
export const LinkYouMylist: React.FC<
  Omit<ComponentProps<typeof Link>, "href"> & {
    fragment: Link_YouMylistFragment;
  }
> = ({ children, fragment, ...props }) => (
  <Link href={`/you/mylists/${fragment.id}`} {...props}>
    {children}
  </Link>
);
