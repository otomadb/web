"use client";
import Link from "next/link";
import React, { ComponentProps, ReactNode } from "react";

import BilibiliRequestPageLink from "~/app/(v2)/requests/bilibili/[sourceId]/Link";
import { NicovideoRegistrationRequestLink } from "~/app/(v2)/requests/nicovideo/[sourceId]/Link";
import SoundcloudRequestPageLink from "~/app/(v2)/requests/soundcloud/[sourceId]/Link";
import { YoutubeRequestPageLink } from "~/app/(v2)/requests/youtube/[sourceId]/Link";
import { FragmentType, graphql, useFragment } from "~/gql";

export const RequestPageLinkSwitchFragment = graphql(`
  fragment RequestLinkSwitch on RegistrationRequest {
    __typename
    ... on YoutubeRegistrationRequest {
      ...YoutubeRequestPageLink
    }
    ... on NicovideoRegistrationRequest {
      ...Link_NicovideoRegistrationRequest
    }
    ... on BilibiliRegistrationRequest {
      ...BilibiliRequestPageLink
    }
    ... on SoundcloudRegistrationRequest {
      ...SoundcloudRequestPageLink
    }
  }
`);
export const RequestPageLinkSwitch = ({
  children,
  fragment,
  ...props
}: {
  children: ReactNode;
  fragment: FragmentType<typeof RequestPageLinkSwitchFragment>;
} & Omit<ComponentProps<typeof Link>, "href">) => {
  const f = useFragment(RequestPageLinkSwitchFragment, fragment);
  switch (f.__typename) {
    case "YoutubeRegistrationRequest":
      return (
        <YoutubeRequestPageLink fragment={f} {...props}>
          {children}
        </YoutubeRequestPageLink>
      );
    case "NicovideoRegistrationRequest":
      return (
        <NicovideoRegistrationRequestLink fragment={f} {...props}>
          {children}
        </NicovideoRegistrationRequestLink>
      );
    case "BilibiliRegistrationRequest":
      return (
        <BilibiliRequestPageLink fragment={f} {...props}>
          {children}
        </BilibiliRequestPageLink>
      );
    case "SoundcloudRegistrationRequest":
      return (
        <SoundcloudRequestPageLink fragment={f} {...props}>
          {children}
        </SoundcloudRequestPageLink>
      );
  }
};
