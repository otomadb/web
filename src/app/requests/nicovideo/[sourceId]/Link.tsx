import Link from "next/link";
import React, { ComponentProps } from "react";

import { graphql } from "~/gql";
import { Link_NicovideoRegistrationRequestFragment } from "~/gql/graphql";

graphql(`
  fragment Link_NicovideoRegistrationRequest on NicovideoRegistrationRequest {
    sourceId
  }
`);
export const LinkNicovideoRegistrationRequest: React.FC<
  Omit<ComponentProps<typeof Link>, "href"> & {
    fragment: Link_NicovideoRegistrationRequestFragment;
  }
> = ({ children, fragment: fragmnet, ...props }) => (
  <Link href={`/requests/nicovideo/${fragmnet.sourceId}`} {...props}>
    {children}
  </Link>
);
