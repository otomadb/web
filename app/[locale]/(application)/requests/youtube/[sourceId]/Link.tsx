import Link from "next/link";
import { ComponentProps } from "react";

import { FragmentType, graphql, useFragment } from "~/gql";

/**
 * @deprecated
 */
export default function YoutubeRequestLink({
  sourceId,
  children,
  ...props
}: Omit<ComponentProps<typeof Link>, "href"> & { sourceId: string }) {
  return (
    <Link href={`/requests/youtube/${sourceId}`} {...props}>
      {children}
    </Link>
  );
}

export const YoutubeRequestPageLinkFragment = graphql(`
  fragment YoutubeRequestPageLink on YoutubeRegistrationRequest {
    sourceId
  }
`);
export function YoutubeRequestPageLink({
  children,
  ...props
}: Omit<ComponentProps<typeof Link>, "href"> & {
  fragment: FragmentType<typeof YoutubeRequestPageLinkFragment>;
}) {
  const { sourceId } = useFragment(
    YoutubeRequestPageLinkFragment,
    props.fragment
  );
  return (
    <Link href={`/requests/youtube/${sourceId}`} {...props}>
      {children}
    </Link>
  );
}
