"use client";
import "client-only";

import clsx from "clsx";
import React, { ComponentProps, useCallback } from "react";
import { toast } from "react-hot-toast";

import { LinkNicovideoRegistrationRequest } from "~/app/requests/nicovideo/[sourceId]/Link";
import { FragmentType, getFragment, graphql } from "~/gql";

const Fragment = graphql(`
  fragment RequestNicovideoRegistrationPage_SuccessToast on RequestNicovideoRegistrationSucceededPayload {
    request {
      id
      sourceId
      ...Link_NicovideoRegistrationRequest
    }
  }
`);
export const SuccessToast: React.FC<{
  fragment: FragmentType<typeof Fragment>;
}> = ({ ...props }) => {
  const fragment = getFragment(Fragment, props.fragment);
  return (
    <div>
      <p>
        <LinkNicovideoRegistrationRequest
          fragment={fragment.request}
          className={clsx(["font-bold"], ["text-blue-400"])}
        >
          {fragment.request.sourceId}
        </LinkNicovideoRegistrationRequest>
        <span className={clsx(["text-slate-700"])}>をリクエストしました</span>
      </p>
    </div>
  );
};

export const useCallSuccessToast = () => {
  return useCallback(
    (fragment: ComponentProps<typeof SuccessToast>["fragment"]) =>
      toast(() => <SuccessToast fragment={fragment} />),
    []
  );
};