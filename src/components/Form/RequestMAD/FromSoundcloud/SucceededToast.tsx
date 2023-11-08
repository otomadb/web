"use client";
import "client-only";

import clsx from "clsx";
import React from "react";

import SoundcloudRequestLink from "~/app/requests/soundcloud/[sourceId]/Link";
import { FragmentType, graphql, useFragment } from "~/gql";

export const Fragment = graphql(`
  fragment RequestMADFromSoundcloudForm_SucceededToast on RequestSoundcloudRegistrationSucceededPayload {
    request {
      id
      title
      ...SoundcloudRequestPageLink
    }
  }
`);
export const SucceededToast: React.FC<{
  fragment: FragmentType<typeof Fragment>;
}> = ({ ...props }) => {
  const fragment = useFragment(Fragment, props.fragment);
  return (
    <div>
      <p>
        <SoundcloudRequestLink
          className={clsx("font-bold text-blue-400")}
          fragment={fragment.request}
        >
          {fragment.request.title}
        </SoundcloudRequestLink>
        <span className={clsx("text-slate-700")}>をリクエストしました</span>
      </p>
    </div>
  );
};
