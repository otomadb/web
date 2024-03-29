"use client";
import Link from "next/link";
import React, { ComponentProps, ReactNode } from "react";

import BilibiliRequestPageLink from "~/app/[locale]/(application)/requests/bilibili/[sourceId]/Link";
import NicovideoRequestLink from "~/app/[locale]/(application)/requests/nicovideo/[sourceId]/Link";
import SoundcloudRequestPageLink from "~/app/[locale]/(application)/requests/soundcloud/[sourceId]/Link";
import { YoutubeRequestPageLink } from "~/app/[locale]/(application)/requests/youtube/[sourceId]/Link";
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
        <NicovideoRequestLink fragment={f} {...props}>
          {children}
        </NicovideoRequestLink>
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
