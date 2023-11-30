import Link from "next/link";
import { ComponentProps } from "react";

import { graphql, useFragment } from "~/gql";
import FragmentedLink from "~/utils/FragmentedLink";

export const NicovideoRegistrationRequestLinkFragment = graphql(`
  fragment Link_NicovideoRegistrationRequest on NicovideoRegistrationRequest {
    sourceId
  }
`);

export const NicovideoRegistrationRequestLink: FragmentedLink<
  typeof NicovideoRegistrationRequestLinkFragment
> = ({ children, fragment, ...props }) => {
  const { sourceId } = useFragment(
    NicovideoRegistrationRequestLinkFragment,
    fragment
  );
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
