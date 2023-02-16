import Link from "next/link";
import React, { ComponentProps } from "react";

import { graphql } from "~/gql";
import { Link_UserMylistFragment } from "~/gql/graphql";

graphql(`
  fragment Link_UserMylist on Mylist {
    id
    holder {
      id
      name
    }
  }
`);
export const LinkUserMylist: React.FC<
  Omit<ComponentProps<typeof Link>, "href"> & {
    fragment: Link_UserMylistFragment;
  }
> = ({ children, fragment, ...props }) => (
  <Link
    href={`/users/${fragment.holder.name}/mylists/${fragment.holder.id}`}
    {...props}
  >
    {children}
  </Link>
);
