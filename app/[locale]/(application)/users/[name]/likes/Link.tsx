import Link from "next/link";
import React, { ComponentProps } from "react";

import { FragmentType, graphql, useFragment } from "~/gql";

export const UserLikesPageLinkFragment2 = graphql(`
  fragment UserLikesPageLink2 on User {
    name
  }
`);
const UserLikesPageLink2: React.FC<
  Omit<ComponentProps<typeof Link>, "href"> & {
    fragment: FragmentType<typeof UserLikesPageLinkFragment2>;
  }
> = ({ children, fragment, ...props }) => {
  const { name } = useFragment(UserLikesPageLinkFragment2, fragment);

  return (
    <Link href={`/users/${name}/likes`} {...props}>
      {children}
    </Link>
  );
};
export default UserLikesPageLink2;

export const UserLikesPageLinkFragment = graphql(`
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
    fragment: FragmentType<typeof UserLikesPageLinkFragment>;
  }
> = ({ children, fragment, ...props }) => {
  const { likes } = useFragment(UserLikesPageLinkFragment, fragment);

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
