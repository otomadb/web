"use client";
import "client-only";

import clsx from "clsx";
import React from "react";

import YoutubeRequestLink from "~/app/(application)/requests/youtube/[sourceId]/Link";
import { FragmentType, graphql, useFragment } from "~/gql";

export const Fragment = graphql(`
  fragment RequestMADFromYoutubeForm_SucceededToast on RequestYoutubeRegistrationSucceededPayload {
    request {
      id
      sourceId
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
        <YoutubeRequestLink
          className={clsx(["font-bold"], ["text-blue-400"])}
          sourceId={fragment.request.sourceId}
        >
          {fragment.request.sourceId}
        </YoutubeRequestLink>
        <span className={clsx(["text-slate-700"])}>をリクエストしました</span>
      </p>
    </div>
  );
};
