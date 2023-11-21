import Link from "next/link";
import React, { ComponentProps } from "react";

import { FragmentType, graphql, useFragment } from "~/gql";

export const NicovideoRequestPageLinkFragment = graphql(`
  fragment Link_NicovideoRegistrationRequest on NicovideoRegistrationRequest {
    sourceId
  }
`);
export const LinkNicovideoRegistrationRequest: React.FC<
  Omit<ComponentProps<typeof Link>, "href"> & {
    fragment: FragmentType<typeof NicovideoRequestPageLinkFragment>;
  }
> = ({ children, fragment, ...props }) => {
  const { sourceId } = useFragment(NicovideoRequestPageLinkFragment, fragment);
  return (
    <Link href={`/requests/nicovideo/${sourceId}`} {...props}>
      {children}
    </Link>
  );
};

export default function NicovideoRequestLink({
  sourceId,
  children,
  ...props
}: Omit<ComponentProps<typeof Link>, "href"> & { sourceId: string }) {
  return (
    <Link href={`/requests/nicovideo/${sourceId}`} {...props}>
      {children}
    </Link>
  );
}