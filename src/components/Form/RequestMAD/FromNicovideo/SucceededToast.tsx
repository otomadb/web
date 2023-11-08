"use client";
import "client-only";

import clsx from "clsx";
import React from "react";

import { LinkNicovideoRegistrationRequest } from "~/app/requests/nicovideo/[sourceId]/Link";
import { FragmentType, graphql, useFragment } from "~/gql";

export const Fragment = graphql(`
  fragment RequestMADFromNicovideoForm_SucceededToast on RequestNicovideoRegistrationSucceededPayload {
    request {
      id
      sourceId
      ...Link_NicovideoRegistrationRequest
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
        <LinkNicovideoRegistrationRequest
          fragment={fragment.request}
          className={clsx("font-bold text-blue-400")}
        >
          {fragment.request.sourceId}
        </LinkNicovideoRegistrationRequest>
        <span className={clsx("text-slate-700")}>をリクエストしました</span>
      </p>
    </div>
  );
};
