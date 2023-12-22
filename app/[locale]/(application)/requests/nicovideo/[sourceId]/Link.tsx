import Link from "next/link";
import { ComponentProps } from "react";

import { FragmentType, graphql, useFragment } from "~/gql";

export const NicovideoRequestLinkFragment = graphql(`
  fragment Link_NicovideoRegistrationRequest on NicovideoRegistrationRequest {
    sourceId
  }
`);

const NicovideoRequestLink: React.FC<
  Omit<ComponentProps<typeof Link>, "href"> & {
    fragment: FragmentType<typeof NicovideoRequestLinkFragment>;
  }
> = ({ children, fragment, ...props }) => {
  const { sourceId } = useFragment(NicovideoRequestLinkFragment, fragment);
  return (
    <Link href={`/requests/nicovideo/${sourceId}`} {...props}>
      {children}
    </Link>
  );
};
export default NicovideoRequestLink;
