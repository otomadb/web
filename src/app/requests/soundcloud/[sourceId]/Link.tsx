import Link from "next/link";
import { ComponentProps } from "react";

import { FragmentType, graphql, useFragment } from "~/gql";

export const SoundcloudRequestPageLinkFragment = graphql(`
  fragment SoundcloudRequestPageLink on SoundcloudRegistrationRequest {
    sourceId
  }
`);
export default function SoundcloudRequestPageLink({
  children,
  ...props
}: Omit<ComponentProps<typeof Link>, "href"> & {
  fragment: FragmentType<typeof SoundcloudRequestPageLinkFragment>;
}) {
  const { sourceId } = useFragment(
    SoundcloudRequestPageLinkFragment,
    props.fragment
  );
  return (
    <Link href={`/requests/soundcloud/${sourceId}`} {...props}>
      {children}
    </Link>
  );
}
