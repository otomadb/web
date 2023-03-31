import Link from "next/link";
import React, { ComponentProps } from "react";

import { FragmentType, graphql, useFragment } from "~/gql";

export const Fragment = graphql(`
  fragment Link_NicovideoRegistrationRequest on NicovideoRegistrationRequest {
    sourceId
  }
`);
export const LinkNicovideoRegistrationRequest: React.FC<
  Omit<ComponentProps<typeof Link>, "href"> & {
    fragment: FragmentType<typeof Fragment>;
  }
> = ({ children, fragment, ...props }) => {
  const { sourceId } = useFragment(Fragment, fragment);
  return (
    <Link href={`/requests/nicovideo/${sourceId}`} {...props}>
      {children}
    </Link>
  );
};
