import Link from "next/link";
import { ComponentProps } from "react";

import { FragmentType, graphql, useFragment } from "~/gql";

export const NicovideoRegistrationRequestLinkFragment = graphql(`
  fragment Link_NicovideoRegistrationRequest on NicovideoRegistrationRequest {
    sourceId
  }
`);

export const NicovideoRegistrationRequestLink: React.FC<
  Omit<ComponentProps<typeof Link>, "href"> & {
    fragment: FragmentType<typeof NicovideoRegistrationRequestLinkFragment>;
  }
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
