"use client";
import clsx from "clsx";
import React from "react";

import { MadPageLink } from "~/app/(application)/mads/[serial]/Link";
import { FragmentType, graphql, useFragment } from "~/gql";

export const Fragment = graphql(`
  fragment RegisetrBilibiliMADForm_SucceededToast on RegisterBilibiliMADSucceededPayload {
    video {
      ...Link_Video
      id
      title
    }
  }
`);
export const SucceededToast: React.FC<{
  fragment: FragmentType<typeof Fragment>;
}> = ({ ...props }) => {
  const fragment = useFragment(Fragment, props.fragment);

  return (
    <div>
      <MadPageLink
        fragment={fragment.video}
        className={clsx(["font-bold"], ["text-blue-400"])}
      >
        {fragment.video.title}
      </MadPageLink>
      <span className={clsx(["text-slate-700"])}>を登録しました．</span>
    </div>
  );
};
