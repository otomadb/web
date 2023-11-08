import Link from "next/link";
import React, { ComponentProps } from "react";

import { FragmentType, graphql, useFragment } from "~/gql";

const Fragment = graphql(`
  fragment UserLikesPageLink on User {
    likes {
      holder {
        name
      }
    }
  }
`);
export const UserLikesPageLink: React.FC<
  Omit<ComponentProps<typeof Link>, "href"> & {
    fragment: FragmentType<typeof Fragment>;
  }
> = ({ children, fragment, ...props }) => {
  const { likes } = useFragment(Fragment, fragment);

  if (!likes)
    return (
      <span {...props} aria-disabled>
        {children}
      </span>
    );

  return (
    <Link href={`/users/${likes.holder.name}/likes`} {...props}>
      {children}
    </Link>
  );
};
