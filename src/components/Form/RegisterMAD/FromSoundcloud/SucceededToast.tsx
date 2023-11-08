"use client";
import clsx from "clsx";
import React from "react";

import { LinkVideo } from "~/app/mads/[serial]/Link";
import { FragmentType, graphql, useFragment } from "~/gql";

export const Fragment = graphql(`
  fragment RegisetrSoundcloudMADForm_SucceededToast on RegisterSoundcloudMADSucceededPayload {
    mad {
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
      <LinkVideo
        fragment={fragment.mad}
        className={clsx("font-bold text-blue-400")}
      >
        {fragment.mad.title}
      </LinkVideo>
      <span className={clsx("text-slate-700")}>を登録しました．</span>
    </div>
  );
};
