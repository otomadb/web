"use client";
import clsx from "clsx";
import React from "react";

import CommonTag from "~/components/CommonTag";
import { FragmentType, graphql, useFragment } from "~/gql";

export const Fragment = graphql(`
  fragment RegisterTagPage_SucceededToast on RegisterTagSucceededPayload {
    tag {
      ...CommonTag
    }
  }
`);
export const SucceededToast: React.FC<{
  fragment: FragmentType<typeof Fragment>;
}> = ({ ...props }) => {
  const fragment = useFragment(Fragment, props.fragment);
  return (
    <div>
      <CommonTag size="small" fragment={fragment.tag} />
      <span className={clsx(["text-slate-700"])}>を登録しました．</span>
    </div>
  );
};
