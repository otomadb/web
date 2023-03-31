"use client";
import clsx from "clsx";
import React from "react";

import { FragmentType, graphql, useFragment } from "~/gql";

export const Fragment = graphql(`
  fragment SigninPage_Signin_SucceededToast on SigninSucceededPayload {
    user {
      displayName
    }
  }
`);
export const SucceededToast: React.FC<{
  fragment: FragmentType<typeof Fragment>;
}> = ({ ...props }) => {
  const fragment = useFragment(Fragment, props.fragment);

  return (
    <div>
      <p className={clsx(["text-sm"])}>
        ようこそ！
        <span className={clsx(["text-slate-900"])}>
          {fragment.user.displayName}
        </span>
        さん。
      </p>
    </div>
  );
};
